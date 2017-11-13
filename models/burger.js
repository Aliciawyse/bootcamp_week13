var myOrm = require('../config/orm.js');

var makeBurger = {
    selectAll: function(cb) {
        myOrm.selectAll(function(res) {
            cb(res);
        });
    },
    // The variables cols and vals are arrays.
    insertOne: function(columns, vals, cb) {
        myOrm.insertOne(columns, vals, function(res) {
            cb(res);
        });
    },
    updateOne: function(columnValues, condition, cb) {
        myOrm.updateOne(columnValues, condition, function(res) {
            cb(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = makeBurger;
