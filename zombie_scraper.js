var Browser = require("zombie");
var _ = require("./vendor/underscore.js");
var btgames = require('./btgames.js');
var handler = require('./result_handler.js');

var browser = new Browser();

var zombie_scrape = function(scraper, callback) {
    var results = [],
        page;
    _.each (scraper.pages, function(page) {
        try{
            browser.visit(page.url, scraper.parser(page.tags, callback));
        } catch(err){
            console.log(err.stack);
        }
    });
};

var zombie_scrapers = [
    btgames.btgames
];

_.each(zombie_scrapers, function( scraper ){   
    zombie_scrape(scraper, handler.handle);
});