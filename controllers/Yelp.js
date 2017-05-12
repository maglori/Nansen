'use strict';
 
const yelp = require('yelp-fusion');

function YelpAPI(term, location, limit, cb) {
    const clientId = "vtImstqahtr-cAxLRgO2VA";
    const clientSecret = "GW3NGtUhEqyzpvPHDp5grOs7NylzQtryzo8nBzv0GfPIEw3riktpXTLNT02KDQpK";
    var token;
        yelp.accessToken(clientId, clientSecret).then(response => {
            token = response.jsonBody.access_token;
            const client = yelp.client(token);
            if (!term) {
                let term = ""
                client.search({
                    term: term,
                    location: location,
                    limit: limit,
                }).then(response => {
                    cb(response.jsonBody.businesses);
                }).catch(e => {
                    console.log(e);
                });
            } else {
                client.search({
                    term: term,
                    location: location,
                    limit: limit
                }).then(response => {
                    cb(response.jsonBody.businesses);
                }).catch(e => {
                    console.log(e);
                });
            }
        }).catch(e => {
        console.log(e);
    });
    return yelp;
};

module.exports = YelpAPI;