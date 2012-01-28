var underscore = require("./vendor/underscore.js");

var btgames = {
    common_tags: ["games"],
    pages: [
       {url : "http://www.btgames.co.za/bt/release.asp", tags: ["pc"]}     
    ],
    parser: function(pageTags, callback){
        return function(error, browser){
            console.log(browser.html());
            underscore.each( [3], function(val){
                browser.select("#p", val.toString());             
                browser.evaluate("getformat()");
               
                console.log("After eval");
                
                
            });
        };
    }
};

exports.btgames = btgames;