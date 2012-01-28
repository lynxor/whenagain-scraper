var Browser = require("zombie");
var underscore = require("./vendor/underscore.js");

var browser = new Browser();

var zombie_scrape = function(scraper, callback) {
    var results = [],
        page;
    underscore.each (scraper.pages, function(page) {
        browser.visit(page.url, scraper.parser(page.tags, callback));
    });
};

console.log('Hello');
exports.zombie_scrape = zombie_scrape;