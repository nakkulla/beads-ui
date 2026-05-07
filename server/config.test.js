import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { getConfig } from './config.js';

/** @type {string[]} */
const temp_dirs = [];

/**
 * @param {string} content
 * @returns {string}
 */
function writeTomlFixture(content) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-'));
  const file_path = path.join(dir, 'config.toml');
  temp_dirs.push(dir);
  fs.writeFileSync(file_path, content);
  return file_path;
}

/**
 * @returns {string}
 */
function missingConfigPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-config-missing-'));
  temp_dirs.push(dir);
  return path.join(dir, 'config.toml');
}

afterEach(() => {
  delete process.env.BDUI_FRONTEND_MODE;
  delete process.env.BDUI_CONFIG_PATH;
  for (const dir of temp_dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('getConfig', () => {
  test('returns live frontend_mode when env is live', () => {
    process.env.BDUI_FRONTEND_MODE = 'live';

    const config = getConfig();

    expect(config.frontend_mode).toBe('live');
  });

  test('returns static frontend_mode when env is not live', () => {
    process.env.BDUI_FRONTEND_MODE = 'unexpected';

    const config = getConfig();

    expect(config.frontend_mode).toBe('static');
  });

  test('returns default config when config file is missing', () => {
    process.env.BDUI_CONFIG_PATH = missingConfigPath();

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: []
    });
  });

  test('reads label policy and workspace config from global TOML config file', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
default_workspace = "/repo-a"
scan_roots = ["/scan-a", "", "relative/path"]
workspaces = ["/repo-b", "/repo-b"]

[labels]
visible_prefixes = ["has:", "reviewed:", "area:", "component:"]
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:',
      'area:',
      'component:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: '/repo-a',
      scan_roots: ['/scan-a'],
      workspaces: ['/repo-b']
    });
  });

  test('reads visible exact labels from TOML', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[labels]
visible_prefixes = ["has:", "lane:"]
visible_exact = ["pr", "human", "skill-related"]
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'lane:'
    ]);
    expect(config.label_display_policy.visible_exact).toEqual([
      'pr',
      'human',
      'skill-related'
    ]);
  });

  test('parses valid label color rules from TOML', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[labels.colors.prefix."has:"]
fg = "#16a34a"

[labels.colors.prefix."followup:"]
fg = "#B45309"

[labels.colors.exact."skill-related"]
fg = "#7c3aed"
`);

    const config = getConfig();

    expect(config.label_display_policy.colors).toEqual({
      prefix: {
        'has:': { fg: '#16a34a' },
        'followup:': { fg: '#B45309' }
      },
      exact: {
        'skill-related': { fg: '#7c3aed' }
      }
    });
  });

  test('drops invalid label color rules without dropping valid siblings', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[labels.colors.prefix."has:"]
fg = "green"

[labels.colors.prefix."needs:"]
fg = "#dc2626"

[labels.colors.prefix.empty]
fg = ""

[labels.colors.exact."pr"]
fg = "#1234"

[labels.colors.exact."reviewed:spec"]
fg = "#2563eb"
`);

    const config = getConfig();

    expect(config.label_display_policy.colors).toEqual({
      prefix: {
        'needs:': { fg: '#dc2626' }
      },
      exact: {
        'reviewed:spec': { fg: '#2563eb' }
      }
    });
  });

  test('normalizes default workflow summary config', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture('');

    const config = getConfig();

    expect(config.detail.workflow_summary.sections).toEqual([
      'route',
      'artifacts',
      'review_gates',
      'freshness',
      'delivery',
      'followup',
      'human'
    ]);
    expect(config.detail.workflow_summary.route.fields).toContain('topology');
    expect(config.detail.workflow_summary.route.editable_fields).toEqual([
      'execution_lane',
      'topology'
    ]);
  });

  test('ignores unknown workflow section fields and non-editable edit config', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[detail.workflow_summary]
sections = ["route", "bogus"]

[detail.workflow_summary.route]
fields = ["execution_lane", "bogus"]
editable_fields = ["execution_lane", "workspace_policy", "bogus"]
`);

    const config = getConfig();

    expect(config.detail.workflow_summary.sections).toEqual(['route']);
    expect(config.detail.workflow_summary.route.fields).toEqual([
      'execution_lane'
    ]);
    expect(config.detail.workflow_summary.route.editable_fields).toEqual([
      'execution_lane'
    ]);
  });

  test('keeps backward compatibility for prefix-only configs', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
[labels]
visible_prefixes = ["has:"]
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual(['has:']);
    expect(config.label_display_policy.visible_exact).toEqual([]);
    expect(config.label_display_policy.colors).toEqual({
      prefix: {},
      exact: {}
    });
    expect(config.detail.workflow_summary.route.fields).toContain('topology');
  });

  test('falls back when config TOML is invalid', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture('default_workspace = [');

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: []
    });
  });

  test('falls back when config has no valid prefixes', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
scan_roots = ["/scan-a"]

[labels]
visible_prefixes = [1, true, ""]
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([
      'has:',
      'reviewed:'
    ]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: ['/scan-a'],
      workspaces: []
    });
  });

  test('preserves explicit empty array to hide summary labels', () => {
    process.env.BDUI_CONFIG_PATH = writeTomlFixture(`
workspaces = ["/repo-a"]

[labels]
visible_prefixes = []
`);

    const config = getConfig();

    expect(config.label_display_policy.visible_prefixes).toEqual([]);
    expect(config.workspace_config).toEqual({
      default_workspace: null,
      scan_roots: [],
      workspaces: ['/repo-a']
    });
  });
});
