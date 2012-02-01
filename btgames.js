var _ = require("./vendor/underscore.js");
var fs     = require('fs');
var jqueryString = fs.readFileSync("./vendor/jquery.js").toString();

//detect when xhr is complete
var contentLoaded = function(window) {
    return window.querySelector("table");
};


var btgames = {
    common_tags: ["games"],
    pages: [
        {url : "http://www.btgames.co.za/bt/release.asp", tags: []}     
    ],
    platforms: [
        {value: '1', name: "PC-CD/DVD"},
        {value: '3', name: "PS3"},
        {value: '4', name: "3DS"},
        {value: '8', name : "XBOX 360"},
        {value: '10', name: "WII"}
    ],
    parser: function(pageTags, callback){
        var that = this;          
        return function(error, browser){
              var queue = _.map(that.platforms, function(platform){
                return function() {
                    console.log("Executing " + platform.name);
                    browser.select("#p", platform.value); 
                    browser.evaluate("document.getElementById('selection').submit()");  //do the submit cause zombie is too lame to pick up onchange
                    browser.wait(contentLoaded, function(){
                        browser.evaluate(jqueryString);
                        var $ = browser.evaluate("window.$"),
                            results = [],
                            dateText;
                        $('table[rules="rows"] > tr').each(function(trInd) {
                           
                            if( $(this).find('td').length === 1) {
                              dateText = $.trim( $(this).find('td').text() );
                              dateText = !dateText.match(/\w*(\,)?\s\d{4}/) ? undefined : dateText;
                            }
                            else if(dateText) {
                                var name = $(this).find('td:first-child').text() + " - " + platform.name, //might have same name for eg PS3 and PC
                                    publisher = $(this).find('td:nth-child(3)').text(),
                                    genre =  $(this).find('td:nth-child(4)').text(),
                                    dayMaybe =  $(this).find('td:nth-child(5)').text(),
                                    dayMatch = dayMaybe.match(/(\d{1,2})\s(\w*)/),
                                    day = dayMatch === null? 1 : dayMatch[1],
                                    result = {name: name, eventDate: Date.parse(day + " " + dateText), tags: that.common_tags.concat(pageTags, [genre, publisher, platform.name]) };
                               
                                results.push(result);
                            }
                        });
                        callback(results);
                        
                        parsePlatform();
                    });
                };
            });

            function parsePlatform(){
                if(queue.length){
                    queue.shift()();
                }
            };

            parsePlatform();
            
        };
    }
};

exports.btgames = btgames;