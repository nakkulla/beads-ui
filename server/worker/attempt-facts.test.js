import path from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  buildAttemptFacts,
  buildScriptCalls,
  extractWorkerPitfalls,
  resolveDotfilesRoot,
  resolveReviewerPreset,
  resolveSelectorInputs,
  shellQuote,
  workflowScriptDir
} from './attempt-facts.js';

const HOME = '/home/tester';
const SCRIPTS = workflowScriptDir(HOME);

/**
 * A filesystem stub over an explicit path→content map. Any path outside the map
 * is absent, which is what makes every fail-quiet case expressible.
 *
 * @param {Record<string, string>} files
 */
function fakeFs(files) {
  return {
    existsSync: (/** @type {string} */ p) =>
      Object.prototype.hasOwnProperty.call(files, p),
    readFileSync: (/** @type {string} */ p) => {
      if (!Object.prototype.hasOwnProperty.call(files, p)) {
        throw new Error(`ENOENT: ${p}`);
      }
      return files[p];
    },
    realpathSync: (/** @type {string} */ p) => {
      if (!Object.prototype.hasOwnProperty.call(files, p)) {
        throw new Error(`ENOENT: ${p}`);
      }
      return files[p];
    }
  };
}

/** The pinned execution-defaults shape the reviewer preset reads. */
const PINNED_DEFAULTS = {
  supported: true,
  digest: 'abc123',
  session: {
    review: {
      default: 'codex',
      reviewers: {
        codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
        opus: { model: 'opus', effort: 'high' }
      }
    }
  }
};

/**
 * @param {Object} [over]
 * @returns {any}
 */
function factsInput(over = {}) {
  return {
    attempt_id: 'att-1',
    bead_id: 'UI-1',
    route: 'spec_backed',
    worktree: '/repo/.worktrees/UI-1',
    controller_runtime: 'claude',
    quickfix_lane: false,
    base: { remote: 'origin', branch: 'main', sha: 'a'.repeat(40) },
    remote_tip: null,
    node_modules: 'ok',
    bead_status: 'in_progress',
    claimed_by_worker: true,
    bead_values: null,
    kv_values: null,
    ...over
  };
}

describe('worker/attempt-facts pitfall section (spec D1)', () => {
  test('extracts the section body up to the next level-2 heading', () => {
    const markdown = [
      '# Agents',
      '',
      '## Worker pitfalls',
      '',
      '- zsh: 글롭은 따옴표',
      '- pipefail',
      '',
      '## Post-Merge',
      '',
      '- 다른 절'
    ].join('\n');

    expect(extractWorkerPitfalls(markdown)).toBe(
      '- zsh: 글롭은 따옴표\n- pipefail'
    );
  });

  test('returns null when the file carries no such section', () => {
    expect(
      extractWorkerPitfalls('# Agents\n\n## Coding Standards\n')
    ).toBeNull();
  });

  test('returns null for a non-string input', () => {
    expect(extractWorkerPitfalls(null)).toBeNull();
  });
});

describe('worker/attempt-facts selector inputs (spec D1)', () => {
  test('prefers the bead layer over the workspace kv layer', () => {
    const resolved = resolveSelectorInputs(
      { impl_runtime: 'codex' },
      { impl_runtime: 'claude', impl_model: 'sol' }
    );

    expect(resolved.slice(0, 2)).toEqual([
      { key: 'impl_runtime', value: 'codex', source: 'bead' },
      { key: 'impl_model', value: 'sol', source: 'workspace_kv' }
    ]);
  });

  test('reports an absent key with a null source', () => {
    const resolved = resolveSelectorInputs(null, null);

    expect(resolved).toEqual([
      { key: 'impl_runtime', value: null, source: null },
      { key: 'impl_model', value: null, source: null },
      { key: 'impl_effort', value: null, source: null },
      { key: 'impl_speed', value: null, source: null },
      { key: 'impl_dispatch', value: null, source: null }
    ]);
  });
});

describe('worker/attempt-facts reviewer preset (spec D1)', () => {
  test('falls back to the pinned default reviewer token', () => {
    expect(resolveReviewerPreset({}, PINNED_DEFAULTS)).toEqual({
      token: 'codex',
      model: 'gpt-5.6-sol',
      effort: 'xhigh',
      digest: 'abc123'
    });
  });

  test('prefers the bead token over the kv token', () => {
    expect(
      resolveReviewerPreset({ bead: 'opus', kv: 'codex' }, PINNED_DEFAULTS)
    ).toMatchObject({ token: 'opus', model: 'opus', effort: 'high' });
  });

  test('returns null for a token the pinned table does not name', () => {
    expect(
      resolveReviewerPreset({ bead: 'astra' }, PINNED_DEFAULTS)
    ).toBeNull();
  });

  test('returns null when the pinned copy failed to load', () => {
    expect(resolveReviewerPreset({}, { supported: false })).toBeNull();
  });
});

