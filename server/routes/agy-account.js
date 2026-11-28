/**
 * agy account switch and removal routes (agy-runtime §3.5).
 *
 * Both name a slot by the row number the usage route gave it (the slot's
 * position in `agy-auth list --json`) plus the slot key that row showed, and
 * answer `account_changed` when the number now names another slot. Both run
 * `agy-auth switch`/`remove` through {@link runAgyCredentialChange}: `busy`
 * (409) while an agy run, an agy conversation window, or another credential
 * change is live, and both the model list and the usage cache dropped after a
 * success. A capability
 * `agy-auth` reports off answers `not_supported` before anything runs.
 *
 * @import { Request, RequestHandler, Response } from 'express'
 * @import { AgyAuthList } from './agy-usage.js'
 */
import {
  listAgyAccounts,
  runAgyCredentialChange,
  runAgyRemove,
  runAgySwitch
} from './agy-usage.js';

/**
 * @typedef {{ ok: boolean, error?: string, [key: string]: unknown }} AgyChangeResult
 * @typedef {(action: () => Promise<AgyChangeResult>) => Promise<AgyChangeResult>} AgyChange
 */

/**
 * @param {unknown} body
 * @returns {{ ok: true, number: number, key: string|null, confirm: boolean } | { ok: false, error: string }}
 */
function readRequest(body) {
  const input = /** @type {any} */ (
    body && typeof body === 'object' ? body : {}
  );
  if (!Number.isInteger(input.number) || input.number <= 0) {
    return { ok: false, error: 'invalid_number' };
  }
  return {
    ok: true,
    number: input.number,
    key:
      typeof input.key === 'string' && input.key.length > 0 ? input.key : null,
    confirm: input.confirm === true
  };
}

/**
 * Answer one change result: `busy` is 409, everything else 200.
 *
 * @param {Response} res
 * @param {AgyChangeResult} result
 */
function answer(res, result) {
  res.status(result.ok === false && result.error === 'busy' ? 409 : 200);
  res.json(result);
}

/**
 * Switch the live agy login to the slot the row number and key name.
 *
 * @param {{ listAccounts?: () => Promise<AgyAuthList>, runSwitch?: (name: string) => Promise<AgyChangeResult>, change?: AgyChange }} [options]
 * @returns {RequestHandler}
 */
export function createAgySwitchHandler(options = {}) {
  const listAccounts = options.listAccounts || (() => listAgyAccounts());
  const runSwitch =
    options.runSwitch || ((/** @type {string} */ name) => runAgySwitch(name));
  const change = options.change || ((action) => runAgyCredentialChange(action));

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async function handler(req, res) {
    const request = readRequest(req.body);
    if (!request.ok) {
      res.status(400).json({ ok: false, error: request.error });
      return;
    }
    if (request.key === null) {
      res.status(400).json({ ok: false, error: 'invalid_key' });
      return;
    }
    const list = await listAccounts();
    if (!list.ok) {
      answer(res, { ok: false, error: 'account_list_unavailable' });
      return;
    }
    if (!list.capabilities.switch) {
      answer(res, { ok: false, error: 'not_supported' });
      return;
    }
    const slot = list.slots[request.number - 1];
    if (!slot || slot.name !== request.key) {
      answer(res, { ok: false, error: 'account_changed' });
      return;
    }
    answer(res, await change(() => runSwitch(slot.name)));
  }

  return handler;
}

/**
 * Create the agy removal handler. A removal asks for a confirm first; agy
 * slots carry no repo references, so the confirm lists none.
 *
 * @param {{ listAccounts?: () => Promise<AgyAuthList>, runRemove?: (name: string) => Promise<AgyChangeResult>, change?: AgyChange }} [options]
 * @returns {RequestHandler}
 */
export function createAgyRemoveHandler(options = {}) {
  const listAccounts = options.listAccounts || (() => listAgyAccounts());
  const runRemove =
    options.runRemove || ((/** @type {string} */ name) => runAgyRemove(name));
  const change = options.change || ((action) => runAgyCredentialChange(action));

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async function handler(req, res) {
    const request = readRequest(req.body);
    if (!request.ok) {
      res.status(400).json({ ok: false, error: request.error });
      return;
    }
    if (request.key === null) {
      res.status(400).json({ ok: false, error: 'invalid_key' });
      return;
    }
    const list = await listAccounts();
    if (!list.ok) {
      answer(res, { ok: false, error: 'account_list_unavailable' });
      return;
    }
    if (!list.capabilities.remove) {
      answer(res, { ok: false, error: 'not_supported' });
      return;
    }
    const slot = list.slots[request.number - 1];
    if (!slot || slot.name !== request.key) {
      answer(res, { ok: false, error: 'account_changed' });
      return;
    }
    if (slot.active || slot.name === list.active) {
      answer(res, { ok: false, error: 'account_active' });
      return;
    }
    if (!request.confirm) {
      answer(res, {
        ok: false,
        error: 'confirm_required',
        refs: [],
        unchecked_repos: 0
      });
      return;
    }
    answer(res, await change(() => runRemove(slot.name)));
  }

  return handler;
}

export const agyAccountSwitchHandler = createAgySwitchHandler();
export const agyAccountRemoveHandler = createAgyRemoveHandler();
