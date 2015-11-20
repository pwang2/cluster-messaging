'use strict';
var cluster = require('cluster');
var cpus = require('os').cpus();
var pool = [],
    len = cpus.length;

cluster.setupMaster({
    exec: 'worker.js'
});

for (var i = 0; i < len; i++) {
    var p = cluster.fork();
    pool.push(p);

    //p itself is in the world of the master.
    //in the worker.js, process.on('message') is in the worker's world
    p.on('message', function(m) {
        console.log(m.output);
    });

    //p.process.pid is the forked process's id.
    //process.id in master is always the cluster process's id
    console.log(p.process.pid);
}

process.on('message', function(message) {
    console.log('you call me?');
    console.log('I will find someone work for you');

    var i = Math.floor(Math.random() * len);
    var luckyWorker = pool[i];
    luckyWorker.send({
        id: message.msg
    });
    console.log(luckyWorker.process.pid + ' is working for you');
});
