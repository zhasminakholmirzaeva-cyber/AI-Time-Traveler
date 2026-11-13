const assert=require('assert');const g=require('./game.js');
assert.equal(g.goalCheck({energy:78,happiness:64,budget:10},0),true);
assert.equal(g.goalCheck({energy:77,happiness:90,budget:10},0),false);
assert.equal(g.hazard({energy:50,happiness:60,budget:100},0,.99).state.energy,50);
assert.ok(g.hazard({energy:50,happiness:60,budget:100},0,.01).state.energy<50);
assert.equal(g.calculateEnding([{passed:true},{passed:true},{passed:true}]),'Аңызға айналған саяхатшы');
assert.equal(g.calculateEnding([{passed:false},{passed:false},{passed:false}]),'Уақыт парадоксы');
console.log('6 hard-mode checks passed');
