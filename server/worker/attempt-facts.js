/**
 * The facts a Worker attempt ALREADY knows, collected once at dispatch
 * (2026-09-09 worker-runner-harness-reduction spec D1).
 *
 * 62 of 73 audited Worker sessions spent their first turns rediscovering
 * constants the Worker had already resolved — the dotfiles root, the workflow
 * venv python, the script argv, the selector inputs, the reviewer preset. This
 * module gathers them into ONE plain-data object; `runner/preamble.js`
 * `attemptFactsDirective` formats it, and the two runtimes deliver it.
 *
 * ADR 0012 boundary: nothing here reads a dotfiles CONTRACT file. The inputs
 * are beads-ui's own pinned copy (`generated/contracts/execution-defaults.json`),
 * the Worker's own resolved dispatch state, the target repo's `AGENTS.md`, and
 * the mere EXISTENCE of installed skill scripts.
 *
 * Every read is fail-quiet by construction: an unavailable fact leaves its
 * field null and the formatter omits the line. A wrong value dressed as a fact
 * is worse than an absent one, because the session would act on it.
 */
import nodeFs from 'node:fs';
import path from 'node:path';

/**
 * @typedef {(args: string[], options: { cwd?: string, timeout_ms?: number }) => Promise<{ code: number, stdout: string, stderr: string }>} FactsGitRunner
 */

/**
 * @typedef {Object} SelectorInput
 * @property {string} key
 * @property {string|null} value
 * @property {'bead'|'workspace_kv'|null} source
 */

/**
 * @typedef {Object} ScriptCall
 * @property {string} command - The literal command line, ready to run.
 * @property {string|null} note - One sentence about what its output settles.
 */

/**
 * @typedef {Object} AttemptFacts
 * @property {string} attempt_id
 * @property {string} bead_id
 * @property {string|null} route
 * @property {string|null} base - `<remote>/<branch>@<sha>`, or `<branch>@<sha>`
 * when the resolver named no remote.
 * @property {string|null} worktree
 * @property {string|null} dotfiles_root
 * @property {string|null} workflow_python
 * @property {string|null} node_modules - The D3 install result.
 * @property {{ remote: string, branch: string, sha: string }|null} remote_tip -
 * The bead branch's tip on the remote it was actually read from.
 * @property {SelectorInput[]} selector_inputs
 * @property {{ token: string, model: string, effort: string, digest: string|null }|null} reviewer_preset
 * @property {string|null} bead_status
 * @property {boolean} claimed_by_worker
 * @property {ScriptCall[]} scripts
 * @property {StageRead[]} stage_reads
 * @property {string|null} pitfalls - Body of the target repo's
 * `## Worker pitfalls` section.
 */

/**
 * @typedef {Object} StageRead
 * @property {string} stage
 * @property {string} command
 * @property {string|null} note
 */

/**
 * The five `impl_*` keys the dotfiles selector reads, in contract order. The
 * card prints each one's value and where it came from; it never claims to BE
 * the selector's answer (spec D1).
 *
 * @type {ReadonlyArray<string>}
 */
export const SELECTOR_INPUT_KEYS = Object.freeze([
  'impl_runtime',
  'impl_model',
  'impl_effort',
  'impl_speed',
  'impl_dispatch'
]);

/** Heading of the target repo's session-pitfall section (spec D7). */
export const WORKER_PITFALLS_HEADING = '## Worker pitfalls';

/** Value printed for a selector input no layer carries. */
export const ABSENT_VALUE = '없음';

/**
 * Absolute path of the installed `workflow` skill for one runner. Both
 * runtimes install the same skill from the same dotfiles checkout, so the
 * Codex runner reads its own `~/.codex/skills/workflow` (UI-wi12) instead of
 * depending on a Claude install that a Codex-only host does not have.
 *
 * @param {string} home_dir
 * @param {string} [runner] - `claude` (default) or `codex`.
 * @returns {string}
 */
export function workflowSkillRoot(home_dir, runner) {
  const runtime_dir = runner === 'codex' ? '.codex' : '.claude';
  return path.join(home_dir, runtime_dir, 'skills', 'workflow');
}

