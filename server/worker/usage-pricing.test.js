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
  test('prices observed counters when optional fields are absent', () => {
    const catalog = catalogWithPrice({ input: 10, output: 20, cache_read: 1 });

    const price = priceUsage(
      {
        input_tokens: 100,
        output_tokens: 10,
        cache_read_input_tokens: 60,
        cache_creation_input_tokens: undefined
      },
      'sol',
      catalog
    );

    expect(price.basis).toBe('computed');
    expect(price.usd).toBeCloseTo(0.00066, 10);
  });
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

  test('leaves ambiguous Codex cache-write breakdown unpriced', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage(
      {
        input_tokens: 1_000_000,
        output_tokens: 500_000,
        cache_read_input_tokens: 500_000,
        cache_creation_input_tokens: 1_000_000
      },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: null, basis: 'none' });
  });

  test('charges Codex cached input once', () => {
    const catalog = catalogWithPrice({
      input: 10,
      cache_read: 1,
      output: 20
    });

    const price = priceUsage(
      {
        input_tokens: 100,
        cache_read_input_tokens: 60,
        output_tokens: 10
      },
      'sol',
      catalog
    );

    expect(price.basis).toBe('computed');
    expect(price.usd).toBeCloseTo(0.00066, 10);
  });

  test('keeps Claude cache counters additive', () => {
    const catalog = resolveCatalog({
      overrides: {
        claude: {
          models: {
            'opus-4.6': {
              price: { input: 10, cache_read: 1, output: 20 }
            }
          }
        }
      },
      warn: () => {}
    });

    const price = priceUsage(
      {
        input_tokens: 100,
        cache_read_input_tokens: 60,
        output_tokens: 10
      },
      'opus-4.6',
      catalog
    );

    expect(price).toEqual({ usd: 0.00126, basis: 'computed' });
  });

  test('rejects invalid Codex cache partitions', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    expect(
      priceUsage(
        { input_tokens: 10, cache_read_input_tokens: 11 },
        'sol',
        catalog
      )
    ).toEqual({ usd: null, basis: 'none' });
    expect(priceUsage({ input_tokens: -1 }, 'sol', catalog)).toEqual({
      usd: null,
      basis: 'none'
    });
    expect(
      priceUsage(
        { input_tokens: 10, output_tokens: Number.NaN },
        'sol',
        catalog
      )
    ).toEqual({ usd: null, basis: 'none' });
    expect(
      priceUsage({ input_tokens: 10, output_tokens: -1 }, 'sol', catalog)
    ).toEqual({ usd: null, basis: 'none' });
    expect(priceUsage({ total_cost_usd: -1 }, 'sol', catalog)).toEqual({
      usd: null,
      basis: 'none'
    });
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

  test('does not price an unproven Codex cache-write partition', () => {
    const catalog = catalogWithPrice({ input: 2.5, cache_write: 0 });

    const price = priceUsage(
      { input_tokens: 1_000_000, cache_creation_input_tokens: 4_000_000 },
      'sol',
      catalog
    );

    expect(price).toEqual({ usd: null, basis: 'none' });
  });

  test('matches the model by its catalog name', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage({ input_tokens: 1_000_000 }, 'sol', catalog);

    expect(price).toEqual({ usd: 2.5, basis: 'computed' });
  });

  test('falls back to matching the model by its CLI id', () => {
    const catalog = catalogWithPrice(FULL_PRICE);

    const price = priceUsage(
      {
        input_tokens: 1_000_000,
        cache_read_input_tokens: 500_000
      },
      'gpt-5.6-sol',
      catalog
    );

    expect(price).toEqual({ usd: 1.375, basis: 'computed' });
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
