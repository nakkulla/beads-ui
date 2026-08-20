import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from './exec-preset-store.js';

/** @type {string} */
let tmp_dir;

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-exec-presets-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('exec-preset-store defaults', () => {
  test('starts with an empty revision zero snapshot when the file is absent', () => {
    const store = createExecPresetStore({
      filePath: path.join(tmp_dir, 'exec-presets.json')
    });

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({ revision: 0, presets: [] });
  });

  test('normalizes loaded presets while preserving known incompatible strings', () => {
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
      presets: [
        {
          id: 'preset-1',
          name: 'Legacy',
          settings: { impl_model: 'removed-model' },
          origin: { kind: 'user' }
        }
      ]
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
        workflow_mode: 'fast_track',
        impl_runtime: 'codex',
        orchestration_model: 'sol',
        orchestration_effort: 'xhigh',
        orchestration_speed: 'fast'
      }
    });
    const restarted = createExecPresetStore({ filePath: file_path });

    expect(created.applied).toBe(true);
    expect(restarted.snapshot().presets[0].settings).toEqual({
      workflow_mode: 'fast_track',
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
          settings: {
            impl_model: 'sol',
            impl_speed: 'fast'
          },
          origin: { kind: 'user' }
        }
      ]
    });
    expect(createExecPresetStore({ filePath: file_path }).snapshot()).toEqual({
      revision: 1,
      presets: result.presets
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
      settings: { impl_model: 'terra', impl_speed: 'fast' },
      origin: { kind: 'user' }
    });
    expect(
      createExecPresetStore({
        filePath: path.join(tmp_dir, 'exec-presets.json')
      }).snapshot()
    ).toEqual({ revision: 3, presets: result.presets });
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
          settings: {},
          origin: { kind: 'user' }
        }
      ]
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
