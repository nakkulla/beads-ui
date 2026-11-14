/** Prerequisite spec conversations consume dotfiles' blocker-Bead once rule. */
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { latestImplementationAttempts } from '../../app/utils/active-attempts.js';
import { workerLabels } from '../../app/utils/worker-eligibility.js';
import { runBdJsonProjected } from '../bd.js';
import { DEFAULT_INQUIRY_TMUX_SESSION, getConfig } from '../config.js';
import {
  conversationAutoLaunchEnabled,
  freshConversationRuntime,
  getConversationSettings
} from '../conversation-settings.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { resolveSpecEvidence } from '../spec-id.js';
import { fillSpecAuthoringEntry } from './direction-inquiry.js';
import { queryForeignBlockerStatus } from './foreign-blocker-status.js';
import { createNotifier } from './notify.js';
import { emitQueueChanged } from './queue-events.js';
import { resolveSessionLaunchOptions } from './session-launch-accounts.js';
import {
  SPEC_AUTHORING_PANE_MARKER,
  createTmuxLauncher
} from './tmux-launcher.js';

/** @typedef {{ workspace: string, bead_id: string, blockers: any[], attempt: any|null }} SpecEvidence */
/** @typedef {'spec_needed'|'entry_needed'} SpecAuthoringState */
/** @type {Set<string>} Reservations shared by auto triggers and clicks. */
const in_flight = new Set();

/** @returns {string[]} */
export function specAuthoringRoots() {
  return getAvailableWorkspaces().map((entry) => path.resolve(entry.path));
}

/**
 * Queue membership is the proof's boundary; a removed original blocks nothing.
 *
 * @param {any} queue
 * @returns {Set<string>}
 */
function queuedIds(queue) {
  return new Set(
    [
      ...(queue.queue || []),
      ...(queue.serial_lanes || []).flatMap(
        (/** @type {any} */ lane) => lane.entries || []
      )
    ].map((entry) => entry.bead_id)
  );
}

/**
 * Fold both contract evidence points onto each currently queued original.
 *
 * @param {string} workspace
 * @param {any} queue
 * @returns {SpecEvidence[]}
 */
export function specAuthoringEvidence(workspace, queue) {
  const latest = latestImplementationAttempts(queue.attempts || {});
  /** @type {SpecEvidence[]} */
  const evidence = [];
  for (const bead_id of queuedIds(queue)) {
    const attempt = latest.get(bead_id);
    const waiting =
      attempt?.status === 'waiting' && attempt.cause === 'prerequisite_unmet';
    const admission = queue.admission?.[bead_id];
    const blockers = [
      ...(waiting ? attempt.cause_detail?.blockers || [] : []),
      ...(admission?.reason === 'prerequisite_unmet'
        ? admission.blockers || []
        : [])
    ].filter(
      (blocker) => typeof blocker?.id === 'string' && blocker.id.length > 0
    );
    if (blockers.length > 0) {
      evidence.push({
        workspace,
        bead_id,
        blockers,
        attempt: waiting ? attempt : null
      });
    }
  }
  return evidence;
}

/**
 * The same target judgment serves launches, clicks and card projection. Spec
 * publication uses the existing placement evidence, never a new receipt rule.
 *
 * @param {{ issue: any, queue: any, ready: boolean|null, root: string|null, blocks: boolean }} input
 * @returns {SpecAuthoringState|null}
 */
export function specAuthoringState({ issue, queue, ready, root, blocks }) {
  if (
    !blocks ||
    !root ||
    !issue ||
    issue.status !== 'open' ||
    issue.metadata?.route !== 'spec_backed' ||
    issue.is_gate === true ||
    issue.issue_type === 'gate'
  ) {
    return null;
  }
  const defer = issue.defer ?? issue.defer_until;
  if (defer !== undefined && defer !== null && defer !== '') {
    return null;
  }
  if (
    queuedIds(queue).has(issue.id) ||
    Object.values(queue.attempts || {}).some(
      (attempt) => attempt.bead_id === issue.id && attempt.status === 'running'
    )
  ) {
    return null;
  }
  const spec = resolveSpecEvidence(issue).evidence;
  if (spec === 'published') {
    return 'entry_needed';
  }
  if (
    workerLabels(issue.labels).includes('spec-after-blocker') &&
    ready !== true
  ) {
    return null;
  }
  return 'spec_needed';
}

