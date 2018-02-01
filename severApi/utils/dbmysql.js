/*
*连接mysql的promise.all的写法成功
*/

var cfg = require('../conf/dbconf');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: cfg.mysqldbhost,
    user: cfg.mysqldbuser,
    password: cfg.mysqldbpassword,
    database: cfg.mysqldbname,
    multipleStatements: true,
    port: cfg.mysqldbport || 3306
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
})
function query() {
    return new Promise((resolve, reject) => {
        var args = Array.prototype.slice.call(arguments);
        args.push(function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
        connection.query.apply(connection, args);
    });
}


module.exports = {
    query: query
};