describe('worker/attempt-facts dotfiles root (spec D1)', () => {
  test('reads the git root of the installed skill realpath', async () => {
    /** @type {Array<{ args: string[], cwd: string|undefined }>} */
    const calls = [];

    const root = await resolveDotfilesRoot({
      homeDir: HOME,
      fs: {
        realpathSync: () => '/dotfiles/.worktrees/deploy/src/skills/workflow'
      },
      run: async (args, options) => {
        calls.push({ args, cwd: options.cwd });
        return { code: 0, stdout: '/dotfiles/.worktrees/deploy\n', stderr: '' };
      }
    });

    expect(root).toBe('/dotfiles/.worktrees/deploy');
    expect(calls).toEqual([
      {
        args: ['rev-parse', '--show-toplevel'],
        cwd: '/dotfiles/.worktrees/deploy/src/skills/workflow'
      }
    ]);
  });

  test('reads the codex install first for a codex runner and falls back to claude', async () => {
    /** @type {string[]} */
    const asked = [];
    const root = await resolveDotfilesRoot({
      homeDir: HOME,
      runner: 'codex',
      fs: {
        realpathSync: (p) => {
          asked.push(p);
          if (p.includes('/.codex/')) throw new Error('ENOENT');
          return '/dotfiles/.worktrees/deploy/src/skills/workflow';
        }
      },
      run: async () => ({
        code: 0,
        stdout: '/dotfiles/.worktrees/deploy\n',
        stderr: ''
      })
    });

    expect(root).toBe('/dotfiles/.worktrees/deploy');
    expect(asked).toEqual([
      path.join(HOME, '.codex', 'skills', 'workflow'),
      path.join(HOME, '.claude', 'skills', 'workflow')
    ]);
  });

  test('returns null when the skill link cannot be resolved', async () => {
    const root = await resolveDotfilesRoot({
      homeDir: HOME,
      fs: {
        realpathSync: () => {
          throw new Error('ENOENT');
        }
      },
      run: async () => ({ code: 0, stdout: '/x\n', stderr: '' })
    });

    expect(root).toBeNull();
  });

  test('returns null on a nonzero git exit', async () => {
    const root = await resolveDotfilesRoot({
      homeDir: HOME,
      fs: { realpathSync: () => '/somewhere' },
      run: async () => ({ code: 128, stdout: '', stderr: 'not a git repo' })
    });

    expect(root).toBeNull();
  });
});

describe('worker/attempt-facts skill paths (UI-wi12)', () => {
  test("resolves the script dir under the runner's own runtime home", () => {
    expect(workflowScriptDir(HOME)).toBe(
      path.join(HOME, '.claude', 'skills', 'workflow', 'scripts')
    );
    expect(workflowScriptDir(HOME, 'codex')).toBe(
      path.join(HOME, '.codex', 'skills', 'workflow', 'scripts')
    );
  });
});

describe('worker/attempt-facts script calls (spec D1)', () => {
  test('names the attempt runner as the selector controller runtime', () => {
    const calls = buildScriptCalls(
      {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        route: 'spec_backed',
        worktree: '/repo/.worktrees/UI-1',
        controller_runtime: 'codex',
        quickfix_lane: false,
        remote: 'origin',
        branch: 'main',
        base_sha: 'a'.repeat(40)
      },
      {
        script_dir: SCRIPTS,
        fs: fakeFs({ [path.join(SCRIPTS, 'impl-selector.py')]: '' })
      }
    );

    expect(calls).toHaveLength(1);
    expect(calls[0].command).toContain('--controller-runtime codex');
  });

  test('omits a script whose file is not installed', () => {
    const calls = buildScriptCalls(
      {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        route: 'spec_backed',
        worktree: '/repo/.worktrees/UI-1',
        controller_runtime: 'claude',
        quickfix_lane: false,
        remote: 'origin',
        branch: 'main',
        base_sha: null
      },
      { script_dir: SCRIPTS, fs: fakeFs({}) }
    );

    expect(calls).toEqual([]);
  });

  test('adds the report template line only when the script accepts it', () => {
    const report = path.join(SCRIPTS, 'check-completion-report.py');

    const without_template = buildScriptCalls(
      {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        route: null,
        worktree: null,
        controller_runtime: 'claude',
        quickfix_lane: false,
        remote: null,
        branch: null,
        base_sha: null
      },
      { script_dir: SCRIPTS, fs: fakeFs({ [report]: 'no such option' }) }
    );
    const with_template = buildScriptCalls(
      {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        route: null,
        worktree: null,
        controller_runtime: 'claude',
        quickfix_lane: false,
        remote: null,
        branch: null,
        base_sha: null
      },
      {
        script_dir: SCRIPTS,
        fs: fakeFs({ [report]: 'parser.add_argument("--template")' })
      }
    );

    expect(without_template).toHaveLength(1);
    expect(with_template).toHaveLength(2);
    expect(with_template[1].command).toContain(
      '--template --lane worker --identifier att-1'
    );
  });

  test('adds the landing script only for the quick_fix lane', () => {
    const files = fakeFs({ [path.join(SCRIPTS, 'land-quick-fix.py')]: '' });
    const input = {
      attempt_id: 'att-1',
      bead_id: 'UI-1',
      route: 'quick_fix',
      worktree: '/repo/.worktrees/UI-1',
      controller_runtime: 'claude',
      remote: 'origin',
      branch: 'main',
      base_sha: 'b'.repeat(40)
    };

    const lane = buildScriptCalls(
      { ...input, quickfix_lane: true },
      { script_dir: SCRIPTS, fs: files }
    );
    const ordinary = buildScriptCalls(
      { ...input, quickfix_lane: false },
      { script_dir: SCRIPTS, fs: files }
    );

    expect(lane).toHaveLength(1);
    expect(lane[0].command).toContain('--remote origin --base main');
    expect(lane[0].command).toContain("--message '<커밋 메시지>'");
    expect(ordinary).toEqual([]);
  });

  test('quotes a worktree path that carries a space', () => {
    const calls = buildScriptCalls(
      {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        route: 'spec_backed',
        worktree: '/Users/me/My Repo/.worktrees/UI-1',
        controller_runtime: 'claude',
        quickfix_lane: false,
        remote: 'origin',
        branch: 'main',
        base_sha: null
      },
      {
        script_dir: SCRIPTS,
        fs: fakeFs({ [path.join(SCRIPTS, 'impl-selector.py')]: '' })
      }
    );

    expect(calls[0].command).toContain(
      "--repo '/Users/me/My Repo/.worktrees/UI-1' --json"
    );
  });
});

