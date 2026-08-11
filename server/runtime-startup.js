import {
  createRuntimeIdentity,
  writeRuntimeMarker
} from './runtime-identity.js';

/**
 * Stop accepting traffic when a bound process cannot publish its identity.
 * Leaving the socket open would prevent `process.exitCode` from ever taking
 * effect and expose a server whose deployment can never be proven.
 *
 * @param {{ close?: () => any }} server
 * @param {{ ok: false, reason: string }} failure
 */
function closeOnFailure(server, failure) {
  try {
    server.close?.();
  } catch {
    // The original identity failure remains the actionable evidence.
  }
  return failure;
}

/**
 * Publish the live process identity for the socket that has already bound.
 *
 * @param {{ server: { address: () => any, close?: () => any }, createIdentity?: typeof createRuntimeIdentity, writeMarker?: typeof writeRuntimeMarker }} input
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
  const writeMarker = input.writeMarker || writeRuntimeMarker;
  const written = writeMarker({ identity: created.identity });
  if (!written.ok) {
    return closeOnFailure(input.server, written);
  }
  return created;
}
