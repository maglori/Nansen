var db = require('../models');
var yelp = require('./Yelp.js');
var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();

router.post("/api/yelp", function (req, res) {
    var query = JSON.stringify(req.body.data);
    yelp(null, query, 5, function (data) {
        // console.log(data);
        res.json(data);
    });
});

router.post("/user/searches", function (req, res) {

    var searches = [];
    for (prop in req.body) {
        searches.push(req.body[prop]);
    };

        var UID = searches[0];
        var Username = searches[1];
        var country_Dest = searches[2];

    for (var i = 3; i < searches.length; i++) {
        db.Itinerary.create({
            UID: UID,
            Username: Username,
            country_Dest: country_Dest,
            itinerary_Item: searches[i],
        }).then(function(itinerary){
            console.log("database return successful: itinerary=%j", itinerary);
        });
    };
    res.end();
});

router.post("/user/itinerary", function (req, res) {
    var UID = req.body.user_id;
    db.Itinerary.findAll({
        where: {
            UID: UID, 
        }
    }).then(function (itineraryArray) {
        console.log(itineraryArray)
        res.send(itineraryArray);
        res.end();
    });
});

module.exports = router;