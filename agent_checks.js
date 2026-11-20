'use strict';

const assert = require('node:assert/strict');
const { ACTIONS, agentPolicy } = require('./game.js');

const actions = ACTIONS[0];
const cases = [
  { name: 'Ресурс 65-тен төмен', state: { budget: 100, energy: 64, happiness: 59 }, priority: 'energy', action: 'a0_1' },
  { name: 'Қанағаттану 60-тан төмен', state: { budget: 100, energy: 65, happiness: 59 }, priority: 'happiness', action: 'a0_1' },
  { name: 'Бюджетті үнемдеу', state: { budget: 20, energy: 65, happiness: 60 }, priority: 'budget', action: 'a0_0' },
  { name: 'Бюджет әрекет құнына тең', state: { budget: 10, energy: 65, happiness: 60 }, priority: 'budget', action: 'a0_0' },
  { name: 'Бюджет ешбір әрекетке жетпейді', state: { budget: 9, energy: 65, happiness: 60 }, priority: 'budget', action: null }
];

for (const { name, state, priority, action } of cases) {
  const result = agentPolicy(state, actions);
  assert.equal(result.priority, priority, name);
  assert.equal(result.action?.id ?? null, action, name);
  console.log('PASS:', name);
}
