var _ = require("./vendor/underscore.js");

//detect when xhr is complete
var contentLoaded = function(window) {
    return window.querySelector("table");   //wow this is lame
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
            var queue = [],
                paused = false;

            _.each(that.platforms, function(platform){
                queue.push(function() {
                    console.log("Executing " + platform);
                    browser.select("#p", platform.value); 
                    browser.evaluate("document.getElementById('selection').submit()");  //do the submit cause zombie is too lame to pick up onchange
                    browser.wait(contentLoaded, function(){
                        console.log( browser.html() );
                    });
                });
            });

            var runPlatforms = function(){
                
            };
            
           
             
        };
    }
};

exports.btgames = btgames;