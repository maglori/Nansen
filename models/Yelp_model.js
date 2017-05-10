'use strict';
 
const yelp = require('yelp-fusion');

function YelpAPI() {
    const clientId = "vtImstqahtr-cAxLRgO2VA";
    const clientSecret = "GW3NGtUhEqyzpvPHDp5grOs7NylzQtryzo8nBzv0GfPIEw3riktpXTLNT02KDQpK";
    var token;
        yelp.accessToken(clientId, clientSecret).then(response => {
            token = response.jsonBody.access_token;
            const client = yelp.client(token);
        
            client.search({
                term:'Four Barrel Coffee',
                location: 'san francisco, ca'
            }).then(response => {
                console.log(response.jsonBody.businesses[0].name);
            }).catch(e => {
                console.log(e);
            });
        }).catch(e => {
        console.log(e);
    });

    return yelp;
};

YelpAPI();

module.exports = YelpAPI;