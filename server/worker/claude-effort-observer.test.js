import { describe, expect, test, vi } from 'vitest';
import {
  claudeSessionFilePath,
  claudeSubagentFilePath,
  findClaudeSessionFile,
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

describe('findClaudeSessionFile', () => {
  test('returns the first project directory holding the session file', () => {
    const readdirSync = vi.fn(() => ['-repo-a', '-repo-b', '-repo-c']);
    const statSync = vi.fn((/** @type {string} */ file) => {
      if (file !== '/home/test/.claude/projects/-repo-b/session-1.jsonl') {
        throw new Error('ENOENT');
      }
      return { mtimeMs: 10 };
    });

    const result = findClaudeSessionFile('session-1', {
      home_dir: '/home/test',
      fs: /** @type {any} */ ({ readdirSync, statSync })
    });

    expect(result).toBe('/home/test/.claude/projects/-repo-b/session-1.jsonl');
    expect(readdirSync).toHaveBeenCalledWith('/home/test/.claude/projects');
  });

  test('returns null when no project directory holds the session file', () => {
    const readdirSync = vi.fn(() => ['-repo-a', '-repo-b']);
    const statSync = vi.fn(() => {
      throw new Error('ENOENT');
    });

    const result = findClaudeSessionFile('missing', {
      home_dir: '/home/test',
      fs: /** @type {any} */ ({ readdirSync, statSync })
    });

    expect(result).toBe(null);
    expect(statSync).toHaveBeenCalledTimes(2);
  });

  test('returns null when the projects directory cannot be listed', () => {
    const readdirSync = vi.fn(() => {
      throw new Error('EACCES');
    });
    const statSync = vi.fn();

    const result = findClaudeSessionFile('session-1', {
      home_dir: '/home/test',
      fs: /** @type {any} */ ({ readdirSync, statSync })
    });

    expect(result).toBe(null);
    expect(statSync).not.toHaveBeenCalled();
  });

  test('returns null for an empty session id', () => {
    const readdirSync = vi.fn(() => ['-repo-a']);

    const result = findClaudeSessionFile('', {
      home_dir: '/home/test',
      fs: /** @type {any} */ ({ readdirSync, statSync: vi.fn() })
    });

    expect(result).toBe(null);
    expect(readdirSync).not.toHaveBeenCalled();
  });
});
