import { describe, expect, test } from 'vitest';
import {
  parseDepartureRecord,
  returnHintOf,
  returnWhenOf
} from './active-login-return.js';

const UNTIL = new Date(2026, 10, 10, 14, 5).toISOString();

describe('departure record parser (UI-32oq §4.2)', () => {
  test('keeps a well-formed record', () => {
    const raw = { default_account: 'a', to_account: 'b', until: UNTIL };

    const record = parseDepartureRecord(raw);

    expect(record).toEqual(raw);
  });

  test('keeps a record whose until is null', () => {
    const raw = { default_account: 'a', to_account: 'b', until: null };

    const record = parseDepartureRecord(raw);

    expect(record).toEqual(raw);
  });

  test('drops a record that moved to its own default', () => {
    const raw = { default_account: 'a', to_account: 'a', until: null };

    const record = parseDepartureRecord(raw);

    expect(record).toBeNull();
  });

  test('drops a record with an unreadable until', () => {
    const raw = { default_account: 'a', to_account: 'b', until: 'later' };

    const record = parseDepartureRecord(raw);

    expect(record).toBeNull();
  });

  test('drops a record without an account key', () => {
    const raw = { default_account: '', to_account: 'b', until: null };

    const record = parseDepartureRecord(raw);

    expect(record).toBeNull();
  });

  test('drops a value that is not an object', () => {
    const record = parseDepartureRecord('a→b');

    expect(record).toBeNull();
  });
});

describe('return wording (UI-32oq §4.2, §4.4)', () => {
  test('names the reset clock when until is set', () => {
    const record = { default_account: 'a', to_account: 'b', until: UNTIL };

    const when = returnWhenOf(record);

    expect(when).toBe('리셋 14:05 뒤 복귀');
  });

  test('names the usage recovery when until is null', () => {
    const record = { default_account: 'a', to_account: 'b', until: null };

    const when = returnWhenOf(record);

    expect(when).toBe('사용량 회복 확인 뒤 복귀');
  });

  test('keeps the notice hint without a default name', () => {
    const record = { default_account: 'a', to_account: 'b', until: UNTIL };

    const hint = returnHintOf(record);

    expect(hint).toBe('default 리셋 14:05 뒤 복귀');
  });

  test('names the default in a status line hint', () => {
    const record = { default_account: 'a', to_account: 'b', until: null };

    const hint = returnHintOf(record, 'a@example.com');

    expect(hint).toBe('default a@example.com 사용량 회복 확인 뒤 복귀');
  });
});
