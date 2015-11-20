'use strict';
process.on('message', function(msg) {
    console.log('---->' + process.pid + ' works on ' + msg.id);

    var UglifyJS = require("uglify-js"),
        srcFile = 'jquery.js',
        minFileName = 'jquery.min.js.map';
    console.time('compress ' + srcFile);

    UglifyJS.minify(srcFile, {
        outSourceMap: minFileName
    });

    console.timeEnd('compress ' + srcFile);

    process.send({
        output: '[worker]:' + process.pid + ' did the work'
    });
});
