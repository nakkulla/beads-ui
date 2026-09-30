import js from '@eslint/js';
import plugin_jsdoc from 'eslint-plugin-jsdoc';
import plugin_n from 'eslint-plugin-n';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      'node_modules',
      'coverage',
      'dist',
      '.beads',
      '.worktrees/**',
      'app/main.bundle.js',
      'app/main.bundle.js.map'
    ]
  },
  js.configs.recommended,
  plugin_jsdoc.configs['flat/contents-typescript-flavor-error'],
  {
    settings: {
      jsdoc: {
        mode: 'typescript',
        preferredTypes: {
          object: 'Object'
        }
      }
    },
    rules: {
      'jsdoc/check-line-alignment': 'warn',
      'jsdoc/tag-lines': ['warn', 'never', { startLines: 1 }],
      'jsdoc/text-escaping': 'off',
      'jsdoc/require-hyphen-before-param-description': 'warn'
    }
  },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: globals.vitest
    }
  },
  {
    files: ['server/**/*.js'],
    ...plugin_n.configs['flat/recommended'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'n/no-unpublished-import': 'off'
    }
  },
  {
    files: ['bin/**/*.js'],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    files: ['app/**/*.js'],
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    // UI-dbn6: every mounted root renders through app/ui/render.js so
    // window.__bdui.render_count sees it; the old views keep their own
    // render until they are deleted, and tests render detached fixtures.
    files: ['app/**/*.js'],
    ignores: ['app/ui/render.js', 'app/views/**', '**/*.test.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lit-html',
              importNames: ['render'],
              message: 'Render through app/ui/render.js (render_count).'
            }
          ]
        }
      ]
    }
  }
]);
