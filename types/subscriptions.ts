/**
 * Subscription protocol type definitions (interfaces only).
 * File is .ts by design: interface definitions only.
 */

export interface IssueRef {
  id: string;
  created_at?: number; // epoch ms
  updated_at?: number; // epoch ms
  closed_at?: number | null; // epoch ms or null
}

export interface Issue extends IssueRef {
  // Additional fields are server-defined; keep minimal here to guide clients.
  title?: string;
  status?: string;
  close_reason?: string | null;
  epic_id?: string | null;
  priority?: number;
  issue_type?: string;
  assignee?: string | null;
  labels?: string[];
  // Relationship fields for detail payloads
  dependencies?: DependencyRef[];
  dependents?: DependencyRef[];
}

export interface DependencyRef {
  id: string;
  /**
   * The bd edge kind (`blocks`, `related`, `discovered-from`, `parent-child`).
   * On a `dependents[]` entry, `blocks` means the issue that owns the list
   * blocks this one (UI-lx45 §3.4).
   */
  dependency_type?: string;
  title?: string;
  status?: string;
  priority?: number;
  issue_type?: string;
  created_at?: number;
  updated_at?: number;
  closed_at?: number | null;
}

export type SubscriptionType =
  | 'all-issues'
  | 'epics'
  | 'blocked-issues'
  | 'ready-issues'
  | 'in-progress-issues'
  | 'closed-issues'
  | 'issue-detail';

export interface SubscribeParamsBase {
  /** Client-chosen subscription id (unique per connection). */
  id: string;
  /** Type of list to subscribe to. */
  type: SubscriptionType;
  /** Optional parameters for the list, e.g., epic_id or filters. */
  params?: Record<string, unknown>;
}

export interface SubscribeMessage extends SubscribeParamsBase {
  kind: 'subscribe';
}

export interface UnsubscribeMessage {
  kind: 'unsubscribe';
  id: string;
}

// Mutation messages are explicit and defined elsewhere in the protocol.
// There is no generic "mutate" command pipe from clients.

export type ClientMessage = SubscribeMessage | UnsubscribeMessage;

export interface SnapshotMessage {
  kind: 'snapshot';
  id: string; // client subscription id
  revision: number; // strictly increasing per subscription
  issues: Issue[];
}

export interface UpsertMessage {
  kind: 'upsert';
  id: string;
  revision: number;
  issue: Issue;
}

export interface DeleteMessage {
  kind: 'delete';
  id: string;
  revision: number;
  issue_id: string;
}

export interface ErrorMessage {
  kind: 'error';
  id?: string;
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/** One manual-order rank assignment for a bead (spec §2). */
export interface UiOrderEntry {
  bead_id: string;
  rank: number; // finite; sort key, lower ranks first
}

/**
 * Client → Server: write the full set of manual ranks the client wants applied.
 * CAS-guarded by `expected_revision`.
 */
export interface UiOrderSetMessage {
  kind: 'ui-order-set';
  expected_revision: number;
  entries: UiOrderEntry[];
}

/** Server → Client: the whole manual-order map after any mutation (spec §2). */
export interface UiOrderSnapshotMessage {
  kind: 'ui-order-snapshot';
  id: string; // client subscription id
  revision: number; // CAS counter; bumped on every mutation
  order: Record<string, number>; // bead id → rank
}

export type ServerMessage =
  | SnapshotMessage
  | UpsertMessage
  | DeleteMessage
  | ErrorMessage;

export interface SubscriptionRegistryEntry {
  /** Deterministic key: type + serialized params */
  key: string;
  /** Fast-lookup map for diffing */
  itemsById: Map<string, IssueRef>;
  /** Active subscribers (connection-local ids) */
  subscribers: Set<string>;
  /** For metrics and observability (not used for TTL/GC) */
  lastRunAt?: number;
}
