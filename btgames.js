var underscore = require("./vendor/underscore.js");

var btgames = {
    common_tags: ["games"],
    pages: [
        {url : "http://www.btgames.co.za/bt/release.asp", tags: ["pc"]}
    ],
    parser: function(pageTags, callback){
        return function(error, browser){
            
            underscore.each( underscore.range(2), function(val){
                browser.select("p", val.toString(), function(browser){
                    
                    console.log(browser.html());
                });
                
                
            });
        };
    }
};

exports.btgames = btgames;