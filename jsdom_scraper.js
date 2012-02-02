var jsdom = require("jsdom");
var fs     = require('fs');
var http = require('http');

var jqueryString = fs.readFileSync("./vendor/jquery.js").toString();
var _ = require("underscore");
var handler = require('./result_handler.js');
var supersport = require('./supersport.js');

var jsdom_scrape = function(scraper, callback) {
    var results = [],
        page;
    _.each (scraper.pages, function(page) {
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

var scrapers = [
    supersport.soccer,
    supersport.cricket,
    supersport.rugby
];

_.each(scrapers, function (scraper) {
        jsdom_scrape(scraper, handler.handle);
});
