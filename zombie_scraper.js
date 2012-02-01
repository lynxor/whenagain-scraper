var Browser = require("zombie");
var underscore = require("./vendor/underscore.js");

var browser = new Browser();

var zombie_scrape = function(scraper, callback) {
    var results = [],
        page;
    underscore.each (scraper.pages, function(page) {
        try{
            browser.visit(page.url, scraper.parser(page.tags, callback));
        } catch(err){
            console.log(err.stack);
        }
    });
};


exports.zombie_scrape = zombie_scrape;