/**
 * Absolute path of the installed `workflow` skill's script directory.
 *
 * @param {string} home_dir
 * @param {string} [runner] - `claude` (default) or `codex`.
 * @returns {string}
 */
export function workflowScriptDir(home_dir, runner) {
  return path.join(workflowSkillRoot(home_dir, runner), 'scripts');
}

/**
 * The dotfiles repository root, resolved through the INSTALLED skill rather
 * than a guessed path (spec D1).
 *
 * Counting parent directories is wrong: the deployed skill lives at
 * `dotfiles/.worktrees/.repo-ops-deploy/src/shared/skills/flow/workflow`, whose
 * depth differs from a development checkout's. `git rev-parse --show-toplevel`
 * from the realpath answers for both.
 *
 * The runner's own skill install is tried first; the other runtime's install is
 * the fallback, because both link to the same checkout (UI-wi12).
 *
 * @param {{ run: FactsGitRunner, fs?: { realpathSync: (p: string) => string }, homeDir: string, runner?: string }} deps
 * @returns {Promise<string|null>} null on any failure — the line is then omitted.
 */
export async function resolveDotfilesRoot(deps) {
  const fs = deps.fs || nodeFs;
  const primary = deps.runner === 'codex' ? 'codex' : 'claude';
  const fallback = primary === 'codex' ? 'claude' : 'codex';
  let real = null;
  for (const runner of [primary, fallback]) {
    try {
      real = fs.realpathSync(workflowSkillRoot(deps.homeDir, runner));
      break;
    } catch {
      real = null;
    }
  }
  if (real === null) {
    return null;
  }
  try {
    const result = await deps.run(['rev-parse', '--show-toplevel'], {
      cwd: real
    });
    if (result.code !== 0) {
      return null;
    }
    const root = result.stdout.trim();
    return root.length > 0 ? root : null;
  } catch {
    return null;
  }
}

/**
 * Body of the `## Worker pitfalls` section of a repo's `AGENTS.md`, from the
 * heading to the next level-2 heading.
 *
 * @param {unknown} markdown
 * @returns {string|null} null when the file carries no such section.
 */
export function extractWorkerPitfalls(markdown) {
  if (typeof markdown !== 'string') {
    return null;
  }
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex(
    (line) => line.trim() === WORKER_PITFALLS_HEADING
  );
  if (start === -1) {
    return null;
  }
  /** @type {string[]} */
  const body = [];
  for (const line of lines.slice(start + 1)) {
    if (/^##\s/.test(line)) {
      break;
    }
    body.push(line);
  }
  const text = body.join('\n').trim();
  return text.length > 0 ? text : null;
}

/**
 * Pair each selector input with the layer that carries it: the Bead's own
 * metadata first, then the workspace kv default, else absent.
 *
 * @param {Record<string, unknown>|null|undefined} bead_values
 * @param {Record<string, unknown>|null|undefined} kv_values
 * @returns {SelectorInput[]}
 */
export function resolveSelectorInputs(bead_values, kv_values) {
  return SELECTOR_INPUT_KEYS.map((key) => {
    const bead = bead_values?.[key];
    if (typeof bead === 'string' && bead.length > 0) {
      return { key, value: bead, source: /** @type {const} */ ('bead') };
    }
    const kv = kv_values?.[key];
    if (typeof kv === 'string' && kv.length > 0) {
      return { key, value: kv, source: /** @type {const} */ ('workspace_kv') };
    }
    return { key, value: null, source: null };
  });
}

/**
 * The reviewer token this attempt's implementation review would default to,
 * plus the model/effort the PINNED copy pairs with it.
 *
 * A token the pinned table does not name yields null: the card would otherwise
 * assert a model nothing selected. So does an unloadable pin.
 *
 * @param {{ bead?: unknown, kv?: unknown }} token_layers
 * @param {{ supported?: boolean, digest?: string|null, session?: Record<string, any>|null }|null|undefined} defaults
 * @returns {{ token: string, model: string, effort: string, digest: string|null }|null}
 */
