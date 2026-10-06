import { expect, test } from 'vitest';
import { takeoverTarget } from './takeover.js';

test.each(['no_launch_record', 'workflow_local_profile_missing'])(
  'excludes a takeover target blocked by %s',
  (takeover_blocker) => {
    const record = {
      stage: 'detached',
      jobs: [
        { adapter: 'slurm', state: 'PENDING', capacity: { takeover_blocker } }
      ]
    };

    const target = takeoverTarget(record);

    expect(target).toBeNull();
  }
);

test.each([undefined, {}, { reason: 'Resources' }])(
  'keeps a pending target without a known blocker (%j)',
  (capacity) => {
    const job = { adapter: 'slurm', state: 'PENDING', capacity };
    const record = { stage: 'hold', jobs: [job] };

    const target = takeoverTarget(record);

    expect(target).toBe(job);
  }
);
