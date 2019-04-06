var hrstart = process.hrtime();

var fs = require('fs');
var path = require("path");
var request = require('request');

const bookFile = './books.json';

var readFile = function(filepath){
    return new Promise(function(resolve, reject){
        fs.readFile(filepath, 'utf8', function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    });
};

var fetchFile = function(fileurl, filename){
    return new Promise(function(resolve, reject){
        request(fileurl, function (err, response) {
            if (err) return reject(err);
            if (response.statusCode !== 200) return reject("bad request: " + fileurl);
            fs.writeFile(path.join(__dirname, 'files', filename), response.body, function (err) {
                if (err) return reject(err);
                return resolve(response.body)
            });
        });
    })
};

async function run() {
    var data = await readFile(bookFile);
    var books = JSON.parse(data);
    var lop = books.map(function(book, i){
        return fetchFile(book.url, i.toString());
    });
    try {
        var results = await Promise.all(lop);
        console.log(results.length);
    } catch (err){
        console.log(err);
    }
    let hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
};

run().catch(err => console.error(err));



