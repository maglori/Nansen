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

module.exports = router;