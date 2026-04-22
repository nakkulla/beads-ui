import { render } from 'lit-html';
import { describe, expect, test, vi } from 'vitest';
import { createIssueRowRenderer } from './issue-row.js';

describe('views/issue-row', () => {
  test('renders labels using configured visible prefixes getter', () => {
    document.body.innerHTML = '<table><tbody id="mount"></tbody></table>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const renderRow = createIssueRowRenderer({
      navigate: () => {},
      onUpdate: vi.fn(async () => {}),
      requestRender: () => {},
      getVisibleLabelPrefixes: () => ['agent:']
    });

    render(
      renderRow({
        id: 'UI-1',
        title: 'Row',
        labels: ['area:auth', 'agent:codex']
      }),
      mount
    );

    const labels = Array.from(mount.querySelectorAll('.label-badge')).map(
      (element) => element.textContent
    );

    expect(labels).toEqual(['agent:codex']);
  });
});
