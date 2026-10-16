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
 * 설치된 workflow 스킬의 jev policy와 서버 상수를 비교한다 (ADR UI-u6ud-2).
 * dotfiles checkout이 없는 자리에서는 건너뛴다. 파일 이름은 `.yaml`이지만 내용은
 * JSON이라 `JSON.parse`로 읽는다.
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

describeCrossRuntime('dotfiles judge-questions policy parity', () => {
  /** @type {Record<string, any>} */
  const policy = fs.existsSync(POLICY_FILE)
    ? JSON.parse(fs.readFileSync(POLICY_FILE, 'utf8')).policy
    : {};

  test('uses the workflow judge model', () => {
    const model = policy.model;

    expect(JEV_MODEL).toBe(model);
  });

  test('uses the workflow judge endpoint', () => {
    const endpoint = policy.endpoint;

    expect(JEV_ENDPOINT).toBe(endpoint);
  });

  test('uses the workflow judge time limit', () => {
    const timeout_ms = policy.timeout_s * 1000;

    expect(JEV_TIMEOUT_MS).toBe(timeout_ms);
  });

  test('adopts at the bind authority threshold', () => {
    const threshold = policy.thresholds.bind_authoritative;

    expect(ADOPT_CONFIDENCE).toBe(threshold);
  });
});
