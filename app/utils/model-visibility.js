/**
 * Selector-side model visibility filter (UI-ooc0 §4.1).
 *
 * Applied only where a view builds the choices a person picks from. The
 * compatibility and resolution helpers (`implModelOptions`, `narrowImplTarget`,
 * `resolveExecutionSettings`, `deriveModelRuntime`) never see it, so a disabled
 * model stays fully recognised everywhere else.
 */

/**
 * Drop disabled model names from a choice list. `auto` is never dropped, and a
 * `null` list (no snapshot yet) returns the choices unchanged.
 *
 * @param {ReadonlyArray<string>} choices
 * @param {ReadonlyArray<string>|null} disabled_models
 * @returns {string[]}
 */
export function visibleModelChoices(choices, disabled_models) {
  if (!disabled_models) {
    return [...choices];
  }
  return choices.filter(
    (choice) => choice === 'auto' || !disabled_models.includes(choice)
  );
}

/**
 * Drop reviewer tokens whose pinned `review.reviewers[token].model` alias is
 * disabled. A token without a pinned entry (`self`, `skip`) or with no
 * readable table stays (fail-quiet).
 *
 * @param {ReadonlyArray<string>} tokens
 * @param {Record<string, any>|null|undefined} reviewers
 * @param {ReadonlyArray<string>|null} disabled_models
 * @returns {string[]}
 */
export function visibleReviewerChoices(tokens, reviewers, disabled_models) {
  if (!disabled_models || !reviewers || typeof reviewers !== 'object') {
    return [...tokens];
  }
  return tokens.filter((token) => {
    const alias = Object.hasOwn(reviewers, token)
      ? reviewers[token]?.model
      : null;
    return typeof alias !== 'string' || !disabled_models.includes(alias);
  });
}

/**
 * The choices a filter removed — the `hidden_choices` input of
 * `buildOptionView`, so a stored value among them reads `(비활성)`.
 *
 * @param {ReadonlyArray<string>} all_choices
 * @param {ReadonlyArray<string>} visible_choices
 * @returns {string[]}
 */
export function hiddenChoices(all_choices, visible_choices) {
  return all_choices.filter((choice) => !visible_choices.includes(choice));
}

/**
 * Filter one execution-setting select's choices by its key: a `*_review_model`
 * key takes the reviewer-token rule, any other `*_model` key the model-name
 * rule, and every other key passes through. `execution_defaults` is the queue
 * projection whose `session.review.reviewers` resolves reviewer tokens.
 *
 * @param {string} key
 * @param {ReadonlyArray<string>} choices
 * @param {ReadonlyArray<string>|null} disabled_models
 * @param {Record<string, any>|null|undefined} execution_defaults
 * @returns {{ choices: string[], hidden_choices: string[] }}
 */
export function visibleChoicesForKey(
  key,
  choices,
  disabled_models,
  execution_defaults
) {
  /** @type {string[]} */
  let visible = [...choices];
  if (key.endsWith('_review_model')) {
    visible = visibleReviewerChoices(
      choices,
      execution_defaults?.session?.review?.reviewers,
      disabled_models
    );
  } else if (key.endsWith('_model')) {
    visible = visibleModelChoices(choices, disabled_models);
  }
  return { choices: visible, hidden_choices: hiddenChoices(choices, visible) };
}

/**
 * The disabled list of a model-visibility store, or `null` before its first
 * snapshot (and when no store is wired) so nothing is filtered.
 *
 * @param {{ get: () => any }|null|undefined} store
 * @returns {string[]|null}
 */
export function disabledModelsOf(store) {
  const state = store ? store.get() : null;
  return state && Array.isArray(state.disabled_models)
    ? state.disabled_models
    : null;
}
