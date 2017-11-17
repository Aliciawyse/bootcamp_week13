var express = require('express');

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var burgerObject = {
            burgers: data
        };
        //console.log(burgerObject);
        res.render("index", burgerObject);
    });
});


router.post("/api/burgers", function(req, res){
    console.log('body', req.body);
    burger.insertOne(['burger_name','devoured','date'], [req.body.burger_name, req.body.devoured, req.body.date], function(result){
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    })
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition,", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if(result.changedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;


