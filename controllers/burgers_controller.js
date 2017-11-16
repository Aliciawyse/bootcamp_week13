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
        console.log(burgerObject);
        res.render("index", burgerObject);
    });
});


router.post("/api/burgers", function(req, res){
    burger.insertOne(['name','sleepy'], [req.body.name, req.body.sleepy], function(result){
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    })
});



// Export routes for server.js to use.
module.exports = router;


