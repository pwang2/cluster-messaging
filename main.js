var cp = require('child_process');

var p = cp.fork('./cluster.js');

console.log('[main]: do something cluster');


setInterval(function() {
    p.send({
        msg: 'do something cluster'
    });
}, 1500);
