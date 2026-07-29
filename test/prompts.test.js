import assert from 'node:assert/strict';
import test from 'node:test';
import { getCategories, getPrompt, prompts } from '../src/prompts.js';

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
