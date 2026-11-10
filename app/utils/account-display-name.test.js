import { describe, expect, test } from 'vitest';
import { accountDisplayName } from './account-display-name.js';

describe('accountDisplayName', () => {
  test('names a Claude account by its email', () => {
    const accounts = [
      { key: 'a@x.com', email: 'a@x.com', alias: null, number: 1 },
      { key: 'b@x.com', email: 'b@x.com', alias: null, number: 2 }
    ];

    const name = accountDisplayName(accounts, 'b@x.com');

    expect(name).toBe('b@x.com');
  });

  test('appends the alias after the email', () => {
    const accounts = [
      { key: 'a@x.com', email: 'a@x.com', alias: 'work', number: 1 }
    ];

    const name = accountDisplayName(accounts, 'a@x.com');

    expect(name).toBe('a@x.com (work)');
  });

  test('finds a row that carries only an email by that email', () => {
    const accounts = [{ email: 'a@x.com', alias: null }];

    const name = accountDisplayName(accounts, 'a@x.com');

    expect(name).toBe('a@x.com');
  });

  test('adds the plan when a Codex list repeats the email', () => {
    const accounts = [
      { key: 'u1::w1', email: 'a@x.com', plan: 'plus', number: 1 },
      { key: 'u1::w2', email: 'a@x.com', plan: 'team', number: 2 },
      { key: 'u2::w3', email: 'b@x.com', plan: 'pro', number: 3 }
    ];

    const names = [
      accountDisplayName(accounts, 'u1::w1'),
      accountDisplayName(accounts, 'u1::w2'),
      accountDisplayName(accounts, 'u2::w3')
    ];

    expect(names).toEqual(['a@x.com · plus', 'a@x.com · team', 'b@x.com']);
  });

  test('keeps the alias beside the plan form', () => {
    const accounts = [
      {
        key: 'u1::w1',
        email: 'a@x.com',
        plan: 'plus',
        alias: 'home',
        number: 1
      },
      { key: 'u1::w2', email: 'a@x.com', plan: 'team', number: 2 }
    ];

    const name = accountDisplayName(accounts, 'u1::w1');

    expect(name).toBe('a@x.com · plus (home)');
  });

  test('appends the number when email and plan still match', () => {
    const accounts = [
      { key: 'u1::w1', email: 'a@x.com', plan: 'team', number: 1 },
      { key: 'u1::w2', email: 'a@x.com', plan: 'team', number: 4 }
    ];

    const names = [
      accountDisplayName(accounts, 'u1::w1'),
      accountDisplayName(accounts, 'u1::w2')
    ];

    expect(names).toEqual(['a@x.com · team #1', 'a@x.com · team #4']);
  });

  test('appends the number when a repeated email has no plan', () => {
    const accounts = [
      { key: 'u1::w1', email: 'a@x.com', plan: null, number: 2 },
      { key: 'u1::w2', email: 'a@x.com', plan: null, number: 3 }
    ];

    const name = accountDisplayName(accounts, 'u1::w2');

    expect(name).toBe('a@x.com #3');
  });

  test('returns the fallback when the key is not in the list', () => {
    const accounts = [{ key: 'a@x.com', email: 'a@x.com', number: 1 }];

    const name = accountDisplayName(accounts, 'gone@x.com', '계정 #9');

    expect(name).toBe('계정 #9');
  });

  test('returns the key when no fallback is given', () => {
    const accounts = [{ key: 'a@x.com', email: 'a@x.com', number: 1 }];

    const name = accountDisplayName(accounts, 'u9::w9');

    expect(name).toBe('u9::w9');
  });

  test('returns the fallback when the list is missing', () => {
    const name = accountDisplayName(null, 'u1::w1', '계정 #2');

    expect(name).toBe('계정 #2');
  });
});
