import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from './exec-preset-store.js';

/** The three chip bindings a file with no `chip_bindings` field loads as. */
const UNBOUND_CHIPS = { complex: null, frontend: null, backend: null };

/** @type {string} */
let tmp_dir;

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-exec-presets-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('exec-preset-store defaults', () => {
  test.each(['EACCES', 'EIO'])(
    'caches the read failure signal for %s',
    (code) => {
      const readFileSync = vi.fn(() => {
        throw Object.assign(new Error('read failed'), { code });
      });
      const store = createExecPresetStore({
        filePath: path.join(tmp_dir, 'exec-presets.json'),
        fs: { ...fs, readFileSync }
      });

      const first = store.snapshot();
      const second = store.snapshot();

      expect(first).toEqual({
        revision: 0,
        presets: [],
        chip_bindings: UNBOUND_CHIPS,
        read_failed: true
      });
      expect(second).toEqual(first);
      expect(readFileSync).toHaveBeenCalledTimes(1);
    }
  );

  test('caches malformed JSON as an observation without rewriting its bytes', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(file_path, '{broken');
    const store = createExecPresetStore({ filePath: file_path });

    const snapshot = store.snapshot();
    expect(fs.readFileSync(file_path, 'utf8')).toBe('{broken');
    fs.writeFileSync(file_path, JSON.stringify({ revision: 0, presets: [] }));

    expect(snapshot).toEqual({
      revision: 0,
      presets: [],
      chip_bindings: UNBOUND_CHIPS,
      read_failed: true
    });
    expect(store.snapshot()).toEqual(snapshot);
  });

  test('preserves writes after a read failure without persisting its signal', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(file_path, '{broken');
    const store = createExecPresetStore({ filePath: file_path });
    store.snapshot();

    const result = store.create({
      expected_revision: 0,
      name: 'New',
      settings: {}
    });

    expect(result.applied).toBe(true);
    expect(JSON.parse(fs.readFileSync(file_path, 'utf8'))).toEqual({
      revision: 1,
      presets: result.presets,
      chip_bindings: UNBOUND_CHIPS
    });
  });

  test('drops the read failure signal once a write replaces the unreadable bytes', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(file_path, '{broken');
    const store = createExecPresetStore({ filePath: file_path });
    expect(store.snapshot().read_failed).toBe(true);

    store.create({ expected_revision: 0, name: 'New', settings: {} });

    expect(store.snapshot().read_failed).toBeUndefined();
  });

  test('starts with an empty revision zero snapshot when the file is absent', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json')
    });

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({
      revision: 0,
      presets: [],
      chip_bindings: UNBOUND_CHIPS
    });
  });

  test('normalizes loaded presets while preserving every string setting', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 3,
        presets: [
          {
            id: 'preset-1',
            name: ' Legacy ',
            settings: {
              impl_model: 'removed-model',
              impl_effort: 4,
              unknown_key: 'drop-me'
            }
          },
          { id: '', name: 'invalid', settings: {} }
        ]
      })
    );
    const store = createExecPresetStore({ filePath: file_path });

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({
      revision: 3,
      chip_bindings: UNBOUND_CHIPS,
      presets: [
        {
          id: 'preset-1',
          name: 'Legacy',
          applies_to: 'general',
          settings: { impl_model: 'removed-model', unknown_key: 'drop-me' },
          origin: { kind: 'user' }
        }
      ]
    });
  });

  test('drops workflow_mode while loading a stored preset', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 1,
        presets: [
          {
            id: 'preset-1',
            name: '세션 모드 포함',
            settings: {
              workflow_mode: 'fast_track',
              impl_runtime: 'codex'
            }
          }
        ]
      })
    );

    const store = createExecPresetStore({ filePath: file_path });

    expect(store.snapshot().presets[0].settings).toEqual({
      impl_runtime: 'codex'
    });
  });

  test('persists a normalized legacy entry once', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 3,
        presets: [
          {
            id: 'legacy',
            name: ' 기존 ',
            settings: { impl_model: 'terra', unknown_key: 'drop-me' }
          }
        ]
      })
    );
    const store = createExecPresetStore({ filePath: file_path });

    const snapshot = store.snapshot();
    const durable = JSON.parse(fs.readFileSync(file_path, 'utf8'));
    const restarted = createExecPresetStore({ filePath: file_path });

    expect(snapshot).toMatchObject({
      revision: 3,
      presets: [
        {
          id: 'legacy',
          name: '기존',
          origin: { kind: 'user' },
          settings: { impl_model: 'terra' }
        }
      ]
    });
    expect(durable).toEqual(snapshot);
    expect(restarted.snapshot()).toEqual(snapshot);
  });

  test('atomically persists and reloads the reseed marker with replacement presets', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const rename = vi.spyOn(fs, 'renameSync');
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => 'seed-1'
    });

    /** @type {any} */ (store).replaceAllForReseed({
      presets: [
        {
          name: '클로드 라인',
          settings: {
            orchestration_model: 'opus',
            impl_runtime: 'claude'
          }
        }
      ],
      marker: { version: 1 }
    });
    const durable = JSON.parse(fs.readFileSync(file_path, 'utf8'));
    const restarted = createExecPresetStore({ filePath: file_path });

    expect(rename).toHaveBeenCalledTimes(1);
    expect(durable).toEqual({
      revision: 1,
      presets: [
        {
          id: 'seed-1',
          name: '클로드 라인',
          applies_to: 'general',
          settings: {
            orchestration_model: 'opus',
            impl_runtime: 'claude'
          },
          origin: { kind: 'user' }
        }
      ],
      chip_bindings: UNBOUND_CHIPS,
      reseed_migration: { version: 1 }
    });
    expect(restarted.snapshot()).toEqual(durable);
    rename.mockRestore();
  });

  test('keeps parsed legacy presets durable when normalization persistence fails', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const legacy = {
      revision: 7,
      presets: [
        {
          id: 'legacy',
          name: ' 기존 ',
          settings: { impl_model: 'terra', unknown_key: 'drop-me' }
        }
      ]
    };
    fs.writeFileSync(file_path, JSON.stringify(legacy));
    const original_write_file = fs.writeFileSync;
    const write_file = vi.spyOn(fs, 'writeFileSync');
    write_file.mockImplementation((target, data, options) => {
      if (target === `${file_path}.tmp`) {
        throw new Error('disk full');
      }
      return original_write_file(target, data, options);
    });
    const store = createExecPresetStore({ filePath: file_path });

    expect(() => store.snapshot()).toThrow('disk full');

    expect(JSON.parse(fs.readFileSync(file_path, 'utf8'))).toEqual(legacy);
    write_file.mockRestore();
  });

  test('fails closed when normalized state readback changes its revision', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 3,
        presets: [
          {
            id: 'legacy',
            name: ' 기존 ',
            settings: { impl_model: 'terra', unknown_key: 'drop-me' }
          }
        ]
      })
    );
    const original_read_file = fs.readFileSync;
    let reads = 0;
    const read_file = vi.spyOn(fs, 'readFileSync');
    read_file.mockImplementation((target, options) => {
      if (target === file_path && ++reads === 2) {
        return JSON.stringify({ revision: 0, presets: [] });
      }
      return original_read_file(target, options);
    });
    const store = createExecPresetStore({ filePath: file_path });

    expect(() => store.snapshot()).toThrow(
      'Normalized exec preset state failed readback verification'
    );

    read_file.mockRestore();
    expect(store.snapshot()).toMatchObject({ revision: 3 });
  });
});

