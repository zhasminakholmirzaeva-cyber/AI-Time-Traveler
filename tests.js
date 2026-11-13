const assert=require('node:assert/strict');
const g=require('./game.js');
assert.equal(g.PUZZLES.length,9);
assert.equal(g.ACTIONS.length,9);
for(let i=0;i<9;i++){
 assert.equal(g.ACTIONS[i].length,3);
 assert(g.puzzleCheck(g.PUZZLES[i],g.PUZZLES[i].correct));
 for(let j=0;j<g.PUZZLES[i].options.length;j++)if(j!==g.PUZZLES[i].correct)assert(!g.puzzleCheck(g.PUZZLES[i],j));
 for(const a of g.ACTIONS[i])assert(Math.abs(a.p.reduce((x,y)=>x+y,0)-1)<1e-9);
}
const s={budget:80,energy:45,happiness:55};
const a=g.ACTIONS[0][0];
assert.equal(g.transition(s,a,0).budget,70);
assert(Number.isFinite(g.expectedUtility(s,a)));
assert.equal(g.rankActions(s,g.ACTIONS[0]).length,3);
assert(g.agentPolicy(s,g.ACTIONS[0]).action);
assert.equal(g.sampleOutcome(a,0),0);
assert.equal(g.applyPuzzlePenalty(s,1).energy,45);
assert.equal(g.applyPuzzlePenalty(s,2).energy,41);
assert.equal(g.hazard(s,0,0.9).state.energy,45);
assert(g.calculateEnding(3,80,true).includes('Алтын'));
console.log('PASS: 9 puzzles, 27 actions, MDP, agent, expected utility, penalties, endings');
