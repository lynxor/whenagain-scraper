var parse = function(e, w, parseTr){
    var $ = w.$,
        results = [];
    $('table.fixturestable').each(function(index) {
        var dateText = $(this).find('tr:first-child > td').text(); 
        $(this).find('tr').slice(1).each(function(i) { 
            results.push( parseTr( this, dateText ) );
        });
    });
   // console.log(results.length);
    return results;
};

var cricket = {
    common_tags: ["cricket", "sport", "official" ],
    pages: [
        {url: "http://www.supersport.com/cricket/sa-team/fixtures?print=true", tags: ["proteas"] },
        {url: "http://www.supersport.com/cricket/supersport-series/fixtures?print=true", tags: ["supersport", "supersportseries", "sss" ] },
        {url: "http://www.supersport.com/cricket/domestic-t20/fixtures?print=true", tags: ["top20", "domesticcricket" ] }
    ],
    parser: function(e, w, url, pageTags) { 
        var that = this;
        return parse(e, w, function( tdThis, dateText ){
            var $ = w.$, 
                name = $(tdThis).find('td:nth-child(2)').text() + " v " + $(tdThis).find('td:nth-child(4)').text() + ' at ' + $(tdThis).find('td:nth-child(6)').text(),
                fullDate = $(tdThis).find('td:first-child').text() + ' ' + dateText + ' ' +  $(tdThis).find('td:nth-child(7)').text(),
                tags = [ $(tdThis).find('td:nth-child(5)').text() ].concat(pageTags, that.common_tags);
            var result = {name:  name , eventDate:  Date.parse(fullDate), tags: tags, url: url };
            return result;
        });
    }
};


var rugby = {
    common_tags: ["sport", "official" ],
    pages: [
        {url: "http://www.supersport.com/rugby/springboks/fixtures?print=true", tags: ["rugby", "springboks"]},
        {url: "http://www.supersport.com/rugby/super-rugby/fixtures?print=true", tags: ["rugby", "super15", "superrugby"]},
        {url: "http://www.supersport.com/rugby/vodacom-cup/fixtures?print=true", tags: ["rugby", "vodacomcup"]},
        {url: "http://www.supersport.com/rugby/six-nations/fixtures?print=true", tags: ["rugby", "sixnations"]}
        
    ],
    parser: function(e, w, url, pageTags) {
        var that = this;
        return parse(e, w, function( tdThis, dateText ){
            var $ = w.$,  
                name = $(tdThis).find('td:nth-child(2)').text() + " v " + $(tdThis).find('td:nth-child(4)').text() + ' at ' + $(tdThis).find('td:nth-child(5)').text(),
                fullDate = $(tdThis).find('td:first-child').text() + ' ' + dateText + ' ' +  $(tdThis).find('td:nth-child(6)').text(),
                tags = pageTags.concat(that.common_tags);
            
            var result = {name:  name , eventDate: Date.parse(fullDate), tags: tags, url: url };
            return result;
        });
    }       
};

var soccer =  {
    common_tags: ["sport", "official" ],
    pages: [
       // {url: './examples/supersport_soccer.html', tags: ["test"] }
        {url: "http://www.supersport.com/football/national-first-division/fixtures?print=true", tags: ["soccer", "football", "nationalfirstdivision", "firstdivision"]},
        {url: "http://www.supersport.com/football/absa-premiership/fixtures?print=true", tags: ["absapremiership", "premiership"]}
        
    ],
    parser: function(e, w, url, pageTags) {
        var that = this,
            $ = w.$,
            results = [],
            dateText;

        $('div > table.fixturestable').each(function (ind) {
            if ( $(this).find('tr > td.tableHeader').length == 1){
                dateText = $(this).find('tr > td.tableHeader').text();
                //console.log(dateText);
            }
            else {
                $(this).find('tr').each(function(trInd) {
                    var name = $(this).find('td:nth-child(1)').text() + " v " + $(this).find('td:nth-child(3)').text() + ' at ' + $(this).find('td:nth-child(4)').text(),
                    fullDate = dateText + ' ' +  $(this).find('td:nth-child(5)').text(),
                    tags = pageTags.concat(that.common_tags);
                    var result = {name:  name , eventDate: Date.parse(fullDate), tags: tags, url: url };
                    results.push(result);
                });
            }
        });
        return results;
    }  
};

exports.cricket = cricket;
exports.rugby = rugby;
exports.soccer = soccer;