import { render } from 'lit-html';
import { describe, expect, test } from 'vitest';
import { logPathTemplate } from './log-path.js';

/**
 * @param {unknown} value
 * @param {unknown} [material]
 * @returns {HTMLElement}
 */
function draw(value, material) {
  const mount = document.createElement('div');
  render(logPathTemplate(value, material), mount);
  return mount;
}

describe('logPathTemplate (UI-i8cy §5.5)', () => {
  test('draws the log-view control and the copy icon with full material', () => {
    const mount = draw('/state/op.log', {
      workspace: '/repo',
      source: 'operation',
      id: 'op-1'
    });

    const control = /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="log-view-open"]')
    );
    expect(control.classList.contains('op-btn')).toBe(true);
    expect(control.dataset.workspace).toBe('/repo');
    expect(mount.querySelector('[data-seam="log-path-copy"]')).not.toBeNull();
    expect(mount.querySelector('.worker-ev__path')).toBeNull();
  });

  test.each([
    ['no material', undefined],
    ['no workspace', { workspace: '', source: 'operation', id: 'op-1' }],
    ['an unknown source', { workspace: '/repo', source: 'file', id: 'op-1' }],
    ['no id', { workspace: '/repo', source: 'cleanup', id: '' }]
  ])('falls back to the path and copy with %s', (_name, material) => {
    const mount = draw('/state/op.log', material);

    expect(mount.querySelector('.worker-ev__path')?.textContent).toBe(
      '/state/op.log'
    );
    expect(mount.querySelector('[data-seam="log-view-open"]')).toBeNull();
    expect(mount.querySelector('[data-seam="log-path-copy"]')).not.toBeNull();
  });

  test('draws nothing without a path', () => {
    const mount = draw('', { workspace: '/repo', source: 'cleanup', id: 'X' });

    expect(mount.textContent?.trim()).toBe('');
  });
});
