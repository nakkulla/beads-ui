/**
 * Markdown block primitive (UI-dbn6 §4.4): untrusted markdown (issue
 * descriptions, session output) rendered through marked + DOMPurify
 * (`utils/markdown.js`) inside one `ui-markdown` block whose typography the
 * token set owns.
 */
import { html } from 'lit-html';
import { renderMarkdown } from '../utils/markdown.js';

/**
 * @param {string} text
 * @param {string} [cls] - A screen class for placement.
 * @returns {import('lit-html').TemplateResult}
 */
export function markdownBlock(text, cls = '') {
  return html`<div class="ui-markdown${cls ? ` ${cls}` : ''}">
    ${renderMarkdown(text)}
  </div>`;
}
