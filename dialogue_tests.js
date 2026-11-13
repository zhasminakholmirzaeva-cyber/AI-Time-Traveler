const assert=require('node:assert/strict');
const {STORY_DIALOGUES,PUZZLES}=require('./game.js');
assert.equal(STORY_DIALOGUES.length,9);
for (let i=0;i<9;i++) {
 assert.ok(STORY_DIALOGUES[i].length>=5,`Mission ${i+1} needs 5+ lines`);
 for (const [who,line] of STORY_DIALOGUES[i]) {
  assert.ok(['aidar','ali','chrono'].includes(who));
  assert.ok(line.length>15);
 }
}
console.log('PASS: 9 missions, '+STORY_DIALOGUES.reduce((n,x)=>n+x.length,0)+' scripted dialogue lines');
