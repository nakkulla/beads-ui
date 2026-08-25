import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { execAccountsTemplate } from './exec-accounts.js';

/**
 * @param {Record<string, any>} [metadata]
 * @param {Record<string, any>} [catalog]
 * @param {{ onExecChange: (key: string, value: string) => void }} [handlers]
 * @param {Record<string, any>|null} [workspace_defaults]
 */
function mountTemplate(
  metadata = {},
  catalog = {},
  handlers,
  workspace_defaults
) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(
    execAccountsTemplate({
      md: metadata,
      catalog: /** @type {any} */ (catalog),
      workspace_defaults: /** @type {any} */ (workspace_defaults ?? null),
      handlers: handlers || { onExecChange: vi.fn() }
    }),
    mount
  );
  return mount;
}

/**
 * @param {HTMLElement} mount
 * @param {string} key
 */
function selectFor(mount, key) {
  return /** @type {HTMLSelectElement} */ (
    mount.querySelector(`select[data-exec-key="${key}"]`)
  );
}

/**
 * @param {HTMLSelectElement} select
 */
function optionLabels(select) {
  return Array.from(select.options).map(
    (option) => option.textContent?.trim() || ''
  );
}

describe('views/detail-panel/exec-accounts', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders provider accounts and active-login defaults', () => {
    const mount = mountTemplate(
      {},
      {
        claude: {
          accounts: [
            {
              key: 'active@example.com',
              email: 'active@example.com',
              alias: 'main',
              active: true,
              status: 'ok'
            },
            {
              key: 'expired@example.com',
              email: 'expired@example.com',
              alias: null,
              active: false,
              status: 'token_expired'
            }
          ],
          active: null
        },
        codex: {
          accounts: [
            {
              key: 'account-key',
              email: 'codex@example.com',
              alias: 'work',
              plan: 'team',
              active: true,
              status: 'ok'
            }
          ],
          active: null
        }
      }
    );

    expect(mount.querySelector('[data-exec-accounts]')).not.toBe(null);
    expect(optionLabels(selectFor(mount, 'claude_account'))).toEqual([
      '기본값 사용 — 현재 로그인(active@example.com)',
      'active@example.com (main)',
      'expired@example.com · token_expired'
    ]);
    expect(optionLabels(selectFor(mount, 'codex_account'))).toEqual([
      '기본값 사용 — 현재 로그인(codex@example.com · team)',
      'codex@example.com · team (work)'
    ]);
    expect(mount.textContent).toContain(
      '오케스트레이션 런타임이 claude일 때 적용됩니다'
    );
  });

  test('renders unavailable catalogs with removable missing pins', () => {
    const mount = mountTemplate(
      {
        claude_account: 'missing-claude@example.com',
        codex_account: 'missing-codex-key'
      },
      { claude: null, codex: null }
    );

    expect(optionLabels(selectFor(mount, 'claude_account'))).toEqual([
      '(기본)',
      'missing-claude@example.com (목록에 없음)'
    ]);
    expect(optionLabels(selectFor(mount, 'codex_account'))).toEqual([
      '(기본)',
      'missing-codex-key (목록에 없음)'
    ]);
    expect(
      Array.from(mount.querySelectorAll('.detail-effective__hint')).filter(
        (hint) => hint.textContent?.trim() === '계정 목록을 불러올 수 없습니다'
      )
    ).toHaveLength(2);
  });

  test('keeps a pin that is absent from a fetched catalog', () => {
    const mount = mountTemplate(
      { codex_account: 'removed-key' },
      {
        claude: { accounts: [], active: null },
        codex: {
          accounts: [
            {
              key: 'current-key',
              email: 'current@example.com',
              plan: 'pro',
              active: true,
              status: 'ok'
            }
          ],
          active: null
        }
      }
    );
    const select = selectFor(mount, 'codex_account');

    expect(select.value).toBe('removed-key');
    expect(optionLabels(select)).toEqual([
      '기본값 사용 — 현재 로그인(current@example.com · pro)',
      'removed-key (목록에 없음)',
      'current@example.com · pro'
    ]);
  });

  test('emits the account key and selected value', () => {
    const onExecChange = vi.fn();
    const mount = mountTemplate(
      {},
      {
        claude: {
          accounts: [
            {
              key: 'next@example.com',
              email: 'next@example.com',
              active: false,
              status: 'ok'
            }
          ],
          active: null
        },
        codex: { accounts: [], active: null }
      },
      { onExecChange }
    );
    const select = selectFor(mount, 'claude_account');

    select.value = 'next@example.com';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(onExecChange).toHaveBeenCalledWith(
      'claude_account',
      'next@example.com'
    );
  });
});

