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
  '## Selector and dispatch',
  '## Prerequisite gate',
  '## Attempt continuation',
  '## Staleness re-review',
  '## Push safety',
  '## 탐색 지도 (recommended)',
  '## Final PR delivery',
  '## Merge tail',
  '## quick_fix landing',
  '### Worker-dispatched quick_fix',
  '### No-change close (refuted or no-delta)',
  '## Terminal result line',
  '## Completion report'
];

const describeCrossRuntime = fs.existsSync(DOTFILES_ROOT)
  ? describe
  : describe.skip;

describeCrossRuntime('attempt stage-read reference headings', () => {
  test.each(HEADINGS)(
    'finds exactly one %s line across references',
    (heading) => {
      const lines = fs
        .readdirSync(REFERENCES)
        .filter((file) => file.endsWith('.md'))
        .flatMap((file) =>
          fs.readFileSync(path.join(REFERENCES, file), 'utf8').split(/\r?\n/)
        );

      const matches = lines.filter((line) => line === heading);

      expect(matches).toHaveLength(1);
    }
  );

  test('finds the whole-file unattended wait reference', () => {
    const file = path.join(REFERENCES, 'unattended-waits.md');

    const content = fs.readFileSync(file, 'utf8');

    expect(content.trim().length).toBeGreaterThan(0);
  });
});
