import { describe, expect, test } from 'vitest';
import {
  parseArtifactScope,
  parseDescriptionScope,
  parseNameOnlyLog
} from './artifact-scope.js';

describe('artifact scope front matter', () => {
  test('returns declared path prefixes from first-line front matter', () => {
    const content = [
      '---',
      'title: ignored',
      'scope:',
      '  - server/worker/admission.js',
      '  - server/worker/',
      'owner: ignored',
      '  - docs/not-scope.md',
      '---',
      '# Design'
    ].join('\n');

    const scope = parseArtifactScope(content);

    expect(scope).toEqual(['server/worker/admission.js', 'server/worker/']);
  });

  test('returns no declaration without an exact first-line opener', () => {
    const contents = [
      ['# heading', '---', 'scope:', '  - server/', '---'].join('\n'),
      [' ---', 'scope:', '  - server/', '---'].join('\n'),
      ['--- ', 'scope:', '  - server/', '---'].join('\n')
    ];

    const scopes = contents.map((content) => parseArtifactScope(content));

    expect(scopes).toEqual([[], [], []]);
  });

  test('returns no declaration without a closing delimiter', () => {
    const content = ['---', 'scope:', '  - server/'].join('\n');

    const scope = parseArtifactScope(content);

    expect(scope).toEqual([]);
  });

  test('ignores invalid entries independently', () => {
    const content = [
      '---',
      'scope:',
      '  - ',
      '  - /absolute',
      '  - docs/../secret',
      '  - server/*.js',
      '  - server/file?.js',
      '  - server/[ab].js',
      '  - server/x].js',
      '  - :(exclude)server/',
      '  - valid/file.js',
      '---'
    ].join('\n');

    const scope = parseArtifactScope(content);

    expect(scope).toEqual(['valid/file.js']);
  });

  test('returns no declaration when scope is absent or has no valid entries', () => {
    const absent = ['---', 'owner:', '  - team', '---'].join('\n');
    const invalid = ['---', 'scope:', '  - ../outside', '---'].join('\n');

    const scopes = [
      parseArtifactScope(absent),
      parseArtifactScope(invalid),
      parseArtifactScope(null)
    ];

    expect(scopes).toEqual([[], [], []]);
  });
});

describe('description scope section (UI-f1qy §3)', () => {
  test('returns null when the description declares no section', () => {
    const description = ['빠른 수정 설명', '', '## 계획', '- 하나'].join('\n');

    const scope = parseDescriptionScope(description);

    expect(scope).toBeNull();
  });

  test('returns an empty declaration for a section with no valid entries', () => {
    const description = ['## scope', '', '산문 한 줄', ''].join('\n');

    const scope = parseDescriptionScope(description);

    expect(scope).toEqual([]);
  });

  test('returns declared paths in order without duplicates', () => {
    const description = [
      '설명 머리말',
      '',
      '## scope',
      '- server/worker/artifact-scope.js',
      '  - app/views/',
      '- server/worker/artifact-scope.js',
      '이 줄은 무시',
      ''
    ].join('\n');

    const scope = parseDescriptionScope(description);

    expect(scope).toEqual(['server/worker/artifact-scope.js', 'app/views/']);
  });

  test('ignores invalid entries independently', () => {
    const description = [
      '## scope',
      '- ',
      '- /absolute',
      '- docs/../secret',
      '- server/*.js',
      '- server/file?.js',
      '- server/[ab].js',
      '- :(exclude)server/',
      '- valid/file.js'
    ].join('\n');

    const scope = parseDescriptionScope(description);

    expect(scope).toEqual(['valid/file.js']);
  });

  test('stops collecting at the next heading of any level', () => {
    const description = [
      '## scope',
      '- server/worker/',
      '### 세부',
      '- app/views/'
    ].join('\n');

    const scope = parseDescriptionScope(description);

    expect(scope).toEqual(['server/worker/']);
  });

  test('reads only the first section when a second one follows', () => {
    const description = [
      '## scope',
      '- server/worker/',
      '## scope',
      '- app/views/'
    ].join('\n');

    const scope = parseDescriptionScope(description);

    expect(scope).toEqual(['server/worker/']);
  });

  test('does not recognize a capitalized heading', () => {
    const description = ['## Scope', '- server/worker/'].join('\n');

    const scope = parseDescriptionScope(description);

    expect(scope).toBeNull();
  });

  test('returns null for non-string input', () => {
    const scopes = [
      parseDescriptionScope(null),
      parseDescriptionScope(undefined),
      parseDescriptionScope(['## scope'])
    ];

    expect(scopes).toEqual([null, null, null]);
  });
});

describe('git name-only log parser', () => {
  test('returns newest-first commits and stable unique paths', () => {
    const newer = 'b'.repeat(40);
    const older = 'a'.repeat(40);
    const output = [
      newer,
      '',
      'server/worker/admission.js',
      'server/shared.js',
      older,
      '',
      'server/shared.js',
      'docs/spec.md',
      ''
    ].join('\n');

    const parsed = parseNameOnlyLog(output);

    expect(parsed).toEqual({
      delta_shas: [newer, older],
      changed_paths: [
        'server/worker/admission.js',
        'server/shared.js',
        'docs/spec.md'
      ]
    });
  });
});
