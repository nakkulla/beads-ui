/**
 * Shared wire-key codec for worker and monitor push channels.
 *
 * @typedef {Map<string, any>} KeyedMap
 * @typedef {{ root_dir: string, queue: Record<string, any> }} WorkerQueueBody
 * @typedef {{ workspaces: Array<Record<string, any>>, workspaces_state: Array<Record<string, any>> }} MonitorPipelineBody
 * @typedef {{ set: Record<string, unknown>, unset: string[] }} KeyedPatch
 */

/**
 * Serialize JSON values with recursively sorted object keys for comparison.
 * Native JSON semantics retain array order and omit undefined object fields.
 *
 * @param {unknown} value
 * @returns {string|undefined}
 */
export function canonicalJson(value) {
  return JSON.stringify(value, (_key, item) => {
    if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
      return Object.fromEntries(
        Object.keys(item)
          .sort()
          .map((key) => [key, item[key]])
      );
    }
    return item;
  });
}

/**
 * @param {WorkerQueueBody} body
 * @returns {KeyedMap}
 */
export function splitWorkerQueue(body) {
  /** @type {KeyedMap} */
  const map = new Map([['root_dir', body.root_dir]]);
  for (const [field, value] of Object.entries(body.queue)) {
    if (field === 'attempts') {
      for (const [attempt_id, attempt] of Object.entries(value)) {
        map.set(`attempts/${attempt_id}`, attempt);
      }
    } else if (value !== undefined) {
      map.set(`queue/${field}`, value);
    }
  }
  return map;
}

/**
 * @param {KeyedMap} map
 * @returns {WorkerQueueBody}
 */
export function assembleWorkerQueue(map) {
  /** @type {Array<[string, any]>} */
  const queue_fields = [];
  /** @type {Array<[string, any]>} */
  const attempts = [];
  for (const [key, value] of map) {
    if (key.startsWith('attempts/')) {
      attempts.push([key.slice('attempts/'.length), value]);
    } else if (key.startsWith('queue/')) {
      queue_fields.push([key.slice('queue/'.length), value]);
    }
  }
  return {
    root_dir: map.get('root_dir'),
    queue: {
      ...Object.fromEntries(queue_fields),
      attempts: Object.fromEntries(attempts)
    }
  };
}

/**
 * @param {MonitorPipelineBody} body
 * @returns {KeyedMap}
 */
export function splitMonitorPipeline(body) {
  /** @type {KeyedMap} */
  const map = new Map([
    ['ws-order', body.workspaces.map((entry) => entry.root_dir)],
    ['state-order', body.workspaces_state.map((entry) => entry.root_dir)]
  ]);
  for (const entry of body.workspaces) {
    const prefix = `ws/${entry.root_dir}/`;
    const fields = splitWorkerQueue({ root_dir: entry.root_dir, queue: entry });
    for (const [key, value] of fields) {
      const suffix = key.startsWith('queue/')
        ? key.slice('queue/'.length)
        : key;
      map.set(`${prefix}${suffix}`, value);
    }
  }
  for (const state of body.workspaces_state) {
    map.set(`state/${state.root_dir}`, state);
  }
  return map;
}

/**
 * Assemble only direct fields and slash-free attempt ids under each ordered
 * root's exact prefix; root paths themselves can contain slashes.
 *
 * @param {KeyedMap} map
 * @returns {MonitorPipelineBody}
 */
export function assembleMonitorPipeline(map) {
  /** @type {MonitorPipelineBody} */
  const body = { workspaces: [], workspaces_state: [] };
  /** @type {string[]} */
  const roots = map.get('ws-order') || [];
  const root_set = new Set(roots);
  for (const root_dir of roots) {
    const prefix = `ws/${root_dir}/`;
    // A child literally named "attempts" shares its direct-field prefix with
    // its parent's attempts. The existing <bead>-<epoch>-<n> id format (§4.1)
    // distinguishes those ids from the queue's named top-level fields.
    const parent_has_attempts =
      root_dir.endsWith('/attempts') &&
      root_set.has(root_dir.slice(0, -'/attempts'.length));
    /** @type {KeyedMap} */
    const fields = new Map();
    for (const [key, value] of map) {
      if (!key.startsWith(prefix)) {
        continue;
      }
      const suffix = key.slice(prefix.length);
      if (!suffix.includes('/')) {
        if (!parent_has_attempts || !/^[^/]+-\d+-\d+$/.test(suffix)) {
          fields.set(`queue/${suffix}`, value);
        }
      } else if (
        suffix.startsWith('attempts/') &&
        !suffix.slice('attempts/'.length).includes('/')
      ) {
        const attempt_id = suffix.slice('attempts/'.length);
        if (
          !root_set.has(`${root_dir}/attempts`) ||
          /^[^/]+-\d+-\d+$/.test(attempt_id)
        ) {
          fields.set(suffix, value);
        }
      }
    }
    if (fields.size > 0) {
      body.workspaces.push(assembleWorkerQueue(fields).queue);
    }
  }
  for (const root_dir of map.get('state-order') || []) {
    const key = `state/${root_dir}`;
    if (map.has(key)) {
      body.workspaces_state.push(map.get(key));
    }
  }
  return body;
}

/**
 * @param {KeyedMap} map
 * @param {KeyedPatch} patch
 * @returns {KeyedMap}
 */
export function applyPatch(map, patch) {
  const next = new Map(map);
  for (const [key, value] of Object.entries(patch.set)) {
    next.set(key, value);
  }
  for (const key of patch.unset) {
    next.delete(key);
  }
  return next;
}
