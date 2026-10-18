import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  ADOPT_CONFIDENCE,
  JEV_ENDPOINT,
  JEV_MODEL,
  JEV_TIMEOUT_MS
} from './question.js';

/**
 * Compare the server's jev constants with the installed dotfiles checkout
 * (ADR UI-u6ud-2): model and endpoint belong to shell.lib.decision; timeout
 * and provider-specific thresholds belong to the workflow judge policy.
 * Skip only when the workflow policy is absent. Its .yaml contents are JSON.
 */
const POLICY_FILE =
  process.env.JUDGE_QUESTIONS_FILE ||
  path.join(
    os.homedir(),
    '.claude',
    'skills',
    'workflow',
    'resources',
    'judge-questions.yaml'
  );

const describeCrossRuntime = fs.existsSync(POLICY_FILE)
  ? describe
  : describe.skip;

describeCrossRuntime(
  'dotfiles decision provider and judge policy parity',
  () => {
    /** @type {Record<string, any>} */
    const policy = fs.existsSync(POLICY_FILE)
      ? JSON.parse(fs.readFileSync(POLICY_FILE, 'utf8')).policy
      : {};
    /** @type {{ model: string, endpoint: string } | Record<string, never>} */
    const provider = fs.existsSync(POLICY_FILE)
      ? JSON.parse(
          execFileSync(
            'python3',
            [
              '-B',
              '-c',
              [
                'import json, pathlib, sys',
                // Resolve the same checkout as the installed workflow judge.
                'sys.path.insert(0, str(pathlib.Path(sys.argv[1]).resolve().parents[5]))',
                'from shell.lib.decision import provider_spec',
                'spec = provider_spec("jev")',
                'print(json.dumps({key: spec[key] for key in ("model", "endpoint")}))'
              ].join('\n'),
              POLICY_FILE
            ],
            { encoding: 'utf8', timeout: 5_000 }
          )
        )
      : {};

    test('uses the jev decision provider model', () => {
      const model = provider.model;

      expect(JEV_MODEL).toBe(model);
    });

    test('uses the jev decision provider endpoint', () => {
      const endpoint = provider.endpoint;

      expect(JEV_ENDPOINT).toBe(endpoint);
    });

    test('uses the workflow judge time limit', () => {
      const timeout_ms = policy.timeout_s * 1000;

      expect(JEV_TIMEOUT_MS).toBe(timeout_ms);
    });

    test('adopts at the jev bind authority threshold', () => {
      const threshold = policy.providers.jev.thresholds.bind_authoritative;

      expect(ADOPT_CONFIDENCE).toBe(threshold);
    });
  }
);
