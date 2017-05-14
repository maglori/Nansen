var db = require('../models');
var yelp = require('./Yelp.js');
var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();

router.post("/api/yelp", function (req, res) {
    var query = JSON.stringify(req.body.data);
    yelp(null, query, 5, function (data) {
        console.log(data);
        res.json(data);
        res.end();
    });
});

router.post("/api/user", function (req, res) {
    var user_data = req.body;
    var UID = user_data.user_id;
    var Username = user_data.given_name;

    //     router.get("/success" function(req, res) {
    //         db.Itinerary.findAll({
    //             where: {
    //                 UID: UID,
    //             },
    //             include: [db.Stamps],
    //         }).then(function(data) {
    //             console.log(data);
    //         };
    // });
});

router.post("/user/searches", function (req, res) {

    console.log(req.body);
    //    var results = [];
    for (var i = 0; i < req.body["itineraryItem[]"].length; i++) {
        db.Itinerary.create({
            itinerary_Item: req.body["itineraryItem[]"][i],
            UID: req.user
        }).then(function (itinerary) {
            console.log("database return successful: itinerary=%j", itinerary);
            // res.send(); // TODO need to handle async nature. (change create to batch create)
        });
    }
    res.end();
});

router.get("/user/searches", function (req, res) {
    console.log(req.user);
    db.Itinerary.findAll({
        where: {
            UID: req.user
        }
    }).then(function (itineraryArray) {
        console.log(itineraryArray);
        res.send(itineraryArray);
        res.end();
    });
});

module.exports = router;