export function resolveReviewerPreset(token_layers, defaults) {
  if (!defaults || defaults.supported !== true || !defaults.session) {
    return null;
  }
  const review = defaults.session.review;
  const reviewers =
    review && typeof review === 'object' ? review.reviewers : null;
  if (!reviewers || typeof reviewers !== 'object') {
    return null;
  }
  const candidates = [
    token_layers.bead,
    token_layers.kv,
    review && typeof review === 'object' ? review.default : null
  ];
  const token = candidates.find(
    (value) => typeof value === 'string' && value.length > 0
  );
  if (typeof token !== 'string') {
    return null;
  }
  const entry = reviewers[token];
  if (
    !entry ||
    typeof entry !== 'object' ||
    typeof entry.model !== 'string' ||
    typeof entry.effort !== 'string'
  ) {
    return null;
  }
  return {
    token,
    model: entry.model,
    effort: entry.effort,
    digest: typeof defaults.digest === 'string' ? defaults.digest : null
  };
}

/**
 * The script calls this attempt's session would otherwise have to reconstruct
 * (spec D1). A script whose file is not installed is omitted rather than
 * guessed at, so a session is never sent after a path that does not exist.
 *
 * @param {{ attempt_id: string, bead_id: string, route: string|null, worktree: string|null, controller_runtime: string, quickfix_lane: boolean, remote: string|null, branch: string|null, base_sha: string|null }} input
 * @param {{ script_dir: string, fs?: { existsSync: (p: string) => boolean, readFileSync: (p: string, encoding: string) => string } }} deps
 * @returns {ScriptCall[]}
 */
export function buildScriptCalls(input, deps) {
  const fs = deps.fs || nodeFs;
  const dir = deps.script_dir;
  /** @type {ScriptCall[]} */
  const calls = [];
  /**
   * Whether an installed script file is readable at `name`.
   *
   * @param {string} name
   * @returns {boolean}
   */
  const installed = (name) => {
    try {
      return fs.existsSync(path.join(dir, name));
    } catch {
      return false;
    }
  };
  /**
   * The shell-safe spelling of an installed script path.
   *
   * @param {string} name
   * @returns {string}
   */
  const script = (name) => shellQuote(path.join(dir, name));
  if (installed('impl-selector.py') && input.route && input.worktree) {
    calls.push({
      command: `python3 ${script('impl-selector.py')} --controller-runtime ${input.controller_runtime} --route ${input.route} --bead ${input.bead_id} --repo ${shellQuote(input.worktree)} --json`,
      note: '이 attempt의 실행 형태 정본. 카드의 `선택 입력`은 이 selector가 읽을 입력이지 그 판정이 아니다.'
    });
  }
  if (installed('check-completion-report.py')) {
    calls.push({
      command: `python3 ${script('check-completion-report.py')} <보고서 경로>`,
      note: null
    });
    let text = '';
    try {
      text = fs.readFileSync(
        path.join(dir, 'check-completion-report.py'),
        'utf8'
      );
    } catch {
      text = '';
    }
    if (text.includes('--template')) {
      calls.push({
        command: `python3 ${script('check-completion-report.py')} --template --lane worker --identifier ${input.attempt_id}`,
        note: null
      });
    }
  }
  if (
    input.quickfix_lane &&
    installed('land-quick-fix.py') &&
    input.worktree &&
    input.branch
  ) {
    const remote = input.remote ?? 'origin';
    const pinned = input.base_sha ?? '<pinned base sha>';
    // `--message` takes the commit message TEXT itself — the installed script
    // reads no file behind it.
    calls.push({
      command: `python3 ${script('land-quick-fix.py')} --repo ${shellQuote(input.worktree)} --remote ${remote} --base ${input.branch} --pinned-base ${pinned} --message '<커밋 메시지>' --path <경로>`,
      note: null
    });
  }
  return calls;
}

