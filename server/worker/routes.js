/**
 * Workflow route vocabulary shared by worker admission and display consumers.
 * This module stays import-free so browser bundles can consume the enum.
 *
 * @type {ReadonlyArray<'spec_backed'|'full_plan'|'quick_fix'>}
 */
export const WORKFLOW_ROUTES = Object.freeze([
  'spec_backed',
  'full_plan',
  'quick_fix'
]);