describe('worker/attempt-facts shell quoting (spec D1)', () => {
  test('leaves a plain path bare', () => {
    expect(shellQuote('/home/tester/.claude/skills/x.py')).toBe(
      '/home/tester/.claude/skills/x.py'
    );
  });

  test('single-quotes a value with a space', () => {
    expect(shellQuote('/a b/c')).toBe("'/a b/c'");
  });

  test('escapes an embedded single quote', () => {
    expect(shellQuote("it's")).toBe("'it'\\''s'");
  });
});

describe('worker/attempt-facts collection (spec D1)', () => {
  test('formats the base as remote/branch@sha', async () => {
    const facts = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      fs: fakeFs({})
    });

    expect(facts.base).toBe(`origin/main@${'a'.repeat(40)}`);
  });

  test('drops the remote prefix for a local-only base', async () => {
    const facts = await buildAttemptFacts(
      factsInput({
        base: { remote: null, branch: 'trunk', sha: 'c'.repeat(40) }
      }),
      { homeDir: HOME, fs: fakeFs({}) }
    );

    expect(facts.base).toBe(`trunk@${'c'.repeat(40)}`);
  });

  test('omits the base entirely when no sha was resolved', async () => {
    const facts = await buildAttemptFacts(
      factsInput({ base: { remote: 'origin', branch: 'main', sha: null } }),
      { homeDir: HOME, fs: fakeFs({}) }
    );

    expect(facts.base).toBeNull();
  });

  test('leaves dotfiles_root and workflow_python null without a resolver', async () => {
    const facts = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      fs: fakeFs({})
    });

    expect({
      dotfiles_root: facts.dotfiles_root,
      workflow_python: facts.workflow_python
    }).toEqual({ dotfiles_root: null, workflow_python: null });
  });

  test('reports workflow_python only when the venv path exists', async () => {
    const present = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      resolveDotfilesRoot: async () => '/dotfiles',
      fs: fakeFs({ '/dotfiles/.venv/bin/python': '' })
    });
    const absent = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      resolveDotfilesRoot: async () => '/dotfiles',
      fs: fakeFs({})
    });

    expect(present.workflow_python).toBe('/dotfiles/.venv/bin/python');
    expect(absent.workflow_python).toBeNull();
  });

  test('keeps dotfiles_root null when the resolver throws', async () => {
    const facts = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      resolveDotfilesRoot: async () => {
        throw new Error('git missing');
      },
      fs: fakeFs({})
    });

    expect(facts.dotfiles_root).toBeNull();
  });

  test('carries the target repo Worker pitfalls section', async () => {
    const facts = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      fs: fakeFs({
        '/repo/.worktrees/UI-1/AGENTS.md':
          '# Agents\n\n## Worker pitfalls\n\n- pipefail\n\n## 그다음\n'
      })
    });

    expect(facts.pitfalls).toBe('- pipefail');
  });

  test('resolves the reviewer preset from the pinned copy', async () => {
    const facts = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      fs: fakeFs({}),
      loadDefaults: () => PINNED_DEFAULTS
    });

    expect(facts.reviewer_preset).toEqual({
      token: 'codex',
      model: 'gpt-5.6-sol',
      effort: 'xhigh',
      digest: 'abc123'
    });
  });

  test('keeps the reviewer preset null when the pin cannot be read', async () => {
    const facts = await buildAttemptFacts(factsInput(), {
      homeDir: HOME,
      fs: fakeFs({}),
      loadDefaults: () => {
        throw new Error('pin unreadable');
      }
    });

    expect(facts.reviewer_preset).toBeNull();
  });
});