/**
 * Build stage reads only from installed references with unique start lines.
 *
 * @param {{ route: string|null, quickfix_lane: boolean, continuation?: boolean }} input
 * @param {{ script_dir: string, fs?: { existsSync: (p: string) => boolean, readFileSync: (p: string, encoding: string) => string } }} deps
 * @returns {StageRead[]}
 */
function buildStageReads(input, deps) {
  const fs = deps.fs || nodeFs;
  /** @type {StageRead[]} */
  const reads = [];
  /**
   * Read one installed reference, leaving unavailable files absent.
   *
   * @param {string} name
   * @returns {{ file: string, lines: string[] }|null}
   */
  const reference = (name) => {
    const file = path.join(deps.script_dir, '../references', name);
    try {
      if (!fs.existsSync(file)) {
        return null;
      }
      return { file, lines: fs.readFileSync(file, 'utf8').split(/\r?\n/) };
    } catch {
      return null;
    }
  };
  /**
   * Assemble a sed range after checking literal whole-line headings.
   *
   * @param {string} name
   * @param {string} start
   * @param {string|null} end
   * @returns {string|null}
   */
  const range = (name, start, end) => {
    const ref = reference(name);
    if (!ref || ref.lines.filter((line) => line === start).length !== 1) {
      return null;
    }
    const stop = end && ref.lines.includes(end) ? `/^${end}$/` : '$';
    return `sed -n '/^${start}$/,${stop}p' ${shellQuote(ref.file)}`;
  };
  /**
   * Append one available stage command.
   *
   * @param {string} stage
   * @param {string|null} command
   * @param {string|null} [note]
   */
  const add = (stage, command, note = null) => {
    if (command) {
      reads.push({ stage, command, note });
    }
  };
  const spec_reference = 'execution-spec-backed.md';
  if (input.route === 'spec_backed') {
    add(
      '진입·선택·dispatch',
      range(spec_reference, '## Selector and dispatch', '## Prerequisite gate')
    );
    if (input.continuation === true) {
      add(
        '이어하기',
        range(
          spec_reference,
          '## Attempt continuation',
          '## Staleness re-review'
        )
      );
    }
    add(
      'push 전',
      range(
        'execution-common.md',
        '## Push safety',
        '## 탐색 지도 (recommended)'
      )
    );
    add('인도', range('finishing.md', '## Final PR delivery', '## Merge tail'));
  }
  if (input.quickfix_lane || input.route === 'quick_fix') {
    add('착지', range('execution-quick-fix.md', '## quick_fix landing', null));
    add(
      '마무리',
      range(
        'finishing.md',
        '### Worker-dispatched quick_fix',
        '### No-change close (refuted or no-delta)'
      )
    );
  }
  const terminal = range(
    'finishing.md',
    '## Terminal result line',
    '## Completion report'
  );
  const report = range('finishing.md', '## Completion report', null);
  add('종료 보고', [terminal, report].filter(Boolean).join(' && '));
  const waits = reference('unattended-waits.md');
  if (waits) {
    add('무인 대기', `cat ${shellQuote(waits.file)}`);
  }
  let stale_installed = false;
  try {
    stale_installed = fs.existsSync(
      path.join(deps.script_dir, 'stale-rereview-inputs.py')
    );
  } catch {
    stale_installed = false;
  }
  if (stale_installed) {
    add(
      '재검토',
      range(
        spec_reference,
        '## Staleness re-review',
        '## Selector and dispatch'
      ),
      'workflow `Staleness re-review` 절차를 읽고 재검토 입력 전체를 파일에 저장한 뒤 로컬에서 파싱한다. `needs_judgment`는 최종 판정이 아니며 `verdict_draft_blockers`가 지정한 항목을 비교한 뒤 정본 절차로 분류·기록한다.'
    );
  }
  return reads;
}

/**
 * Quote one argument for a POSIX shell only when it needs it. A path made of
 * the usual safe characters stays bare so the card reads as a command a person
 * would type; anything else (a space, a quote, a glob) is single-quoted with
 * embedded single quotes escaped, which is the one form every POSIX shell
 * reads literally.
 *
 * @param {string} value
 * @returns {string}
 */
