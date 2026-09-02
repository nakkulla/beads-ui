import { beforeEach, expect, test, vi } from 'vitest';
import {
  __resetWorkspaceActivityForTest,
  onWorkspaceActivity,
  publishWorkspaceActivity
} from './workspace-activity.js';

beforeEach(() => {
  __resetWorkspaceActivityForTest();
});

test('calls registered listeners on publish', () => {
  const listener = vi.fn();
  onWorkspaceActivity(listener);

  publishWorkspaceActivity('/workspace/a');

  expect(listener).toHaveBeenCalledWith('/workspace/a');
});

test('stops calling a listener after unsubscribe', () => {
  const listener = vi.fn();
  const unsubscribe = onWorkspaceActivity(listener);

  unsubscribe();
  publishWorkspaceActivity('/workspace/a');

  expect(listener).not.toHaveBeenCalled();
});

test('continues after a listener throws', () => {
  const next_listener = vi.fn();
  onWorkspaceActivity(() => {
    throw new Error('listener failed');
  });
  onWorkspaceActivity(next_listener);

  publishWorkspaceActivity('/workspace/a');

  expect(next_listener).toHaveBeenCalledWith('/workspace/a');
});
