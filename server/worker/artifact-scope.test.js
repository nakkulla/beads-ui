import { describe, expect, test } from 'vitest';
import { parseArtifactScope, parseNameOnlyLog } from './artifact-scope.js';

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