/**
 * Live projections are derived from observed issue rows and dependency proofs;
 * absence of a row or its owner yields no badge or button.
 *
 * @param {{ workspace: string, roots: string[], snapshot: (root: string) => any, issue: (root: string, id: string) => any, ready: (root: string, id: string) => boolean|null, owner: (workspace: string, blocker: any) => string|null }} input
 * @returns {Record<string, any[]>}
 */
export function projectSpecAuthoring(input) {
  /** @type {Record<string, any[]>} */
  const out = {};
  for (const root of new Set([input.workspace, ...input.roots])) {
    const queue = input.snapshot(root);
    for (const evidence of specAuthoringEvidence(root, queue)) {
      for (const blocker of evidence.blockers) {
        const owner = input.owner(root, blocker);
        if (!owner) {
          continue;
        }
        const target_queue = input.snapshot(owner);
        const state = specAuthoringState({
          issue: input.issue(owner, blocker.id),
          queue: target_queue,
          ready: input.ready(owner, blocker.id),
          root: owner,
          blocks: true
        });
        if (!state) {
          continue;
        }
        const target = {
          bead_id: blocker.id,
          root_dir: owner,
          state,
          expected_revision: target_queue.revision,
          interactive_sessions: Object.values(
            target_queue.interactive_sessions || {}
          ).filter((session) => session.bead_id === blocker.id)
        };
        const add = (/** @type {string} */ id) => {
          const entries = (out[id] ||= []);
          if (
            !entries.some(
              (entry) =>
                entry.bead_id === target.bead_id && entry.root_dir === owner
            )
          ) {
            entries.push(target);
          }
        };
        if (owner === input.workspace) {
          add(blocker.id);
        }
        if (root === input.workspace) {
          add(evidence.bead_id);
        }
      }
    }
  }
  return out;
}

/**
 * @param {string} root
 * @param {string} bead_id
 * @returns {Promise<any>}
 */
export async function readSpecAuthoringIssue(root, bead_id) {
  const result = await runBdJsonProjected('show', ['show', bead_id, '--json'], {
    cwd: root,
    expected_id: bead_id
  });
  return result.ok ? result.data : null;
}

/**
 * @param {string} root
 * @param {string} bead_id
 * @returns {Promise<boolean|null>}
 */
export async function readSpecAuthoringReady(root, bead_id) {
  const result = await runBdJsonProjected(
    'ready',
    ['ready', '--limit', '1000', '--json'],
    { cwd: root }
  );
  return result.ok && Array.isArray(result.data)
    ? result.data.some((row) => row.id === bead_id)
    : null;
}

/**
 * Fresh sessions never acquire an attempt or change an original's queue state.
 * The durable reservation is written before the first launch or notification.
 *
 * @param {{
 *   store: Pick<ReturnType<typeof import('./queue-store.js').createQueueStore>, 'snapshot'|'claimSpecAuthoring'|'finishSpecAuthoring'|'recordInteractiveSession'|'recordConversationRefusal'>,
 *   launcher?: Pick<ReturnType<typeof createTmuxLauncher>, 'launch'|'listPanes'>,
 *   notifier?: Pick<ReturnType<typeof createNotifier>, 'conversationConfirm'>,
 *   readIssue?: typeof readSpecAuthoringIssue, readReady?: typeof readSpecAuthoringReady,
 *   resolveForeign?: typeof queryForeignBlockerStatus,
 *   listRoots?: () => string[], getConfig?: () => any,
 *   autoLaunchEnabled?: (config_enabled: boolean) => boolean,
 *   currentRunner?: (root: string, issue: any) => string|null,
 *   resolveSessionAccounts?: import('./session-launch-accounts.js').ResolveSessionAccounts,
 *   conversationSettings?: typeof getConversationSettings,
 *   existsSync?: (file: string) => boolean, now?: () => number
 * }} deps
 */
