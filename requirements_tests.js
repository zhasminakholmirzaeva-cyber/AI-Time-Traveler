'use strict';
const assert=require('node:assert/strict');
const game=require('./game.js');
const valid={budget:100,energy:50,happiness:60};
assert.deepEqual(game.validateInitialState(valid),valid);
for(const key of Object.keys(valid)){
 for(const bad of [-1,101,1.5,NaN,Infinity,'50',undefined]){
  assert.throws(()=>game.validateInitialState({...valid,[key]:bad}),RangeError);
 }
}
assert.equal(game.PUZZLES.length,9);
assert.equal(game.ACTIONS.length,9);
for(const choices of game.ACTIONS){
 assert.equal(choices.length,3);
 for(const a of choices){assert.ok(a.p.every(p=>p>=0&&p<=1));assert.ok(Math.abs(a.p.reduce((x,y)=>x+y,0)-1)<1e-8);}
}
console.log('Requirements checks passed: validation, 9 puzzles, 27 actions, probabilities.');
