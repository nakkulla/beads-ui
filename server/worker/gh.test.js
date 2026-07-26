import { describe, expect, test, vi } from 'vitest';
import { createGh } from './gh.js';

const PR = {
  number: 7,
  url: 'https://github.com/o/r/pull/7',
  headRefName: 'UI-1',
  headRefOid: 'a'.repeat(40),
  state: 'OPEN'
};

/**
 * @param {{ code?: number, stdout?: string, stderr?: string }} [result]
 */
function makeRun(result = {}) {
  return vi.fn(async () => ({
    code: result.code ?? 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? ''
  }));
}

describe('worker/gh — openPrForBranch', () => {
  test('returns ok with the first PR normalized', async () => {
    const run = makeRun({ stdout: JSON.stringify([PR]) });

    const r = await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({
      state: 'ok',
      data: {
        number: 7,
        url: PR.url,
        head_ref: 'UI-1',
        head_sha: PR.headRefOid,
        state: 'OPEN'
      }
    });
  });

  test('queries the open PR for the head branch in the repo dir', async () => {
    const run = makeRun({ stdout: '[]' });

    await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(run).toHaveBeenCalledWith(
      [
        'pr',
        'list',
        '--head',
        'UI-1',
        '--state',
        'open',
        '--json',
        'number,url,headRefName,headRefOid,state'
      ],
      { cwd: '/repo' }
    );
  });

  test('returns empty for a successful query with no open PR', async () => {
    const run = makeRun({ stdout: '[]' });

    const r = await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'empty' });
  });

  test('returns error (not empty) on a non-zero exit', async () => {
    const run = makeRun({ code: 1, stderr: 'boom' });

    const r = await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('reports a missing gh binary distinctly', async () => {
    const run = makeRun({ code: 127 });

    const r = await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_missing' });
  });

  test('returns error (not empty) on unparseable output', async () => {
    const run = makeRun({ stdout: 'not json' });

    const r = await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when the observed PR carries no url', async () => {
    const run = makeRun({ stdout: JSON.stringify([{ number: 7 }]) });

    const r = await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_bad_json' });
  });

  test('returns error when the runner throws', async () => {
    const run = vi.fn(async () => {
      throw new Error('spawn failed');
    });

    const r = await createGh({ run }).openPrForBranch('/repo', 'UI-1');

    expect(r).toEqual({ state: 'error', reason: 'gh_spawn_failed' });
  });
});

describe('worker/gh — checkAvailability', () => {
  test('returns ok when gh auth status exits zero', async () => {
    const run = makeRun();

    const r = await createGh({ run }).checkAvailability();

    expect(r).toEqual({ state: 'ok', data: true });
    expect(run).toHaveBeenCalledWith(['auth', 'status'], {});
  });

  test('returns error when gh is unauthenticated', async () => {
    const run = makeRun({ code: 1 });

    const r = await createGh({ run }).checkAvailability();

    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('probes only once after a successful probe', async () => {
    const run = makeRun();
    const gh = createGh({ run });

    await gh.checkAvailability();
    await gh.checkAvailability();

    expect(run).toHaveBeenCalledTimes(1);
  });

  test('does not re-probe within 30s of a failure', async () => {
    const run = makeRun({ code: 1 });
    let clock = 1000;
    const gh = createGh({ run, now: () => clock });

    await gh.checkAvailability();
    clock += 29_000;
    const r = await gh.checkAvailability();

    expect(run).toHaveBeenCalledTimes(1);
    expect(r).toEqual({ state: 'error', reason: 'gh_failed' });
  });

  test('re-probes after 30s and recovers once gh becomes usable', async () => {
    let code = 1;
    const run = vi.fn(async () => ({ code, stdout: '', stderr: '' }));
    let clock = 1000;
    const gh = createGh({ run, now: () => clock });

    await gh.checkAvailability();
    clock += 30_000;
    code = 0;
    const r = await gh.checkAvailability();

    expect(run).toHaveBeenCalledTimes(2);
    expect(r).toEqual({ state: 'ok', data: true });
  });
});
