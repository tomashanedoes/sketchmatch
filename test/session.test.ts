import assert from 'node:assert/strict';
import test from 'node:test';
import { getCategories, getPrompt, prompts } from '../src/data/prompts/prompts';
import {
  completePrompt,
  createSessionStats,
  isTimerFinished,
  remainingTimerSeconds,
  skipPrompt,
} from '../src/features/game/session';

test('returns categories for each intended audience', () => {
  assert.deepEqual(getCategories('children').sort(), ['dieren', 'lucht', 'natuur']);
  assert.deepEqual(getCategories('adults').sort(), ['landschap', 'natuur', 'thuis']);
});

test('never returns an excluded prompt while alternatives exist', () => {
  const children = prompts.filter((prompt) => prompt.audience === 'children');
  const selected = getPrompt('children', [children[0].id]);

  assert.notEqual(selected.id, children[0].id);
  assert.equal(selected.audience, 'children');
});

test('filters prompts by selected categories', () => {
  const selected = getPrompt('adults', [], ['landschap']);

  assert.equal(selected.category, 'landschap');
  assert.equal(selected.audience, 'adults');
});

test('tracks completed and skipped prompts without treating them as a score', () => {
  const started = createSessionStats();
  const afterDone = completePrompt(started);
  const afterSkip = skipPrompt(afterDone);

  assert.equal(afterDone.completed, 1);
  assert.equal(afterSkip.skipped, 1);
  assert.equal(afterSkip.completed, 1);
});

test('soft timer ends when the session duration elapses', () => {
  const stats = createSessionStats(1);
  assert.equal(isTimerFinished(stats, stats.startedAt + 30_000), false);
  assert.equal(remainingTimerSeconds(stats, stats.startedAt + 30_000), 30);
  assert.equal(isTimerFinished(stats, stats.startedAt + 60_000), true);
  assert.equal(remainingTimerSeconds(stats, stats.startedAt + 60_000), 0);
});
