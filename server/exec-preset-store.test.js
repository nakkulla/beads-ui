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
              orchestration_model: 'removed-model',
              orchestration_effort: 4,
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
          settings: { orchestration_model: 'removed-model' },
          origin: { kind: 'user' }
        }
      ]
    });
  });

  test('persists normalized legacy origin and inferred implementation runtime once', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 3,
        presets: [
          { id: 'legacy', name: '기존', settings: { impl_model: 'terra' } }
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
          origin: { kind: 'user' },
          settings: { impl_model: 'terra', impl_runtime: 'codex' }
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
        { id: 'legacy', name: '기존', settings: { impl_model: 'terra' } }
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
          { id: 'legacy', name: '기존', settings: { impl_model: 'terra' } }
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
  test('reuses a legacy migration across restart after resolving a user-name collision', () => {
    const file_path = path.join(tmp_dir, 'exec-presets.json');
    const ids = ['user-preset', 'migration-preset'];
    const store = createExecPresetStore({
      filePath: file_path,
      randomUUID: () => /** @type {string} */ (ids.shift())
    });
    store.create({
      expected_revision: 0,
      name: '이전 기본값 · 작업 공간',
      settings: { orchestration_model: 'sol' }
    });

    const first = store.createOrReuseMigration({
      name: '이전 기본값 · 작업 공간',
      settings: { orchestration_model: 'sol' },
      workspace_key: 'workspace-12345678',
      source_digest: 'legacy-defaults-digest'
    });
    const restarted = createExecPresetStore({ filePath: file_path });
    const resumed = restarted.createOrReuseMigration({
      name: '이전 기본값 · 작업 공간',
      settings: { orchestration_model: 'sol' },
      workspace_key: 'workspace-12345678',
      source_digest: 'legacy-defaults-digest'
    });

    expect(first).toMatchObject({
      applied: true,
      reused: false,
      preset: {
        id: 'migration-preset',
        name: '이전 기본값 · 작업 공간 · 12345678'
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
      settingEnums: () => ({ orchestration_model: ['sol'] })
    });

    const result = store.create({
      expected_revision: 0,
      name: '  기본 개발  ',
      settings: { orchestration_model: 'sol' }
    });

    expect(result).toEqual({
      applied: true,
      conflict: false,
      revision: 1,
      presets: [
        {
          id: 'preset-1',
          name: '기본 개발',
          settings: { orchestration_model: 'sol' },
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
        orchestration_model: ['sol', 'terra'],
        orchestration_effort: ['high']
      })
    });
    store.create({
      expected_revision: 0,
      name: '첫째',
      settings: { orchestration_model: 'sol' }
    });
    store.create({
      expected_revision: 1,
      name: '둘째',
      settings: { orchestration_effort: 'high' }
    });

    const result = store.update({
      expected_revision: 2,
      id: 'preset-1',
      name: '수정됨',
      settings: { orchestration_model: 'terra' }
    });

    expect(result.presets.map((preset) => preset.id)).toEqual([
      'preset-1',
      'preset-2'
    ]);
    expect(result.presets[0]).toEqual({
      id: 'preset-1',
      name: '수정됨',
      settings: { orchestration_model: 'terra' },
      origin: { kind: 'user' }
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
      settings: { orchestration_model: 'removed-model' }
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
      settingEnums: () => ({ orchestration_model: ['sol', 'terra'] })
    });
    good.create({
      expected_revision: 0,
      name: '원본',
      settings: { orchestration_model: 'sol' }
    });
    const before = fs.readFileSync(file_path, 'utf8');
    const failing = createExecPresetStore({
      filePath: file_path,
      settingEnums: () => ({ orchestration_model: ['sol', 'terra'] }),
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
        settings: { orchestration_model: 'terra' }
      })
    ).toThrow(/disk full/);

    expect(failing.snapshot().revision).toBe(1);
    expect(failing.snapshot().presets[0].name).toBe('원본');
    expect(fs.readFileSync(file_path, 'utf8')).toBe(before);
  });
});
