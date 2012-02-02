var http = require('http');
var _ = require("underscore");
var args = process.argv.splice(2);

var pushHandler = function(countdowns){
    var data = JSON.stringify( {countdowns: countdowns} ),
        host = args[0] === undefined? "localhost" : args[0],
        port = args[1] === undefined? 8080 : parseInt(args[1], 10),
        options = {
            host: host,
            port: port,
            path: '/upsertmulti',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data,'utf8')
            }
        };

    console.log("pushing to " + host + ":" + port);
    var request = http.request(options, function(res){
        console.log(res.statusCode);

        console.log("body: ");
        res.on('data', function(chunk) {
            //console.log(chunk);
        });
    });
    

    request.on('error', function(err) {
        console.log("Error pushing results: ");
        console.log(err.message);
    });
    request.write( data );
    request.end();
};

//alternative to push for testing
var printHandler =  function(countdowns){
    _.each(countdowns, function(c){
        c.eventDate = new Date(c.eventDate);
        console.log(JSON.stringify(c));
    });
};


var handle = function(countdowns){
    if( !isDryRun() ){
        pushHandler(countdowns);
    } else {
        printHandler(countdowns);
    }
};

function isDryRun(){
    return _.include(args, "--dry-run");
}

exports.handle = handle;