export function createSpecAuthoring(deps) {
  const launcher = deps.launcher || createTmuxLauncher();
  const notifier = deps.notifier || createNotifier({ getConfig });
  const issueOf = deps.readIssue || readSpecAuthoringIssue;
  const readyOf = deps.readReady || readSpecAuthoringReady;
  const foreignOf = deps.resolveForeign || queryForeignBlockerStatus;
  const now = deps.now || Date.now;

  /** @param {string} workspace */
  function evidenceOf(workspace) {
    return [
      ...new Set([workspace, ...(deps.listRoots || specAuthoringRoots)()])
    ].flatMap((root) => specAuthoringEvidence(root, deps.store.snapshot(root)));
  }

  /**
   * @param {SpecEvidence} evidence
   * @param {any} blocker
   * @returns {Promise<string|null>}
   */
  async function ownerOf(evidence, blocker) {
    if (!blocker.rig) {
      return evidence.workspace;
    }
    const resolved = await foreignOf(blocker.id, evidence.workspace);
    return resolved.ok ? resolved.owner_root : null;
  }

  /**
   * @param {string} root
   * @param {string} bead_id
   */
  async function targetOf(root, bead_id) {
    /** @type {SpecEvidence[]} */
    const originals = [];
    for (const evidence of evidenceOf(root)) {
      for (const blocker of evidence.blockers.filter(
        (entry) => entry.id === bead_id
      )) {
        if ((await ownerOf(evidence, blocker)) === root) {
          originals.push(evidence);
          break;
        }
      }
    }
    if (originals.length === 0) {
      return null;
    }
    const issue = await issueOf(root, bead_id);
    if (issue?.id !== bead_id) {
      return null;
    }
    const ready = workerLabels(issue?.labels).includes('spec-after-blocker')
      ? await readyOf(root, bead_id)
      : null;
    const state = specAuthoringState({
      issue,
      queue: deps.store.snapshot(root),
      ready,
      root,
      blocks: true
    });
    return state ? { issue, state, originals } : null;
  }

  /** @param {string} reason */
  function refused(reason) {
    return { launched: false, session: 'not_launched', reason };
  }

  /**
   * @param {string} root
   * @param {string} bead_id
   */
  async function conversationGate(root, bead_id) {
    const live = Object.values(
      deps.store.snapshot(root).interactive_sessions || {}
    ).some(
      (record) => record.bead_id === bead_id && record.settled_at === null
    );
    if (live) {
      return refused('live_conversation');
    }
    const panes = await launcher.listPanes(SPEC_AUTHORING_PANE_MARKER);
    if (!panes.ok) {
      return refused('tmux_unavailable');
    }
    if (panes.rows.some((pane) => pane.key === bead_id && pane.dead === '0')) {
      return refused('live_conversation');
    }
    return null;
  }

  /**
   * @param {string} root
   * @param {string} bead_id
   * @param {NonNullable<Awaited<ReturnType<typeof targetOf>>>} target
   * @param {boolean} automatic
   */
  async function launch(root, bead_id, target, automatic) {
    const inherited = deps.currentRunner?.(root, target.issue);
    const runner = freshConversationRuntime(
      (deps.conversationSettings || getConversationSettings)(),
      inherited === 'codex' ? 'codex' : 'claude'
    );
    const accounts = await resolveSessionLaunchOptions(
      deps.resolveSessionAccounts,
      root,
      bead_id,
      runner
    );
    /** @type {string[]} */
    const prerequisites = [];
    /** @type {string[]} */
    const worktrees = [];
    for (const original of target.originals) {
      const issue = await issueOf(original.workspace, original.bead_id);
      const lines =
        typeof issue?.notes === 'string'
          ? issue.notes
              .split('\n')
              .filter((/** @type {string} */ line) =>
                line.trim().startsWith('prerequisite:')
              )
          : [];
      prerequisites.push(
        `${original.bead_id}: ${lines.join('\n') || '(없음)'}`
      );
      const repo = original.attempt?.repo;
      const worktree = repo
        ? path.join(repo, '.worktrees', original.bead_id)
        : null;
      worktrees.push(
        `${original.bead_id}: ${worktree && (deps.existsSync || fs.existsSync)(worktree) ? worktree : '(없음)'}`
      );
    }
    const block = fillSpecAuthoringEntry({
      bead_id,
      originals: target.originals.map((entry) => entry.bead_id).join(', '),
      prerequisites: prerequisites.join('\n'),
      attempts: target.originals
        .map(
          (entry) =>
            `${entry.bead_id}: ${entry.attempt?.attempt_id || '(없음)'}`
        )
        .join('\n'),
      worktrees: worktrees.join('\n')
    });
    const session_id = runner === 'claude' ? randomUUID() : null;
    const tmux_session =
      (deps.getConfig || getConfig)()?.worker_direction_inquiry?.tmux_session ||
      DEFAULT_INQUIRY_TMUX_SESSION;
    const outcome = await launcher.launch({
      ...accounts,
      marker: SPEC_AUTHORING_PANE_MARKER,
      key: bead_id,
      tmux_session,
      window_name: bead_id,
      cwd: root,
      runner,
      placement: automatic ? 'inquiry' : 'user',
      commandArgs: session_id ? ['--session-id', session_id, block] : [block]
    });
    if (outcome.session === 'launched') {
      const at = now();
      deps.store.recordInteractiveSession(root, {
        bead_id,
        kind: 'spec_authoring',
        provider: runner,
        session_id,
        session_id_source: session_id ? 'launch' : null,
        mode: 'fresh',
        source: 'fresh',
        forked_from: null,
        fallback_reason: null,
        attempt_id: null,
        failure_class: null,
        tmux_session: outcome.tmux_session,
        tmux_window: outcome.tmux_window,
        pane_id: outcome.pane_id,
        cwd: root,
        launched_at: at,
        last_seen_alive_at: at,
        settled_at: null,
        settled_by: null,
        state: 'live',
        exit_requested_at: null,
        defer_since: null,
        conversation: null
      });
      emitQueueChanged(root);
      for (const original of target.originals) {
        if (original.workspace !== root) {
          emitQueueChanged(original.workspace);
        }
      }
    }
    return {
      ...outcome,
      launched: outcome.session === 'launched',
      mode: 'fresh',
      runner,
      session_id
    };
  }

  return {
    /**
     * Observe after either durable prerequisite proof. A failed lookup consumes
     * nothing; a failed launch consumes the one automatic opening for this B.
     *
     * @param {{ workspace: string, blockers: any[] }} input
     */
    async observe(input) {
      for (const blocker of input.blockers) {
        try {
          const root = await ownerOf(
            {
              workspace: input.workspace,
              bead_id: '',
              blockers: [],
              attempt: null
            },
            blocker
          );
          if (
            !root ||
            Object.hasOwn(
              deps.store.snapshot(root).spec_authoring_launches,
              blocker.id
            )
          ) {
            continue;
          }
          const key = `${root}\0${blocker.id}`;
          if (in_flight.has(key)) {
            continue;
          }
          in_flight.add(key);
          try {
            const target = await targetOf(root, blocker.id);
            if (!target || target.state !== 'spec_needed') {
              continue;
            }
            /** @type {Awaited<ReturnType<typeof conversationGate>>} */
            let gate;
            try {
              gate = await conversationGate(root, blocker.id);
            } catch {
              gate = refused('error');
            }
            if (gate?.reason === 'live_conversation') {
              continue;
            }
            if (!deps.store.claimSpecAuthoring(root, blocker.id).ok) {
              continue;
            }
            let outcome;
            try {
              const enabled = (
                deps.autoLaunchEnabled || conversationAutoLaunchEnabled
              )(
                (deps.getConfig || getConfig)()?.worker_direction_inquiry
                  ?.enabled === true
              );
              outcome = enabled
                ? (gate ?? (await launch(root, blocker.id, target, true)))
                : refused('disabled');
            } catch {
              outcome = refused('error');
            }
            deps.store.finishSpecAuthoring(root, blocker.id, {
              session: outcome.session,
              reason: 'reason' in outcome ? outcome.reason : null
            });
            if (
              outcome.session === 'not_launched' &&
              outcome.reason !== 'disabled'
            ) {
              deps.store.recordConversationRefusal(root, blocker.id, {
                kind: 'spec_authoring',
                reason: outcome.reason || 'error'
              });
            }
            await notifier.conversationConfirm({
              bead_id: blocker.id,
              repo: root,
              ...outcome,
              spec_authoring: {
                originals: target.originals.map((entry) => entry.bead_id)
              }
            });
          } finally {
            in_flight.delete(key);
          }
        } catch {
          // Settlement and dispatch must survive unavailable rigs and tmux.
        }
      }
    },

    /**
     * Explicit clicks rejudge both states and bypass the automatic once record.
     *
     * @param {{ workspace: string, bead_id: string }} input
     */
    async launchForClick(input) {
      const key = `${input.workspace}\0${input.bead_id}`;
      if (in_flight.has(key)) {
        return refused('launch_in_flight');
      }
      in_flight.add(key);
      try {
        const target = await targetOf(input.workspace, input.bead_id);
        if (!target) {
          return refused('not_target');
        }
        const gate = await conversationGate(input.workspace, input.bead_id);
        return (
          gate ?? (await launch(input.workspace, input.bead_id, target, false))
        );
      } catch {
        return refused('error');
      } finally {
        in_flight.delete(key);
      }
    }
  };
}
