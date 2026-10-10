import { expect, test } from 'vitest';
import {
  FAILURE_NEXT_ACTIONS,
  RECOVERY_WAIT_SENTENCES
} from './failure-sentences.js';

test('keeps the shared recovery release sentences immutable', () => {
  expect(Object.isFrozen(RECOVERY_WAIT_SENTENCES)).toBe(true);
});

test('keeps the session decision in the recovery release sentence', () => {
  expect(RECOVERY_WAIT_SENTENCES.unclassified).toContain('세션에서');
});

test('directs script_failed recovery to a successful manual deployment', () => {
  const guidance = FAILURE_NEXT_ACTIONS.script_failed;

  expect(guidance).toMatch(/자동 재시도.*이미/);
  expect(guidance).toMatch(/원인.*Worker 설정의 \[배포 실행\].*base tip.*성공/);
});