describe('exec-preset-store CRUD', () => {
  test('persists and reads back a sparse full-profile preset', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => 'profile-1'
    });

    const created = store.create({
      expected_revision: 0,
      name: '빠른 코덱스',
      settings: {
        impl_runtime: 'codex',
        orchestration_model: 'sol',
        orchestration_effort: 'xhigh',
        orchestration_speed: 'fast'
      }
    });
    const restarted = createExecPresetStore({ filePath: file_path });

    expect(created.applied).toBe(true);
    expect(restarted.snapshot().presets[0].settings).toEqual({
      impl_runtime: 'codex',
      orchestration_model: 'sol',
      orchestration_effort: 'xhigh',
      orchestration_speed: 'fast'
    });
  });

  test('reuses an implementation copy across restart after resolving a name collision', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const ids = ['user-preset', 'migration-preset'];
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => /** @type {string} */ (ids.shift())
    });
    store.create({
      expected_revision: 0,
      name: '이전 기본값 · 작업 공간',
      settings: { impl_model: 'sol' }
    });

    const first = store.createOrReuseImplCopy({
      name: '이전 기본값 · 작업 공간',
      settings: { impl_model: 'sol' },
      source_preset_id: 'legacy-preset-1'
    });
    const restarted = createExecPresetStore({ filePath: file_path });
    const resumed = restarted.createOrReuseImplCopy({
      name: '이전 기본값 · 작업 공간',
      settings: { impl_model: 'sol' },
      source_preset_id: 'legacy-preset-1'
    });

    expect(first).toMatchObject({
      applied: true,
      reused: false,
      preset: {
        id: 'migration-preset',
        name: '이전 기본값 · 작업 공간 2'
      }
    });
    expect(resumed).toMatchObject({
      applied: false,
      reused: true,
      preset: { id: 'migration-preset' }
    });
    expect(restarted.snapshot().presets).toHaveLength(2);
  });

  test('creates and persists a validated preset', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => 'preset-1',
      settingEnums: () => ({
        impl_model: ['sol'],
        impl_speed: ['default', 'fast']
      })
    });

    const result = store.create({
      expected_revision: 0,
      name: '  기본 개발  ',
      settings: { impl_model: 'sol', impl_speed: 'fast' }
    });

    expect(result).toEqual({
      applied: true,
      conflict: false,
      revision: 1,
      presets: [
        {
          id: 'preset-1',
          name: '기본 개발',
          applies_to: 'general',
          settings: {
            impl_model: 'sol',
            impl_speed: 'fast'
          },
          origin: { kind: 'user' }
        }
      ],
      chip_bindings: UNBOUND_CHIPS
    });
    expect(createExecPresetStore({ filePath: file_path }).snapshot()).toEqual({
      revision: 1,
      presets: result.presets,
      chip_bindings: UNBOUND_CHIPS
    });
  });

  test('updates settings wholesale while preserving id and list position', () => {
    const ids = ['preset-1', 'preset-2'];
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => String(ids.shift()),
      settingEnums: () => ({
        impl_model: ['sol', 'terra'],
        impl_effort: ['high'],
        impl_speed: ['default', 'fast']
      })
    });
    store.create({
      expected_revision: 0,
      name: '첫째',
      settings: { impl_model: 'sol', impl_speed: 'default' }
    });
    store.create({
      expected_revision: 1,
      name: '둘째',
      settings: { impl_effort: 'high' }
    });

    const result = store.update({
      expected_revision: 2,
      id: 'preset-1',
      name: '수정됨',
      settings: { impl_model: 'terra', impl_speed: 'fast' }
    });

    expect(result.presets.map((preset) => preset.id)).toEqual([
      'preset-1',
      'preset-2'
    ]);
    expect(result.presets[0]).toEqual({
      id: 'preset-1',
      name: '수정됨',
      applies_to: 'general',
      settings: { impl_model: 'terra', impl_speed: 'fast' },
      origin: { kind: 'user' }
    });
    expect(
      createExecPresetStore({
        filePath: path.join(tmp_dir, 'exec-presets.json')
      }).snapshot()
    ).toEqual({
      revision: 3,
      presets: result.presets,
      chip_bindings: UNBOUND_CHIPS
    });
  });

  test('deletes only the named preset without cascading', () => {
    const ids = ['preset-1', 'preset-2'];
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => String(ids.shift()),
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: '첫째', settings: {} });
    store.create({ expected_revision: 1, name: '둘째', settings: {} });

    const result = store.delete({
      expected_revision: 2,
      id: 'preset-1'
    });

    expect(result.applied).toBe(true);
    expect(result.revision).toBe(3);
    expect(result.presets.map((preset) => preset.id)).toEqual(['preset-2']);
  });

  test('returns the authoritative snapshot on a stale revision', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => 'preset-1',
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: '현재', settings: {} });
    const before = fs.readFileSync(file_path, 'utf8');

    const result = store.create({
      expected_revision: 0,
      name: '오래된 요청',
      settings: {}
    });

    expect(result).toEqual({
      applied: false,
      conflict: true,
      revision: 1,
      presets: [
        {
          id: 'preset-1',
          name: '현재',
          applies_to: 'general',
          settings: {},
          origin: { kind: 'user' }
        }
      ],
      chip_bindings: UNBOUND_CHIPS
    });
    expect(fs.readFileSync(file_path, 'utf8')).toBe(before);
  });

  test('rejects a missing revision as invalid instead of a conflict', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      settingEnums: () => ({})
    });

    const result = store.create(
      /** @type {any} */ ({ name: '누락', settings: {} })
    );

    expect(result).toMatchObject({
      applied: false,
      conflict: false,
      revision: 0,
      reason: 'invalid'
    });
  });

  test('rejects duplicate names case-insensitively without a revision bump', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => 'preset-1',
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: 'Default', settings: {} });

    const result = store.create({
      expected_revision: 1,
      name: ' default ',
      settings: {}
    });

    expect(result.applied).toBe(false);
    expect(result.conflict).toBe(false);
    expect(result.revision).toBe(1);
    expect(result.presets).toHaveLength(1);
  });

  test('rejects unknown or incompatible setting values', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      settingEnums: () => ({ orchestration_model: ['sol'] })
    });

    const incompatible = store.create({
      expected_revision: 0,
      name: '비호환',
      settings: { impl_model: 'removed-model' }
    });
    const unknown = store.create({
      expected_revision: 0,
      name: '알 수 없음',
      settings: { unknown_key: 'value' }
    });

    expect(incompatible).toMatchObject({
      applied: false,
      conflict: false,
      revision: 0
    });
    expect(unknown).toMatchObject({
      applied: false,
      conflict: false,
      revision: 0
    });
  });

  test('returns isolated snapshots', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => 'preset-1',
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: '원본', settings: {} });

    store.snapshot().presets[0].name = '변경';

    expect(store.snapshot().presets[0].name).toBe('원본');
  });

  test('keeps cache and revision unchanged when persistence fails', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const good = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => 'preset-1',
      settingEnums: () => ({ impl_model: ['sol', 'terra'] })
    });
    good.create({
      expected_revision: 0,
      name: '원본',
      settings: { impl_model: 'sol' }
    });
    const before = fs.readFileSync(file_path, 'utf8');
    const failing = createExecPresetStore({
      filePath: file_path,
      settingEnums: () => ({ impl_model: ['sol', 'terra'] }),
      fs: /** @type {any} */ ({
        readFileSync: fs.readFileSync,
        mkdirSync: fs.mkdirSync,
        renameSync: fs.renameSync,
        rmSync: fs.rmSync,
        writeFileSync: () => {
          throw new Error('disk full');
        }
      })
    });

    expect(() =>
      failing.update({
        expected_revision: 1,
        id: 'preset-1',
        name: '변경',
        settings: { impl_model: 'terra' }
      })
    ).toThrow(/disk full/);

    expect(failing.snapshot().revision).toBe(1);
    expect(failing.snapshot().presets[0].name).toBe('원본');
    expect(fs.readFileSync(file_path, 'utf8')).toBe(before);
  });
});

