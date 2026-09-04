import { describe, expect, test } from 'vitest';
import { resolveCatalog } from './runner-catalog.js';
import { priceUsage } from './usage-pricing.js';

/**
 * A catalog whose `sol` model declares every unit price.
 *
 * @param {Record<string, unknown>} price
 */
function catalogWithPrice(price) {
  return resolveCatalog({
    overrides: { codex: { models: { sol: { price } } } },
    warn: () => {}
  });
}

const FULL_PRICE = {
  input: 2.5,
  output: 10,
  cache_read: 0.25,
  cache_write: 1
};

describe('worker/usage-pricing priceUsage', () => {
  test('prefers the CLI-reported cost over the catalog', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage(
      { input_tokens: 1_000_000, total_cost_usd: 0.42 },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: 0.42, basis: 'reported' });
  });

  test('reports a cost even without a catalog', () => {
    const price = priceUsage({ total_cost_usd: 1.5 }, 'sol', null);

    expect(price).toEqual({ usd: 1.5, basis: 'reported' });
  });

  test('computes the breakdown at the per-million unit prices', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage(
      {
        input_tokens: 1_000_000,
        output_tokens: 500_000,
        cache_read_input_tokens: 2_000_000,
        cache_creation_input_tokens: 1_000_000
      },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: 2.5 + 5 + 0.5 + 1, basis: 'computed' });
  });

  test('ignores reasoning output, which output already counts', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage(
      {
        input_tokens: 0,
        output_tokens: 1_000_000,
        reasoning_output_tokens: 800_000
      },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: 10, basis: 'computed' });
  });

  test('estimates a total-only record at the input rate', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage({ total_tokens: 2_000_000 }, 'sol', catalog);

    expect(price).toEqual({ usd: 5, basis: 'estimated' });
  });

  test('returns none for a total-only record when input has no price', () => {
    const catalog = catalogWithPrice({ output: 10 });

    const price = priceUsage({ total_tokens: 2_000_000 }, 'sol', catalog);

    expect(price).toEqual({ usd: null, basis: 'none' });
  });

  test('returns none when the model matches nothing in the catalog', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage({ input_tokens: 100 }, 'terra', catalog);

    expect(price).toEqual({ usd: null, basis: 'none' });
  });

  test('returns none for a whole leg when one used token kind has no price', () => {
    const catalog = catalogWithPrice({ input: 2.5, output: 10 });

    const price = priceUsage(
      {
        input_tokens: 1_000_000,
        output_tokens: 1_000_000,
        cache_read_input_tokens: 1_000_000
      },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: null, basis: 'none' });
  });

  test('accepts a missing price for a token kind that reported zero', () => {
    const catalog = catalogWithPrice({ input: 2.5, output: 10 });

    const price = priceUsage(
      {
        input_tokens: 1_000_000,
        output_tokens: 0,
        cache_read_input_tokens: 0
      },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: 2.5, basis: 'computed' });
  });

  test('treats an explicit zero unit price as free rather than unknown', () => {
    const catalog = catalogWithPrice({ input: 2.5, cache_write: 0 });

    const price = priceUsage(
      { input_tokens: 1_000_000, cache_creation_input_tokens: 4_000_000 },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: 2.5, basis: 'computed' });
  });

  test('matches the model by its catalog name', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage({ input_tokens: 1_000_000 }, 'sol', catalog);

    expect(price).toEqual({ usd: 2.5, basis: 'computed' });
  });

  test('falls back to matching the model by its CLI id', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage(
      { input_tokens: 1_000_000 },
      'gpt-5.6-sol',
      catalog
    );

    expect(price).toEqual({ usd: 2.5, basis: 'computed' });
  });

  test('returns none for a model the catalog knows without a price', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage({ input_tokens: 1_000_000 }, 'opus', catalog);

    expect(price).toEqual({ usd: null, basis: 'none' });
  });

  test('returns none for a record carrying neither tokens nor a cost', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    expect(priceUsage({}, 'sol', catalog)).toEqual({
      usd: null,
      basis: 'none'
    });
    expect(priceUsage(null, 'sol', catalog)).toEqual({
      usd: null,
      basis: 'none'
    });
  });
});
