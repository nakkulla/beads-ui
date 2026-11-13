import { describe, expect, test } from 'vitest';
import { activityLabel } from './activity-label.js';

describe('activityLabel', () => {
  test.each([
    ['/bin/zsh -lc "git log --oneline abc..def"', 'git log abc..def'],
    ['bash -lc \'rg "hello world" app\'', 'rg hello world app'],
    ["sh -c 'cat '\\''a b.js'\\'''", 'cat a b.js'],
    ['/bin/bash -c "rg \\"hello\\" app"', 'rg hello app']
  ])(
    'summarizes wrapped %s without changing the tooltip',
    (command, summary) => {
      const activity = { kind: 'tool', command, result: 'exit 0' };

      const formatted = activityLabel(activity);

      expect(formatted.detail).toBe(`${summary} · 완료`);
      expect(formatted.title).toBe(`${command}\nexit 0`);
    }
  );

  test.each([
    ['rg foo app', '검색'],
    ['grep foo a.js', '검색'],
    ["sed -n '1,10p' a.js", '파일 읽기'],
    ['sed -i s/a/b/ a.js', 'sed'],
    ['cat a.js', '파일 읽기'],
    ['head a.js', '파일 읽기'],
    ['tail a.js', '파일 읽기'],
    ['nl a.js', '파일 읽기'],
    ['ls app', '목록 확인'],
    ['find app -type f', '목록 확인'],
    ['git log abc..def', '커밋 기록 확인'],
    ['git diff', '변경 비교'],
    ['git status', '상태 확인'],
    ['git commit -m fix', '커밋'],
    ['git push', '푸시'],
    ['git branch', 'git'],
    ['npm test', '테스트'],
    ['npx vitest run', '테스트'],
    ['vitest run', '테스트'],
    ['npm run tsc', '타입 검사'],
    ['npm run lint', '린트'],
    ['tsc --noEmit', '타입 검사'],
    ['bd show UI-1 --json', 'Bead 조회'],
    ['bd update UI-1 --status resolved', 'Bead 갱신'],
    ['python3 script.py', '스크립트 실행'],
    ['node script.js', '스크립트 실행'],
    ['curl localhost', 'curl']
  ])('labels the intent of %s', (command, label) => {
    const formatted = activityLabel({ kind: 'tool', command });

    expect(formatted.label).toBe(label);
  });

  test('keeps a nonzero command exit and its output in warning tone', () => {
    const formatted = activityLabel({
      kind: 'tool',
      command: 'npm test',
      result: 'exit 1 · expected 1 to equal 2'
    });

    expect(formatted.detail).toBe(
      'npm test · 종료 코드 1 · expected 1 to equal 2'
    );
    expect(formatted.tone).toBe('warn');
    expect(formatted.detail).not.toContain('실패');
  });

  test.each([
    ['read app/a.js · exit 0', '파일 읽기', 'app/a.js · 완료'],
    ['list_files app · exit 0', '목록 확인', 'app · 완료'],
    ['search app foo · exit 1', '검색', 'app foo · 종료 코드 1'],
    ['unknown · exit 2', '명령 실행', '종료 코드 2']
  ])('uses v2 details from %s', (result, label, detail) => {
    const formatted = activityLabel({
      kind: 'tool',
      tool: '명령 실행 · 실패',
      text: '명령 실행 · 실패',
      result,
      delegated: true
    });

    expect(formatted.label).toBe(`↳ 위임 · ${label}`);
    expect(formatted.detail).toBe(detail);
    expect(formatted.title).toBe(`명령 실행 · 실패\n${result}`);
  });

  test('reports a v2 exit without parsed command details', () => {
    const formatted = activityLabel({
      kind: 'tool',
      tool: '명령 실행 · 실패',
      result: 'exit 1',
      delegated: true
    });

    expect(formatted.label).toBe('↳ 위임 · 명령 실행');
    expect(formatted.detail).toBe('종료 코드 1');
    expect(formatted.tone).toBe('warn');
  });

  test('preserves the v1 label when no detail exists', () => {
    const formatted = activityLabel({
      kind: 'tool',
      text: '명령 실행 · 실패',
      tool: '명령 실행 · 실패',
      delegated: true
    });

    expect(formatted.label).toBe('↳ 위임 · 명령 실행 · 실패');
    expect(formatted.detail).toBe('');
    expect(formatted.tone).toBe('warn');
  });

  test('uses warning tone for a paired tool error', () => {
    const formatted = activityLabel({
      kind: 'tool',
      tool: 'Read',
      is_error: true
    });

    expect(formatted.tone).toBe('warn');
  });

  test('uses error tone for a session error', () => {
    const formatted = activityLabel({ kind: 'error', text: 'connection lost' });

    expect(formatted.label).toBe('connection lost');
    expect(formatted.tone).toBe('error');
  });

  test('preserves assistant text', () => {
    const formatted = activityLabel({ kind: 'assistant', text: '패치 적용' });

    expect(formatted.label).toBe('패치 적용');
    expect(formatted.detail).toBe('');
    expect(formatted.tone).toBe('muted');
  });

  test('omits an absent activity', () => {
    const formatted = activityLabel(null);

    expect(formatted.label).toBe('');
    expect(formatted.detail).toBe('');
  });

  test('keeps an incomplete shell wrapper in the tooltip', () => {
    const command = '/bin/zsh -lc "git log';

    const formatted = activityLabel({ kind: 'tool', command });

    expect(formatted.title).toBe(command);
    expect(formatted.label).toBe('명령 실행');
  });

  test('omits inline script bodies from the visible command detail', () => {
    const command = `python3 -c '${'print(123);'.repeat(30)}'`;

    const formatted = activityLabel({
      kind: 'tool',
      command,
      result: 'exit 1 · syntax error'
    });

    expect(formatted.detail).toBe('python3 -c · 종료 코드 1 · syntax error');
    expect(formatted.title).toBe(`${command}\nexit 1 · syntax error`);
  });

  test('omits options and later pipeline stages from the core target', () => {
    const formatted = activityLabel({
      kind: 'tool',
      command: 'git log --oneline abc..def | head -10',
      result: 'exit 0'
    });

    expect(formatted.detail).toBe('git log abc..def · 완료');
  });

  test('bounds a long target while retaining the result', () => {
    const command = `cat ${'directory/'.repeat(20)}a.js`;

    const formatted = activityLabel({
      kind: 'tool',
      command,
      result: 'exit 0'
    });

    expect(formatted.detail.length).toBeLessThanOrEqual(69);
    expect(formatted.detail).toMatch(/… · 완료$/);
    expect(formatted.title).toBe(`${command}\nexit 0`);
  });

  test.each([
    ['Grep', 'foo', undefined, 'Grep', 'foo · ok'],
    ['Glob', '*.js', undefined, 'Glob', '*.js · ok'],
    ['Agent', 'inspect module', undefined, 'Agent', 'inspect module · ok'],
    ['Read', undefined, '/repo/a.js', 'Read', '/repo/a.js · ok']
  ])(
    'renders %s targets once without shell classification',
    (tool, command, file_path, label, detail) => {
      const formatted = activityLabel({
        kind: 'tool',
        tool,
        command,
        path: file_path,
        text: command || file_path,
        result: 'ok'
      });

      expect(formatted.label).toBe(label);
      expect(formatted.detail).toBe(detail);
    }
  );

  test.each([
    ['bd dep list UI-1', 'Bead 조회'],
    ['bd dep add UI-1 UI-2', 'Bead 갱신'],
    ['bd dep remove UI-1 UI-2', 'Bead 갱신']
  ])('distinguishes dependency reads from writes in %s', (command, label) => {
    const formatted = activityLabel({ kind: 'tool', command });

    expect(formatted.label).toBe(label);
  });
});
