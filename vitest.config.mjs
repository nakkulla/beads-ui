import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'node',
          setupFiles: ['test/setup-node.js'],
          include: ['**/*.test.js'],
          exclude: ['app/**/*.test.js', 'node_modules/**', '.worktrees/**'],
          environment: 'node',
          restoreMocks: true
        }
      },
      {
        test: {
          name: 'jsdom',
          setupFiles: ['test/setup-vitest.js'],
          include: ['app/**/*.test.js'],
          exclude: ['node_modules/**', '.worktrees/**'],
          environment: 'jsdom',
          restoreMocks: true
        }
      }
    ]
  }
});
