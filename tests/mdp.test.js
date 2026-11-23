
const test = require('node:test');
const assert = require('node:assert/strict');
const { ACTIONS, transition, reward, sampleOutcome, hazard } = require('../game.js');

const start = {budget:100,energy:50,happiness:60};
const action = ACTIONS[0][0];

test('three deterministic MDP transitions', () => {
  const expected = [
    {budget:90,energy:64,happiness:66},
    {budget:90,energy:57,happiness:63},
    {budget:90,energy:44,happiness:53}
  ];
  expected.forEach((s,i) => assert.deepEqual(transition(start,action,i),s));
});

test('probabilities sum to 100%', () => {
  assert.ok(Math.abs(action.p.reduce((a,b)=>a+b,0)-1)<1e-12);
  assert.deepEqual(action.p.map(p=>Number((p*100).toFixed(2))),[55,29.25,15.75]);
});

test('sampleOutcome boundaries', () => {
  assert.equal(sampleOutcome(action,0),0);
  assert.equal(sampleOutcome(action,0.549999),0);
  assert.equal(sampleOutcome(action,0.55),1);
  assert.equal(sampleOutcome(action,0.842499),1);
  assert.equal(sampleOutcome(action,0.8425),2);
  assert.equal(sampleOutcome(action,0.999),2);
});

test('reward matches weighted state change', () => {
  assert.ok(Math.abs(reward(start,transition(start,action,0))-8.8)<1e-12);
  assert.ok(Math.abs(reward(start,transition(start,action,1))-3.9)<1e-12);
  assert.ok(Math.abs(reward(start,transition(start,action,2))+6.75)<1e-12);
});

test('hazard is independent of basic transition', () => {
  const after = transition(start,action,0);
  assert.deepEqual(hazard(after,0,0.5).state,after);
  assert.deepEqual(hazard(after,0,0.1).state,{budget:90,energy:59,happiness:63});
});
