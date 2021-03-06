//Import (require) `connection.js` into `orm.js`
var connection = require('../config/connection.js');

//helper functions
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {

    selectAll: function(cb){
        var queryString = "SELECT * FROM burgers";
        connection.query(queryString, function(err,result){
            if (err){
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(columns, vals, cb){

        console.log('columns', columns);
        console.log('vals', vals);

        var queryString = "INSERT INTO burgers";

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        //queryString += vals[0];
        queryString += ") ";

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function(columnValues, condition, cb){
        var queryString = "UPDATE burgers";
            queryString += " SET ";
            queryString += objToSql(columnValues);
            queryString += " WHERE ";
            queryString += condition;

            console.log(queryString);

            connection.query(queryString, function(err, result) {
                if (err) {
                    throw err;
                }
                cb(result);
        });
    }
};

module.exports = orm;