export function shellQuote(value) {
  if (/^[A-Za-z0-9_\-./:@=+,]+$/.test(value)) {
    return value;
  }
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

/**
 * Collect the whole `## 시도 사실` payload for one dispatch.
 *
 * Called from the scheduler AFTER `workflow_mode=fast_track` is stamped, so
 * the mode line is a recorded fact rather than an intention.
 *
 * @param {{
 *   attempt_id: string,
 *   bead_id: string,
 *   route: string|null,
 *   worktree: string|null,
 *   controller_runtime: string,
 *   quickfix_lane: boolean,
 *   continuation?: boolean,
 *   base: { remote: string|null, branch: string|null, sha: string|null },
 *   remote_tip: { remote: string, branch: string, sha: string }|null,
 *   node_modules: string|null,
 *   bead_status: string|null,
 *   claimed_by_worker: boolean,
 *   bead_values: Record<string, unknown>|null,
 *   kv_values: Record<string, unknown>|null
 * }} input
 * @param {{ fs?: any, homeDir: string, resolveDotfilesRoot?: (runner?: string) => Promise<string|null>, loadDefaults?: () => any }} deps
 * @returns {Promise<AttemptFacts>}
 */
export async function buildAttemptFacts(input, deps) {
  const fs = deps.fs || nodeFs;
  /** @type {string|null} */
  let dotfiles_root = null;
  if (typeof deps.resolveDotfilesRoot === 'function') {
    try {
      dotfiles_root = await deps.resolveDotfilesRoot(input.controller_runtime);
    } catch {
      dotfiles_root = null;
    }
  }
  /** @type {string|null} */
  let workflow_python = null;
  if (typeof dotfiles_root === 'string' && dotfiles_root.length > 0) {
    const candidate = path.join(dotfiles_root, '.venv', 'bin', 'python');
    try {
      workflow_python = fs.existsSync(candidate) ? candidate : null;
    } catch {
      workflow_python = null;
    }
  }
  /** @type {string|null} */
  let pitfalls = null;
  if (typeof input.worktree === 'string' && input.worktree.length > 0) {
    try {
      pitfalls = extractWorkerPitfalls(
        fs.readFileSync(path.join(input.worktree, 'AGENTS.md'), 'utf8')
      );
    } catch {
      pitfalls = null;
    }
  }
  /** @type {any} */
  let defaults = null;
  if (typeof deps.loadDefaults === 'function') {
    try {
      defaults = deps.loadDefaults();
    } catch {
      defaults = null;
    }
  }
  const base =
    typeof input.base.sha === 'string' &&
    input.base.sha.length > 0 &&
    typeof input.base.branch === 'string' &&
    input.base.branch.length > 0
      ? `${input.base.remote ? `${input.base.remote}/` : ''}${input.base.branch}@${input.base.sha}`
      : null;
  return {
    attempt_id: input.attempt_id,
    bead_id: input.bead_id,
    route: input.route,
    base,
    worktree: input.worktree,
    dotfiles_root,
    workflow_python,
    node_modules: input.node_modules,
    remote_tip: input.remote_tip,
    selector_inputs: resolveSelectorInputs(input.bead_values, input.kv_values),
    reviewer_preset: resolveReviewerPreset(
      {
        bead: input.bead_values?.impl_review_model,
        kv: input.kv_values?.impl_review_model
      },
      defaults
    ),
    bead_status: input.bead_status,
    claimed_by_worker: input.claimed_by_worker === true,
    scripts: buildScriptCalls(
      {
        attempt_id: input.attempt_id,
        bead_id: input.bead_id,
        route: input.route,
        worktree: input.worktree,
        controller_runtime: input.controller_runtime,
        quickfix_lane: input.quickfix_lane === true,
        remote: input.base.remote,
        branch: input.base.branch,
        base_sha: input.base.sha
      },
      {
        script_dir: workflowScriptDir(deps.homeDir, input.controller_runtime),
        fs
      }
    ),
    stage_reads: buildStageReads(input, {
      script_dir: workflowScriptDir(deps.homeDir, input.controller_runtime),
      fs
    }),
    pitfalls
  };
}
