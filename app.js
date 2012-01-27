var jsdom = require("jsdom");
var fs     = require('fs');
var http = require('http');

var jqueryString = fs.readFileSync("./vendor/jquery.js").toString();
var underscore = require("./vendor/underscore.js");

var supersport = require('./supersport.js');

var arguments = process.argv.splice(2);

var scrape = function(scraper, callback) {
    var results = [],
        page;
    underscore.each (scraper.pages, function(page) {
        jsdom.env({
            html: page.url,
            src: [
                jqueryString
            ],
            done: function(errors, w) {
                try{
                    callback(results.concat( scraper.parser(errors, w, page.url, page.tags ) ));
                }catch(err){
                    console.log(err.message);
                    console.log(err.stack);
                    
                } 
            }
        });
    });
};

var push = function(countdowns){
    var data = JSON.stringify( {countdowns: countdowns} ),
        host = arguments[0] === undefined? "localhost" : arguments[0],
        port = arguments[1] === undefined? 8080 : parseInt(arguments[1], 10),
        options = {
            host: host,
            port: port,
            path: '/upsertmulti',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data,'utf8')
            }
        };

    var request = http.request(options, function(res){
        console.log(res.statusCode);

        console.log("body: ");
        res.on('data', function(chunk) {
            //console.log(chunk);
        });
    });
    

    request.on('error', function(err) {
            console.log("Error pushing results");
            console.log(err.message);
    });
    request.write( data );
    request.end();
};

//scrape and push
underscore.each( [supersport.soccer, supersport.cricket, supersport.rugby], function (scraper) {
    var res = scrape(scraper, push); 
});
