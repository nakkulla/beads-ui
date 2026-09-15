/**
 * Subscriber-local sequencing and change detection for keyed push channels.
 *
 * @import { WebSocket } from 'ws'
 * @import { KeyedMap } from '../../app/data/keyed-patch.js'
 * @typedef {{ ws: WebSocket, client_id: string, seq?: number, last?: Map<string, string|undefined> }} KeyedSubscriber
 * @typedef {{ values: KeyedMap, canonical: Map<string, string|undefined> }} PreparedKeyed
 */
import { log } from './context.js';

/**
 * Callers share both maps across subscribers and never mutate them afterward.
 * Advance the baseline only after send returns successfully.
 *
 * @param {KeyedSubscriber} sub
 * @param {'worker-queue'|'monitor-pipeline'} channel
 * @param {Record<string, unknown>} body
 * @param {PreparedKeyed} keyed
 * @returns {boolean} Whether a frame was sent.
 */
export function pushKeyed(sub, channel, body, keyed) {
  const first = sub.last === undefined;
  /** @type {Record<string, unknown>} */
  const set = Object.create(null);
  /** @type {string[]} */
  const unset = [];
  if (sub.last !== undefined) {
    for (const [key, canonical] of keyed.canonical) {
      if (!sub.last.has(key) || sub.last.get(key) !== canonical) {
        set[key] = keyed.values.get(key);
      }
    }
    for (const key of sub.last.keys()) {
      if (!keyed.canonical.has(key)) {
        unset.push(key);
      }
    }
    if (Object.keys(set).length === 0 && unset.length === 0) {
      return false;
    }
  }
  const seq = first ? 1 : (sub.seq || 0) + 1;
  const type = `${channel}-${first ? 'snapshot' : 'patch'}`;
  const payload = first
    ? { type, id: sub.client_id, seq, ...body }
    : {
        type,
        id: sub.client_id,
        seq,
        set,
        unset,
        ...(channel === 'worker-queue' ? { root_dir: body.root_dir } : {})
      };
  try {
    if (sub.ws.readyState !== sub.ws.OPEN) {
      log('push %s socket not open id=%s', type, sub.client_id);
      return false;
    }
    sub.ws.send(
      JSON.stringify({ id: `evt-${Date.now()}`, ok: true, type, payload })
    );
  } catch (err) {
    log('push %s send failed id=%s: %o', type, sub.client_id, err);
    return false;
  }
  sub.seq = seq;
  sub.last = keyed.canonical;
  return true;
}
