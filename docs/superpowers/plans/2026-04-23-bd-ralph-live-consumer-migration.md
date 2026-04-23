# bd-ralph Live Consumer Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** `beads-ui`의 live consumer surface를 canonical `bd-ralph` command
기준으로 맞춘다.

**Architecture:** Worker UI/app entrypoint, worker job API validation, process
runner exec target이 모두 같은 command literal을 사용하도록 정렬한다. Historical
artifact는 유지하고 live source/test/build만 갱신한다.

**Tech Stack:** Node.js, Express, lit-html, Vitest, esbuild

---

### Task 1: Canonical command source update

**Files:**

- Modify: `app/main.js`
- Modify: `app/views/worker-parent-row.js`
- Modify: `app/views/worker-detail.js`
- Modify: `server/routes/worker-jobs.js`
- Modify: `server/worker/process-runner.js`

- [ ] Replace the live `bd-ralph-v2` command literal with `bd-ralph` in the
      Worker UI, enqueue path, route validation, and process runner exec target.
- [ ] Keep `pr-review` behavior unchanged.

### Task 2: Regression test update

**Files:**

- Modify: `server/routes/worker-jobs.test.js`
- Modify: `server/worker/process-runner.test.js`
- Modify: `server/worker/jobs.test.js`
- Modify: `server/worker/job-store.test.js`
- Modify: `server/worker/supervisor.test.js`
- Modify: `server/worker/supervisor.integration.test.js`
- Modify: `app/views/worker-detail.test.js`

- [ ] Update canonical worker job fixtures and expectations from `bd-ralph-v2`
      to `bd-ralph` where they represent newly enqueued live jobs.
- [ ] Preserve test intent; do not broaden scope beyond command
      canonicalization.

### Task 3: Bundle regeneration and full verification

**Files:**

- Modify: `app/main.bundle.js`
- Modify: `app/main.bundle.js.map`

- [ ] Run `npm run build` to regenerate frontend bundle artifacts from updated
      sources.
- [ ] Run `npm run tsc`, `npm test`, `npm run lint`, and
      `npm run prettier:write`.
- [ ] Confirm no remaining live-source `bd-ralph-v2` references outside
      intentional historical artifacts.
