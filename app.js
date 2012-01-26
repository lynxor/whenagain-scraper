var jsdom = require("jsdom");
var underscore = require("./vendor/underscore.js");

var scrape = function(scraper) {
    var results = [],
        page;
    underscore.each (scraper.pages, function(page) {
        jsdom.env({
            html: page.url,
            scripts: [
                './vendor/jquery.js',
                './vendor/underscore.js'
            ],
            done: function(errors, w) {
                results.concat( scraper.parser(errors, w, page.url, page.tags ) );
            }
        });
    });
    console.log(results.length);
    return results;
};

var supersport = {
    common_tags: ["sport", "official" ],
    pages: [{url: "http://www.supersport.com/cricket/sa-team/fixtures?print=true", tags: ["cricket", "proteas"]},
            {url: "http://www.supersport.com/rugby/springboks/fixtures?print=true", tags: ["rugby", "springboks"]},
            {url: "http://www.supersport.com/rugby/super-rugby/fixtures?print=true", tags: ["rugby", "super 15", "super rugby"]},
            {url: "http://www.supersport.com/rugby/vodacom-cup/fixtures?print=true", tags: ["rugby", "vodacom cup"]},
            {url: "http://www.supersport.com/rugby/six-nations/fixtures?print=true", tags: ["rugby", "six nations"]} ],
    parser: function(e, w, url, pageTags) {
        var $ = w.$,
            results = [],
            that = this;
        
        $('table.fixturestable').each(function(index) {
            var dateText = $(this).find('tr:first-child > td').text();      
            $(this).find('tr').slice(1).each(function(i) { 
                var name = $(this).find('td:nth-child(2)').text() + " v " + $(this).find('td:nth-child(4)').text() + ' at ' + $(this).find('td:nth-child(6)').text(),
                    fullDate = $(this).find('td:first-child').text() + ' ' + dateText + ' ' +  $(this).find('td:nth-child(7)').text(),
                    tags = [$(this).find('td:nth-child(5)')].concat(pageTags, that.common_tags);
                  
                var result = {name:  name , eventDate: new Date(fullDate), tags: tags, url: url };
                console.log(JSON.stringify(result));
                results.push(result);
            });
        }); 
    }
};

scrape(supersport);