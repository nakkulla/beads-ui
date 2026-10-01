import { describe, expect, test } from 'vitest';
import { errorText } from './error-text.js';

describe('errorText', () => {
  test('reads an Error message', () => {
    const err = new Error('ws disconnected');

    const text = errorText(err);

    expect(text).toBe('ws disconnected');
  });

  test('reads the message of a server refusal object', () => {
    const err = { code: 'bad_request', message: 'impl_runtime: not allowed' };

    const text = errorText(err);

    expect(text).toBe('impl_runtime: not allowed');
  });

  test('falls back to the code of a refusal without a message', () => {
    const err = { code: 'conflict' };

    const text = errorText(err);

    expect(text).toBe('conflict');
  });

  test('stringifies any other value', () => {
    const err = 'timeout';

    const text = errorText(err);

    expect(text).toBe('timeout');
  });
});
