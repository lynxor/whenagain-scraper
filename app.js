var fs     = require('fs');
var http = require('http');
var jqueryString = fs.readFileSync("./vendor/jquery.js").toString();
var underscore = require("./vendor/underscore.js");

var supersport = require('./supersport.js');
var btgames = require('./btgames.js');

//var jsdom_scrape = require('./jsdom_scraper.js').jsdom_scrape;

var zombie_scrape = require('./zombie_scraper.js').zombie_scrape;

var arguments = process.argv.splice(2);



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

//alternative to push for testing
var printCountdowns =  function(countdowns){
    underscore.each(countdowns, function(c){
        c.eventDate = new Date(c.eventDate);
        console.log(JSON.stringify(c));
    });
};

var scrapers = [
supersport.soccer
//supersport.cricket,
//supersport.rugby
];

var zombie_scrapers = [
    btgames.btgames
];

underscore.each(zombie_scrapers, function( scraper ){
    zombie_scrape(scraper, printCountdowns);
});

underscore.each(scrapers, function (scraper) {
  //scrape(scrapers, push);
  //jsdom_scrape(scraper, printCountdowns);
});
