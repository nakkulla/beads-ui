import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const DOTFILES_ROOT =
  process.env.DOTFILES_ROOT ||
  path.join(os.homedir(), 'Documents', 'GitHub', 'dotfiles');
const REFERENCES = path.join(
  DOTFILES_ROOT,
  'src/shared/skills/flow/workflow/references'
);

const HEADINGS = [
  ['execution-spec-backed.md', '## Selector and dispatch'],
  ['execution-spec-backed.md', '## Prerequisite gate'],
  ['execution-spec-backed.md', '## Attempt continuation'],
  ['execution-spec-backed.md', '## Staleness re-review'],
  ['execution-common.md', '## Push safety'],
  ['execution-common.md', '## 탐색 지도 (recommended)'],
  ['finishing.md', '## Final PR delivery'],
  ['finishing.md', '## Merge tail'],
  ['execution-quick-fix.md', '## quick_fix landing'],
  ['finishing.md', '### Worker-dispatched quick_fix'],
  ['finishing.md', '### No-change close (refuted or no-delta)'],
  ['finishing.md', '## Terminal result line'],
  ['finishing.md', '## Completion report']
];

const describeCrossRuntime = fs.existsSync(DOTFILES_ROOT)
  ? describe
  : describe.skip;

describeCrossRuntime('attempt stage-read reference headings', () => {
  test.each(HEADINGS)('finds exactly one %s line for %s', (file, heading) => {
    const content = fs.readFileSync(path.join(REFERENCES, file), 'utf8');

    const matches = content.split(/\r?\n/).filter((line) => line === heading);

    expect(matches).toHaveLength(1);
  });

  test('finds the whole-file unattended wait reference', () => {
    const file = path.join(REFERENCES, 'unattended-waits.md');

    const content = fs.readFileSync(file, 'utf8');

    expect(content.trim().length).toBeGreaterThan(0);
  });
});
