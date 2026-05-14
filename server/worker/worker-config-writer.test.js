import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { updateWorkerConfigFile } from './worker-config-writer.js';

/** @type {string[]} */
const temp_dirs = [];

/**
 * @param {string} content
 * @returns {string}
 */
function writeTomlFixture(content) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-worker-config-'));
  const file_path = path.join(dir, 'config.toml');
  temp_dirs.push(dir);
  fs.writeFileSync(file_path, content);
  return file_path;
}

afterEach(() => {
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('worker config writer', () => {
  test('updates worker defaults while preserving unrelated TOML', () => {
    const config_path = writeTomlFixture(`
default_workspace = "/repo-a"

[labels]
visible_prefixes = ["has:"]
`);

    updateWorkerConfigFile(config_path, {
      default_model: 'gpt-5.4',
      default_effort: 'medium'
    });
    const file_content = fs.readFileSync(config_path, 'utf8');

    expect(file_content).toContain('default_workspace = "/repo-a"');
    expect(file_content).toContain('[labels]');
    expect(file_content).toContain('visible_prefixes = ["has:"]');
    expect(file_content).toContain('[worker]');
    expect(file_content).toContain('default_model = "gpt-5.4"');
    expect(file_content).toContain('default_effort = "medium"');
  });

  test('updates one worker default while preserving the other default', () => {
    const config_path = writeTomlFixture(`
[worker]
default_model = "gpt-5.5"
default_effort = "high"
`);

    updateWorkerConfigFile(config_path, { default_model: 'gpt-5.4' });
    const file_content = fs.readFileSync(config_path, 'utf8');

    expect(file_content).toContain('default_model = "gpt-5.4"');
    expect(file_content).toContain('default_effort = "high"');
  });
});
