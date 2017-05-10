var request = require('request');

function BasetripAPI() {
    var country = "France";

    var options = {
    url: 'https://thebasetrip.p.mashape.com/v2/countries/' + country,
    headers: {
        'X-Mashape-Key': 'wk0vIHbNHBmshGyNWgmNn4WNcfj9p1ORF9PjsnHUfmkkpWmPMi',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    };
    
    function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
    }
    }
    
    request(options, callback);
}

module.exports = BasetripAPI;