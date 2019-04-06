var fs = require('fs');
var path = require("path");
var request = require('request');

const { workerData, parentPort } = require('worker_threads');

request(workerData.fileurl, function (err, response) {
    if (err) throw new Error(err);
    if (response.statusCode !== 200) throw new Error("bad request: " + workerData.fileurl);
    fs.writeFile(path.join(__dirname, 'files', workerData.filename), response.body, function (err) {
        if (err) throw new Error(err);
        parentPort.postMessage(response.body);
    });
});