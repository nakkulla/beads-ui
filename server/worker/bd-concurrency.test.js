/**
 * bd concurrent-write safety (spec §5.5).
 *
 * Headless children issue `bd` writes concurrently. The (database, bead_id) lock
 * (layer 1) must serialize concurrent writers to the SAME bead so a read-modify-
 * write from one session cannot clobber another's. This proves the lock closes
 * the interleaving window; bd server-mode concurrency is the complementary
 * backstop for cross-process writers.
 */
import { describe, expect, test } from 'vitest';
import { createLockManager } from './locks.js';

/**
 * A read-modify-write with an await gap between read and write — the classic
 * lost-update shape when unserialized.
 *
 * @param {{ value: number }} cell
 * @returns {Promise<void>}
 */
async function readModifyWrite(cell) {
  const read = cell.value;
  await new Promise((r) => setTimeout(r, 5));
  cell.value = read + 1;
}

describe('worker/bd concurrency serialization', () => {
  test('WITHOUT the lock, concurrent writers lose updates (baseline)', async () => {
    const cell = { value: 0 };
    await Promise.all([readModifyWrite(cell), readModifyWrite(cell)]);
    // Both read 0, both write 1 → lost update.
    expect(cell.value).toBe(1);
  });

  test('the (database, bead_id) lock serializes concurrent bd writers', async () => {
    const locks = createLockManager();
    const cell = { value: 0 };

    /**
     * @returns {Promise<void>}
     */
    async function guarded() {
      const release = await locks.dupRunLock('dolt://central', 'UI-1');
      try {
        await readModifyWrite(cell);
      } finally {
        release();
      }
    }

    await Promise.all([guarded(), guarded()]);
    // Serialized: 0→1→2, no lost update.
    expect(cell.value).toBe(2);
  });

  test('different beads are NOT serialized against each other', async () => {
    const locks = createLockManager();
    /** @type {string[]} */
    const order = [];
    const a = (async () => {
      const rel = await locks.dupRunLock('db', 'UI-A');
      order.push('a-in');
      await new Promise((r) => setTimeout(r, 10));
      order.push('a-out');
      rel();
    })();
    const b = (async () => {
      const rel = await locks.dupRunLock('db', 'UI-B');
      order.push('b-in');
      rel();
    })();
    await Promise.all([a, b]);
    // b (different bead) runs while a holds its own lock.
    expect(order.indexOf('b-in')).toBeLessThan(order.indexOf('a-out'));
  });
});
