import { createRuntimeIdentity } from './runtime-identity.js';

/**
 * @param {{ close?: () => any }} server
 * @param {{ ok: false, reason: string }} failure
 */
function closeOnFailure(server, failure) {
  try {
    server.close?.();
  } catch {
    // The original identity failure is the actionable evidence.
  }
  return failure;
}

/**
 * Compute the live process identity for the socket that has already bound.
 * Identity is served in-process by `/healthz`; no filesystem marker is an
 * authority for a running server.
 *
 * @param {{ server: { address: () => any, close?: () => any }, createIdentity?: typeof createRuntimeIdentity }} input
 * @returns {{ ok: true, identity: any }|{ ok: false, reason: string }}
 */
export function publishRuntimeIdentity(input) {
  let address;
  try {
    address = input.server.address();
  } catch {
    return closeOnFailure(input.server, {
      ok: false,
      reason: 'runtime_address_unavailable'
    });
  }
  if (
    !address ||
    typeof address === 'string' ||
    typeof address.address !== 'string' ||
    !Number.isInteger(address.port) ||
    address.port < 1
  ) {
    return closeOnFailure(input.server, {
      ok: false,
      reason: 'runtime_address_unavailable'
    });
  }
  const createIdentity = input.createIdentity || createRuntimeIdentity;
  const created = createIdentity({
    host: address.address,
    port: address.port
  });
  if (!created.ok) {
    return closeOnFailure(input.server, created);
  }
  return created;
}
