var db = require('../models');
var yelp = require('./Yelp.js');
var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();

router.post("/api/yelp", function(req, res) {
    var query = JSON.stringify(req.body.data);
    yelp(null, query, 5, function(data){
        console.log(data);
        router.get("/api/yelp/data", function(req, res){
            res.json(data);
        });
        res.end();
    });
});

router.post("/api/user", function(req, res){
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


router.post("/user/searches" , function (req, res) {

    console.log(req.body);

    var firstSearch = req.body.First;
    var secondSearch =  req.body.Second;
    var thirdSearch = req.body.Third;
    var fourthSearch = req.body.Fourth;
    var fifthSearch = req.body.Fifth;

    res.end();

});
module.exports = router;