describe('views/detail-panel/exec-accounts workspace defaults (UI-d3cb §6.2)', () => {
  const CATALOG = {
    claude: {
      accounts: [
        {
          key: 'repo@example.com',
          email: 'repo@example.com',
          alias: 'team',
          active: false,
          status: 'ok'
        },
        {
          key: 'active@example.com',
          email: 'active@example.com',
          active: true,
          status: 'ok'
        }
      ],
      active: null
    },
    codex: {
      accounts: [
        {
          key: 'current-key',
          email: 'current@example.com',
          plan: 'pro',
          active: true,
          status: 'ok'
        }
      ],
      active: null
    }
  };

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('names the repo default in the inherit option', () => {
    const mount = mountTemplate({}, CATALOG, undefined, {
      state: 'usable',
      values: { claude_account: 'repo@example.com' },
      warnings: []
    });

    expect(optionLabels(selectFor(mount, 'claude_account'))[0]).toBe(
      '레포 기본값 사용(repo@example.com (team))'
    );
  });

  test('shows a repo default the catalog does not carry as its stored value', () => {
    const mount = mountTemplate({}, CATALOG, undefined, {
      state: 'usable',
      values: { codex_account: 'retired-key' },
      warnings: []
    });

    expect(optionLabels(selectFor(mount, 'codex_account'))[0]).toBe(
      '레포 기본값 사용(retired-key)'
    );
  });

  test('keeps the active-login label for a provider with no repo default', () => {
    const mount = mountTemplate({}, CATALOG, undefined, {
      state: 'usable',
      values: { claude_account: 'repo@example.com' },
      warnings: []
    });

    expect(optionLabels(selectFor(mount, 'codex_account'))[0]).toBe(
      '기본값 사용 — 현재 로그인(current@example.com · pro)'
    );
  });

  test('keeps the active-login label on an absent layer', () => {
    const mount = mountTemplate({}, CATALOG, undefined, {
      state: 'absent',
      values: {},
      warnings: []
    });

    expect(optionLabels(selectFor(mount, 'claude_account'))[0]).toBe(
      '기본값 사용 — 현재 로그인(active@example.com)'
    );
  });

  test('keeps the active-login label on an unusable layer and shows no warning', () => {
    const mount = mountTemplate({}, CATALOG, undefined, {
      state: 'unusable',
      values: { claude_account: 'repo@example.com' },
      warnings: ['invalid_value:codex_account']
    });

    expect(optionLabels(selectFor(mount, 'claude_account'))[0]).toBe(
      '기본값 사용 — 현재 로그인(active@example.com)'
    );
    expect(mount.textContent).not.toContain('invalid_value');
  });

  test('keeps the active-login label when the request itself failed', () => {
    const mount = mountTemplate({}, CATALOG, undefined, null);

    expect(optionLabels(selectFor(mount, 'claude_account'))[0]).toBe(
      '기본값 사용 — 현재 로그인(active@example.com)'
    );
  });

  test('leaves an explicit pin selected over the repo default', () => {
    const mount = mountTemplate(
      { claude_account: 'active@example.com' },
      CATALOG,
      undefined,
      {
        state: 'usable',
        values: { claude_account: 'repo@example.com' },
        warnings: []
      }
    );

    expect(selectFor(mount, 'claude_account').value).toBe('active@example.com');
  });
});
