/**
 * @typedef {Object} Activity
 * @property {number|null} [at]
 * @property {string} [kind]
 * @property {string} [text]
 * @property {string} [tool]
 * @property {string} [command]
 * @property {string} [path]
 * @property {string} [result]
 * @property {boolean} [delegated]
 * @property {boolean} [is_error]
 */

/** @type {Record<string, string>} */
const COMMAND_LABELS = {
  rg: '검색',
  grep: '검색',
  cat: '파일 읽기',
  head: '파일 읽기',
  tail: '파일 읽기',
  nl: '파일 읽기',
  ls: '목록 확인',
  find: '목록 확인',
  vitest: '테스트',
  tsc: '타입 검사',
  lint: '린트',
  python3: '스크립트 실행',
  node: '스크립트 실행'
};

/** @type {Record<string, string>} */
const GIT_LABELS = {
  log: '커밋 기록 확인',
  show: '커밋 확인',
  diff: '변경 비교',
  status: '상태 확인',
  commit: '커밋',
  push: '푸시',
  fetch: '원격 변경 확인',
  add: '변경 준비',
  merge: '병합',
  rebase: '커밋 재배치'
};

/** @type {Record<string, string>} */
const PARSED_LABELS = {
  read: '파일 읽기',
  list_files: '목록 확인',
  search: '검색',
  unknown: '명령 실행'
};

/**
 * Decode shell words for display only, without evaluating any shell syntax.
 *
 * @param {string} command
 * @returns {string[]}
 */
