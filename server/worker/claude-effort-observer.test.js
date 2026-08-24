import { describe, expect, test, vi } from 'vitest';
import {
  claudeSessionFilePath,
  claudeSubagentFilePath,
  observeClaudeEffort,
  observeClaudeSubagentEffort
} from './claude-effort-observer.js';

describe('Claude effort observer', () => {
  test('derives the munged project session path', () => {
    const result = claudeSessionFilePath(
      '/Users/test/beads_ui/.worktrees/UI-3nf9',
      'session-1',
      { home_dir: '/home/test' }
    );

    expect(result).toBe(
      '/home/test/.claude/projects/-Users-test-beads-ui--worktrees-UI-3nf9/session-1.jsonl'
    );
  });

  test('returns the first assistant effort after malformed lines', () => {
    const readFileSync = vi.fn(() =>
      [
        '{bad json}',
        JSON.stringify({ type: 'user', effort: 'low' }),
        JSON.stringify({ type: 'assistant', effort: '' }),
        JSON.stringify({ type: 'assistant', effort: 'high' }),
        JSON.stringify({ type: 'assistant', effort: 'low' })
      ].join('\n')
    );

    const result = observeClaudeEffort({
      cwd: '/repo/worktree',
      session_id: 'session-1',
      fs: /** @type {any} */ ({ readFileSync }),
      home_dir: '/home/test'
    });

    expect(result).toBe('high');
    expect(readFileSync).toHaveBeenCalledWith(
      '/home/test/.claude/projects/-repo-worktree/session-1.jsonl',
      'utf8'
    );
  });

  test('returns null when the session file is unavailable', () => {
    const readFileSync = vi.fn(() => {
      throw new Error('ENOENT');
    });

    const result = observeClaudeEffort({
      cwd: '/repo/worktree',
      session_id: 'missing',
      fs: /** @type {any} */ ({ readFileSync })
    });

    expect(result).toBe(null);
  });

  test('derives the subagent path under the session directory', () => {
    const result = claudeSubagentFilePath(
      '/Users/test/beads_ui/.worktrees/UI-3nf9',
      'session-1',
      'agt_9f3c21d4c0',
      { home_dir: '/home/test' }
    );

    expect(result).toBe(
      '/home/test/.claude/projects/-Users-test-beads-ui--worktrees-UI-3nf9/session-1/subagents/agent-agt_9f3c21d4c0.jsonl'
    );
  });

  test('reads a subagent effort from its own file', () => {
    const readFileSync = vi.fn(() =>
      [
        JSON.stringify({ type: 'user', agentId: 'agt_9f3c21d4c0' }),
        JSON.stringify({ type: 'assistant', effort: 'low' })
      ].join('\n')
    );

    const result = observeClaudeSubagentEffort({
      cwd: '/repo/worktree',
      session_id: 'session-1',
      agent_id: 'agt_9f3c21d4c0',
      fs: /** @type {any} */ ({ readFileSync }),
      home_dir: '/home/test'
    });

    expect(result).toBe('low');
    expect(readFileSync).toHaveBeenCalledWith(
      '/home/test/.claude/projects/-repo-worktree/session-1/subagents/agent-agt_9f3c21d4c0.jsonl',
      'utf8'
    );
  });

  test('returns null for a subagent with no agent id', () => {
    const readFileSync = vi.fn(() => '');

    const result = observeClaudeSubagentEffort({
      cwd: '/repo/worktree',
      session_id: 'session-1',
      agent_id: '',
      fs: /** @type {any} */ ({ readFileSync })
    });

    expect(result).toBe(null);
    expect(readFileSync).not.toHaveBeenCalled();
  });
});