describe('exec-preset-store profiles', () => {
  test('reads a stored preset without applies_to as a general preset', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 1,
        presets: [{ id: 'p1', name: '계열 없음', settings: {} }]
      })
    );
    const store = createExecPresetStore({ filePath: file_path });

    const snapshot = store.snapshot();

    expect(snapshot.presets[0].applies_to).toBe('general');
  });

  test('reads a stored applies_to outside the vocabulary as a general preset', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 1,
        presets: [{ id: 'p1', name: '레인', applies_to: 'lane', settings: {} }]
      })
    );
    const store = createExecPresetStore({ filePath: file_path });

    const snapshot = store.snapshot();

    expect(snapshot.presets[0].applies_to).toBe('general');
  });

  test('creates a quick_fix preset from canonical implementation keys', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => 'qf-1'
    });

    const result = store.create({
      expected_revision: 0,
      name: '빠른 수정 기본',
      applies_to: 'quick_fix',
      settings: {
        orchestration_model: 'astra',
        impl_runtime: 'codex',
        impl_model: 'sol'
      }
    });

    expect(result.applied).toBe(true);
    expect(result.presets[0]).toEqual({
      id: 'qf-1',
      name: '빠른 수정 기본',
      applies_to: 'quick_fix',
      settings: {
        orchestration_model: 'astra',
        impl_runtime: 'codex',
        impl_model: 'sol'
      },
      origin: { kind: 'user' }
    });
  });

  test('rejects a review key in a quick_fix preset', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json')
    });

    const result = store.create({
      expected_revision: 0,
      name: '리뷰 포함',
      applies_to: 'quick_fix',
      settings: { impl_review_model: 'fable' }
    });

    expect(result).toMatchObject({
      applied: false,
      conflict: false,
      revision: 0,
      reason: 'invalid'
    });
  });

  test('rejects an auto implementation runtime in a quick_fix preset', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json')
    });

    const result = store.create({
      expected_revision: 0,
      name: '자동 런타임',
      applies_to: 'quick_fix',
      settings: { impl_runtime: 'auto' }
    });

    expect(result.applied).toBe(false);
  });

  test('rejects a prefixed quick_fix key in a general preset', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json')
    });

    const result = store.create({
      expected_revision: 0,
      name: '접두 키',
      settings: { quick_fix_impl_runtime: 'codex' }
    });

    expect(result.applied).toBe(false);
  });

  test('rejects a duplicate name across the two profiles', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => 'preset-1'
    });
    store.create({
      expected_revision: 0,
      name: '실행 기본',
      settings: { impl_runtime: 'codex' }
    });

    const result = store.create({
      expected_revision: 1,
      name: ' 실행 기본 ',
      applies_to: 'quick_fix',
      settings: { impl_runtime: 'codex' }
    });

    expect(result.applied).toBe(false);
    expect(result.presets).toHaveLength(1);
  });

  test('keeps a preset in its own profile through an update', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => 'qf-1'
    });
    store.create({
      expected_revision: 0,
      name: '빠른 수정',
      applies_to: 'quick_fix',
      settings: { impl_runtime: 'codex' }
    });

    const updated = store.update({
      expected_revision: 1,
      id: 'qf-1',
      name: '빠른 수정',
      settings: { impl_runtime: 'claude' }
    });
    const review_key = store.update({
      expected_revision: 2,
      id: 'qf-1',
      name: '빠른 수정',
      settings: { impl_review_model: 'fable' }
    });

    expect(updated.presets[0].applies_to).toBe('quick_fix');
    expect(review_key.applied).toBe(false);
  });
});