function shellWords(command) {
  /** @type {string[]} */
  const words = [];
  let word = '';
  let quote = '';
  let started = false;
  for (let i = 0; i < command.length; i += 1) {
    const char = command[i];
    if (char === '\\' && quote !== "'") {
      const next = command[i + 1];
      if (next === undefined) {
        return [];
      }
      if (!quote || /["\\$`\n]/.test(next)) {
        word += next;
        i += 1;
      } else {
        word += char;
      }
      started = true;
    } else if (char === quote) {
      quote = '';
    } else if (!quote && (char === "'" || char === '"')) {
      quote = char;
      started = true;
    } else if (!quote && /\s/.test(char)) {
      if (started) {
        words.push(word);
        word = '';
        started = false;
      }
    } else {
      word += char;
      started = true;
    }
  }
  if (quote) {
    return [];
  }
  if (started) {
    words.push(word);
  }
  return words;
}

/**
 * @param {string} command
 * @returns {string}
 */
function unwrapShell(command) {
  const words = shellWords(command);
  const executable = (words[0] || '').split('/').pop() || '';
  if (
    words.length === 3 &&
    /^(?:zsh|bash|sh)$/.test(executable) &&
    /^-[a-z]*c[a-z]*$/.test(words[1])
  ) {
    return words[2];
  }
  return command;
}

/**
 * @param {string} command
 * @returns {string}
 */
function commandLabel(command) {
  const words = shellWords(command);
  const executable = (words[0] || '').split('/').pop() || '';
  if (executable === 'git') {
    return GIT_LABELS[words[1]] || 'git';
  }
  if (executable === 'sed' && words[1] === '-n') {
    return '파일 읽기';
  }
  if (executable === 'npm' || executable === 'npx') {
    const task = words[1] === 'run' ? words[2] : words[1];
    if (task === 'test' || task === 'vitest') {
      return '테스트';
    }
    return COMMAND_LABELS[task] || executable;
  }
  if (executable === 'bd') {
    const writes =
      ['create', 'update', 'close'].includes(words[1]) ||
      (words[1] === 'dep' &&
        ['add', 'remove', 'rm', 'delete', 'del'].includes(words[2]));
    return writes ? 'Bead 갱신' : 'Bead 조회';
  }
  return COMMAND_LABELS[executable] || executable || '명령 실행';
}

/**
 * Keep a bounded command target; flags, inline programs and later pipeline stages
 * belong to the raw tooltip rather than the activity row.
 *
 * @param {string} command
 * @returns {string}
 */
function commandDetail(command) {
  const words = shellWords(command);
  const executable = (words[0] || '').split('/').pop() || '';
  const prefix_length = ['git', 'bd', 'npm', 'npx'].includes(executable)
    ? executable === 'npm' && words[1] === 'run'
      ? 3
      : 2
    : 1;
  const prefix = [executable, ...words.slice(1, prefix_length)];
  /** @type {string[]} */
  const targets = [];
  for (let i = prefix_length; i < words.length; i += 1) {
    const word = words[i];
    if (/^[;&|<>]/.test(word)) {
      break;
    }
    if (['python3', 'node'].includes(executable) && /^-[ce]$/.test(word)) {
      targets.push(word);
      break;
    }
    if (
      ['-m', '--message'].includes(word) ||
      (['head', 'tail'].includes(executable) && word === '-n') ||
      (executable === 'sed' && word === '-n')
    ) {
      i += 1;
      continue;
    }
    if (!word.startsWith('-')) {
      targets.push(word);
      if (targets.length === 2) {
        break;
      }
    }
  }
  const summary = [...prefix, ...targets].join(' ').replace(/\s+/g, ' ').trim();
  return summary.length > 64 ? `${summary.slice(0, 63)}…` : summary;
}

/**
 * Format the shared Worker/Monitor activity row; keep raw command/result in title.
 *
 * @param {Activity|null|undefined} activity
 * @returns {{ label: string, detail: string, tone: 'muted'|'warn'|'error', title: string }}
 */
export function activityLabel(activity) {
  const text =
    activity && typeof activity.text === 'string' ? activity.text : '';
  const command =
    activity && typeof activity.command === 'string' ? activity.command : '';
  const result =
    activity && typeof activity.result === 'string' ? activity.result : '';
  const tool =
    activity && typeof activity.tool === 'string' ? activity.tool : '';
  const file_path =
    activity && typeof activity.path === 'string' ? activity.path : '';
  let label = text || tool;
  let detail = '';
  const exit = result.match(/(?:^| · )exit (-?\d+)(?= · |$)/);
  const nonzero = exit !== null && Number(exit[1]) !== 0;
  /** @type {'muted'|'warn'|'error'} */
  const tone =
    activity && activity.kind === 'error'
      ? 'error'
      : nonzero ||
          (activity && activity.is_error === true) ||
          tool.endsWith(' · 실패')
        ? 'warn'
        : 'muted';
  if (activity && activity.kind === 'tool') {
    const display_command = unwrapShell(command.trim());
    const parsed = result.match(/^(read|list_files|search|unknown)(?: | · |$)/);
    const is_shell = !tool || tool === 'Bash' || tool === 'shell';
    if (display_command && is_shell) {
      label = commandLabel(display_command);
      detail = commandDetail(display_command);
    } else if (activity.delegated && parsed) {
      label = PARSED_LABELS[parsed[1]];
    } else if (activity.delegated && exit) {
      label = tool.replace(/ · (완료|실패)$/, '') || label;
    } else if (tool) {
      label = tool;
      detail = command || file_path;
    }
    let summary = result;
    if (activity.delegated && parsed) {
      summary = summary.replace(
        /^(read|list_files|search|unknown)(?: · | )?/,
        ''
      );
    }
    summary = summary.replace(
      /(^| · )exit (-?\d+)(?= · |$)/,
      (_, prefix, code) =>
        `${prefix}${Number(code) === 0 ? '완료' : `종료 코드 ${code}`}`
    );
    detail = [detail || file_path, summary.replace(/^ · /, '')]
      .filter(Boolean)
      .join(' · ');
  }
  if (label && activity && activity.delegated) {
    label = `↳ 위임 · ${label}`;
  }
  return {
    label,
    detail,
    tone,
    title: [command || file_path || text || tool, result]
      .filter(Boolean)
      .join('\n')
  };
}
