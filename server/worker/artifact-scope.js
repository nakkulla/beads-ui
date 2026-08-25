import { debug } from '../logging.js';

const log = debug('worker:artifact-scope');

/**
 * Parse the repo-relative path prefixes declared by an artifact's front matter.
 * Invalid entries are ignored independently so one bad path cannot suppress the
 * remaining scope.
 *
 * @param {unknown} content
 * @returns {string[]}
 */
export function parseArtifactScope(content) {
  if (typeof content !== 'string') {
    return [];
  }
  const lines = content.split(/\r?\n/);
  if (lines[0] !== '---') {
    return [];
  }
  const closing_index = lines.indexOf('---', 1);
  if (closing_index < 0) {
    return [];
  }

  /** @type {string[]} */
  const scope = [];
  const seen = new Set();
  let reading_scope = false;
  for (const line of lines.slice(1, closing_index)) {
    if (/^scope:\s*$/.test(line)) {
      reading_scope = true;
      continue;
    }
    if (/^[^\s].*:\s*/.test(line)) {
      reading_scope = false;
      continue;
    }
    if (!reading_scope) {
      continue;
    }
    const match = /^\s*-\s(.*)$/.exec(line);
    if (!match) {
      continue;
    }
    const item = match[1].trim();
    if (!isValidScopeItem(item)) {
      log('ignoring invalid scope entry %o', item);
      continue;
    }
    if (seen.has(item)) {
      continue;
    }
    seen.add(item);
    scope.push(item);
  }
  return scope;
}

/**
 * Contract trim (`quick_fix_handoff.text_model.trim: ascii_space_tab_only`).
 * `String.trim()` also eats NBSP, U+2028 and U+FEFF, so a heading line the
 * contract keeps as body would be read as a `## scope` declaration here and not
 * by the checker that owns the predicate.
 */
const ASCII_TRIM_RE = /^[ \t]+|[ \t]+$/g;

/**
 * Parse the repo-relative path prefixes a bead's DESCRIPTION declares under a
 * `## scope` section (UI-f1qy §3). The declaration place for a bead with no
 * document artifact — in practice quick_fix.
 *
 * Three states, unlike {@link parseArtifactScope}: `null` (no section — 미선언,
 * 판정 불가) must stay distinguishable from `[]` (a section that declared
 * nothing), because only the latter is a read fact the UI reveals.
 *
 * 줄 모델은 계약(`description_scope` + `quick_fix_handoff.text_model`)이
 * 소유한다: 줄 경계는 `\r\n`/`\n`뿐이고 U+2028·U+0085·U+000B는 본문 문자이며,
 * 트림은 ASCII 스페이스·탭만이다. 이 저장소는 그 계약의 소비자이므로
 * 판정이 dotfiles checker와 갈리면 안 된다 (UI-r7or §7).
 *
 * @param {unknown} description
 * @returns {string[]|null}
 */
export function parseDescriptionScope(description) {
  if (typeof description !== 'string') {
    return null;
  }
  const lines = description.split(/\r?\n/);
  const start = lines.findIndex(
    (line) => line.replace(ASCII_TRIM_RE, '') === '## scope'
  );
  if (start < 0) {
    return null;
  }

  /** @type {string[]} */
  const scope = [];
  const seen = new Set();
  for (const line of lines.slice(start + 1)) {
    // 다음 heading(레벨 무관)이 구역의 끝이다 — 두 번째 `## scope`도 여기서
    // 끊기므로 첫 매치 하나만 읽힌다.
    if (line.replace(ASCII_TRIM_RE, '').startsWith('#')) {
      break;
    }
    // `[\s\S]`는 계약의 `item_line_regex`가 쓰는 `.`을 옮긴 것이다 — 파이썬의
    // `.`은 `\n`만 제외하지만 JS의 `.`은 U+2028·U+2029까지 제외해서, 그 문자를
    // 담은 항목 하나가 통째로 수집되지 않았다.
    const match = /^\s*-\s([\s\S]*)$/.exec(line);
    if (!match) {
      continue;
    }
    const item = match[1].trim();
    if (!isValidScopeItem(item)) {
      log('ignoring invalid description scope entry %o', item);
      continue;
    }
    if (seen.has(item)) {
      continue;
    }
    seen.add(item);
    scope.push(item);
  }
  return scope;
}

/**
 * The contract's `glob_chars_star_question_bracket` rejects `*?[` only — 닫는
 * `]` 하나는 glob를 열지 못하므로 `src/a]b/`는 유효한 항목이다.
 *
 * @param {string} item
 */
function isValidScopeItem(item) {
  if (
    item.length === 0 ||
    item.startsWith('/') ||
    item.startsWith(':') ||
    item.includes('*') ||
    item.includes('?') ||
    item.includes('[')
  ) {
    return false;
  }
  return !item.split('/').includes('..');
}

/**
 * Parse one `git log --format=%H --name-only` stream. Git already emits commits
 * newest first; stable de-duplication preserves that order for both result lists.
 *
 * @param {unknown} output
 * @returns {{ delta_shas: string[], changed_paths: string[] }}
 */
export function parseNameOnlyLog(output) {
  /** @type {string[]} */
  const delta_shas = [];
  /** @type {string[]} */
  const changed_paths = [];
  const seen_shas = new Set();
  const seen_paths = new Set();
  if (typeof output !== 'string') {
    return { delta_shas, changed_paths };
  }
  for (const raw_line of output.split(/\r?\n/)) {
    const line = raw_line.trim();
    if (line.length === 0) {
      continue;
    }
    if (/^[0-9a-fA-F]{40}$/.test(line)) {
      if (!seen_shas.has(line)) {
        seen_shas.add(line);
        delta_shas.push(line);
      }
      continue;
    }
    if (!seen_paths.has(line)) {
      seen_paths.add(line);
      changed_paths.push(line);
    }
  }
  return { delta_shas, changed_paths };
}