describe('exec-preset-store profile migration', () => {
  /**
   * Write one legacy preset file and open a store over it. The ids are handed
   * out in order so each test can name the migration copy it expects.
   *
   * @param {unknown[]} presets
   * @param {string[]} ids
   * @param {Record<string, unknown>} [extra]
   */
  function legacyStore(presets, ids, extra = {}) {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({ revision: 4, presets, ...extra })
    );
    return {
      file_path,
      store: createExecPresetStore({
        filePath: file_path,
        randomUUID: () => String(ids.shift())
      })
    };
  }

  test('lifts the quick fix keys into one copy while preserving the originals', () => {
    const { file_path, store } = legacyStore(
      [
        {
          id: 'p1',
          name: '오퍼스 라인',
          settings: {
            orchestration_model: 'opus',
            impl_runtime: 'claude',
            quick_fix_orchestration_model: 'astra',
            quick_fix_orchestration_effort: 'xhigh'
          },
          origin: { kind: 'user' }
        },
        {
          id: 'p2',
          name: '코덱스 라인',
          settings: {
            impl_runtime: 'codex',
            quick_fix_orchestration_model: 'astra',
            quick_fix_orchestration_effort: 'xhigh'
          },
          origin: { kind: 'legacy-preset-copy', source_preset_id: 'old-1' }
        }
      ],
      ['qf-1']
    );

    const result = /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 1 }
    });

    expect(result.revision).toBe(5);
    expect(result.presets).toEqual([
      {
        id: 'p1',
        name: '오퍼스 라인',
        applies_to: 'general',
        settings: { orchestration_model: 'opus', impl_runtime: 'claude' },
        origin: { kind: 'user' }
      },
      {
        id: 'p2',
        name: '코덱스 라인',
        applies_to: 'general',
        settings: { impl_runtime: 'codex' },
        origin: { kind: 'legacy-preset-copy', source_preset_id: 'old-1' }
      },
      {
        id: 'qf-1',
        name: 'quick fix 기본',
        applies_to: 'quick_fix',
        settings: {
          orchestration_model: 'astra',
          orchestration_effort: 'xhigh'
        },
        origin: { kind: 'legacy-preset-copy', source_preset_id: 'p1' }
      }
    ]);
    expect(JSON.parse(fs.readFileSync(file_path, 'utf8'))).toEqual({
      revision: 5,
      presets: result.presets,
      chip_bindings: UNBOUND_CHIPS,
      preset_profile_migration: { version: 1 }
    });
  });

  test('creates one quick fix preset per distinct combination', () => {
    const { store } = legacyStore(
      [
        {
          id: 'p1',
          name: '첫째',
          settings: { quick_fix_impl_runtime: 'codex' },
          origin: { kind: 'user' }
        },
        {
          id: 'p2',
          name: '둘째',
          settings: { quick_fix_impl_runtime: 'claude' },
          origin: { kind: 'user' }
        },
        {
          id: 'p3',
          name: '셋째',
          settings: { quick_fix_impl_runtime: 'codex' },
          origin: { kind: 'user' }
        }
      ],
      ['qf-1', 'qf-2']
    );

    const result = /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 1 }
    });

    expect(result.presets.slice(3)).toEqual([
      {
        id: 'qf-1',
        name: 'quick fix 기본',
        applies_to: 'quick_fix',
        settings: { impl_runtime: 'codex' },
        origin: { kind: 'legacy-preset-copy', source_preset_id: 'p1' }
      },
      {
        id: 'qf-2',
        name: 'quick fix 기본 2',
        applies_to: 'quick_fix',
        settings: { impl_runtime: 'claude' },
        origin: { kind: 'legacy-preset-copy', source_preset_id: 'p2' }
      }
    ]);
  });

  test('creates nothing when no preset carries a quick fix value', () => {
    const { store } = legacyStore(
      [
        {
          id: 'p1',
          name: '일반만',
          settings: { impl_runtime: 'codex' },
          origin: { kind: 'user' }
        }
      ],
      ['unused']
    );

    const result = /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 1 }
    });

    expect(result.applied).toBe(true);
    expect(result.presets).toHaveLength(1);
  });

  test('skips a second run once the marker is stored', () => {
    const { file_path, store } = legacyStore(
      [
        {
          id: 'p1',
          name: '첫째',
          settings: { quick_fix_impl_runtime: 'codex' },
          origin: { kind: 'user' }
        }
      ],
      ['qf-1', 'qf-2']
    );
    /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 1 }
    });
    const after_first = fs.readFileSync(file_path, 'utf8');

    const repeated = /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 1 }
    });
    const restarted = createExecPresetStore({ filePath: file_path });
    const resumed = /** @type {any} */ (restarted).migratePresetProfiles({
      marker: { version: 1 }
    });

    expect(repeated).toMatchObject({ applied: false, revision: 5 });
    expect(resumed).toMatchObject({ applied: false, revision: 5 });
    expect(fs.readFileSync(file_path, 'utf8')).toBe(after_first);
  });

  test('resumes after the reseed step and keeps that marker', () => {
    const { store } = legacyStore(
      [
        {
          id: 'p1',
          name: '첫째',
          settings: { quick_fix_impl_runtime: 'codex' },
          origin: { kind: 'user' }
        }
      ],
      ['qf-1'],
      { reseed_migration: { version: 1 } }
    );

    const result = /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 1 }
    });

    expect(result.applied).toBe(true);
    expect(store.snapshot()).toMatchObject({
      revision: 5,
      reseed_migration: { version: 1 },
      preset_profile_migration: { version: 1 }
    });
  });

  test('rejects a malformed marker without touching the presets', () => {
    const { file_path, store } = legacyStore(
      [
        {
          id: 'p1',
          name: '첫째',
          settings: { quick_fix_impl_runtime: 'codex' },
          origin: { kind: 'user' }
        }
      ],
      ['qf-1']
    );
    store.snapshot();
    const before = fs.readFileSync(file_path, 'utf8');

    const result = /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 0 }
    });

    expect(result).toMatchObject({ applied: false, reason: 'invalid' });
    expect(fs.readFileSync(file_path, 'utf8')).toBe(before);
  });

  test('fails closed when the migrated state does not read back', () => {
    const { file_path, store } = legacyStore(
      [
        {
          id: 'p1',
          name: '첫째',
          settings: { quick_fix_impl_runtime: 'codex' },
          origin: { kind: 'user' }
        }
      ],
      ['qf-1']
    );
    store.snapshot();
    const original_read_file = fs.readFileSync;
    const read_file = vi.spyOn(fs, 'readFileSync');
    read_file.mockImplementation((target, options) => {
      if (target === file_path) {
        return JSON.stringify({ revision: 0, presets: [] });
      }
      return original_read_file(target, options);
    });

    expect(() =>
      /** @type {any} */ (store).migratePresetProfiles({
        marker: { version: 1 }
      })
    ).toThrow('Exec preset profile split failed readback verification');

    read_file.mockRestore();
  });
});

