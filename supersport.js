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
        {url: "http://www.supersport.com/cricket/domestic-t20/fixtures?print=true", tags: ["top20", "sadomesticcricket" ] }
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
        {url: "http://www.supersport.com/rugby/springboks/fixtures?print=true", tags: ["rugby", "springboks", "sarugby"]},
        {url: "http://www.supersport.com/rugby/super-rugby/fixtures?print=true", tags: ["rugby", "super15", "superrugby"]},
        {url: "http://www.supersport.com/rugby/vodacom-cup/fixtures?print=true", tags: ["rugby", "vodacomcup", "sarugby"]},
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
    common_tags: ["soccer", "football", "sport", "official" ],
    pages: [
        // {url: './examples/supersport_soccer.html', tags: ["test"] } //just for testing offline
        {url: "http://www.supersport.com/football/national-first-division/fixtures?print=true", tags: ["nationalfirstdivision", "firstdivision"]},
        {url: "http://www.supersport.com/football/absa-premiership/fixtures?print=true", tags: ["absapremiership", "premiership"]},
        {url: "http://www.supersport.com/football/europa-league/fixtures?print=true", tags: ["UEFA", "Europa", "europaleague"]},
        {url: "http://www.supersport.com/football/uefa-champions-league/fixtures?print=true", tags: ["UEFA", "eufachampionsleague"]},
        {url: "http://www.supersport.com/football/spain/fixtures?print=true", tags: ["spain", "primeraliga"]},
        {url: "http://www.supersport.com/football/england/fixtures?print=true", tags: ["england", "premierleague" ]},
        {url: "http://www.supersport.com/football/fa-cup/fixtures?print=true", tags: ["england", "FACup" ]},
        {url: "http://www.supersport.com/football/germany/fixtures?print=true", tags: ["bundesliga", "German"]},
        {url: "http://www.supersport.com/football/france/fixtures?print=true", tags: ["ligue1", "french"]},
        {url: "http://www.supersport.com/football/portugal/fixtures?print=true", tags: ["portuegueseliga", "liga"]}
        
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
                        col5 = $(this).find('td:nth-child(5)').text(),
                        col6 = $(this).find('td:nth-child(6)').text(),
                        time = col5.match(/\d{2}:\d{2}/) === null? col6 : col5,
                        fullDate = dateText + ' ' + time ,
                        tags = pageTags.concat(that.common_tags),
                        result = {name:  name , eventDate: Date.parse(fullDate), tags: tags, url: url };
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