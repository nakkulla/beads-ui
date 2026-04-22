import { describe, expect, test } from 'vitest';
import { validateSubscribeListPayload } from './validators.js';

describe('validateSubscribeListPayload', () => {
  test('accepts resolved-issues without params', () => {
    expect(
      validateSubscribeListPayload({
        id: 'tab:issues:resolved',
        type: 'resolved-issues'
      })
    ).toEqual({
      ok: true,
      id: 'tab:issues:resolved',
      spec: { type: 'resolved-issues', params: undefined }
    });
  });

  test('rejects params for resolved-issues', () => {
    expect(
      validateSubscribeListPayload({
        id: 'tab:issues:resolved',
        type: 'resolved-issues',
        params: { since: 1 }
      })
    ).toMatchObject({
      ok: false,
      code: 'bad_request'
    });
  });
});
