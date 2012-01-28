var jsdom = require("jsdom");
var fs     = require('fs');
var http = require('http');

var jqueryString = fs.readFileSync("./vendor/jquery.js").toString();
var underscore = require("./vendor/underscore.js");


var jsdom_scrape = function(scraper, callback) {
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

exports.jsdom_scrape = jsdom_scrape;