describe('exec-preset-store profile migration idempotence', () => {
  test('leaves an existing quick_fix preset alone when the marker was lost', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 8,
        presets: [
          {
            id: 'p1',
            name: '일반',
            applies_to: 'general',
            settings: { impl_runtime: 'codex' },
            origin: { kind: 'user' }
          },
          {
            id: 'qf-1',
            name: 'quick fix 기본',
            applies_to: 'quick_fix',
            settings: { impl_runtime: 'codex' },
            origin: { kind: 'legacy-preset-copy', source_preset_id: 'p1' }
          }
        ]
      })
    );
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => 'unexpected'
    });

    const result = /** @type {any} */ (store).migratePresetProfiles({
      marker: { version: 1 }
    });

    expect(result.applied).toBe(true);
    expect(result.presets).toHaveLength(2);
    expect(result.presets[1]).toEqual({
      id: 'qf-1',
      name: 'quick fix 기본',
      applies_to: 'quick_fix',
      settings: { impl_runtime: 'codex' },
      origin: { kind: 'legacy-preset-copy', source_preset_id: 'p1' }
    });
  });
});

describe('exec-preset-store chip bindings', () => {
  test('drops a chip key outside the vocabulary on load', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 2,
        presets: [],
        chip_bindings: { complex: 'preset-1', 세션: 'preset-1' }
      })
    );
    const store = createExecPresetStore({ filePath: file_path });

    const snapshot = store.snapshot();

    expect(snapshot.chip_bindings).toEqual({
      complex: 'preset-1',
      frontend: null,
      backend: null
    });
  });

  test('persists a binding under the list revision CAS', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => 'preset-1',
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: '일반', settings: {} });

    const result = /** @type {any} */ (
      store.bindChip({
        expected_revision: 1,
        chip: 'complex',
        preset_id: 'preset-1'
      })
    );

    expect(result).toMatchObject({ applied: true, revision: 2 });
    expect(
      createExecPresetStore({ filePath: file_path }).snapshot().chip_bindings
    ).toEqual({ complex: 'preset-1', frontend: null, backend: null });
  });

  test('refuses a stale revision without writing the binding', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => 'preset-1',
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: '일반', settings: {} });

    const result = /** @type {any} */ (
      store.bindChip({
        expected_revision: 0,
        chip: 'complex',
        preset_id: 'preset-1'
      })
    );

    expect(result).toMatchObject({ applied: false, conflict: true });
    expect(store.snapshot().chip_bindings.complex).toBe(null);
  });

  test('refuses a preset id that is not in the list', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      settingEnums: () => ({})
    });

    const result = /** @type {any} */ (
      store.bindChip({
        expected_revision: 0,
        chip: 'complex',
        preset_id: 'missing'
      })
    );

    expect(result).toMatchObject({ applied: false, reason: 'invalid' });
  });

  test('unbinds a chip with a null preset id', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => 'preset-1',
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: '일반', settings: {} });
    store.bindChip({
      expected_revision: 1,
      chip: 'frontend',
      preset_id: 'preset-1'
    });

    const result = /** @type {any} */ (
      store.bindChip({
        expected_revision: 2,
        chip: 'frontend',
        preset_id: null
      })
    );

    expect(result.applied).toBe(true);
    expect(store.snapshot().chip_bindings.frontend).toBe(null);
  });

  test('nulls every binding onto a preset the delete removes', () => {
    const ids = ['preset-1', 'preset-2'];
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json'),
      randomUUID: () => String(ids.shift()),
      settingEnums: () => ({})
    });
    store.create({ expected_revision: 0, name: '첫째', settings: {} });
    store.create({ expected_revision: 1, name: '둘째', settings: {} });
    store.bindChip({
      expected_revision: 2,
      chip: 'complex',
      preset_id: 'preset-1'
    });
    store.bindChip({
      expected_revision: 3,
      chip: 'backend',
      preset_id: 'preset-2'
    });

    const result = /** @type {any} */ (
      store.delete({ expected_revision: 4, id: 'preset-1' })
    );

    expect(result.chip_bindings).toEqual({
      complex: null,
      frontend: null,
      backend: 'preset-2'
    });
  });
});
