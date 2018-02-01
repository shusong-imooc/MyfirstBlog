var cfg = require('../conf/dbconf');
var MSSQL = require('mssql');
var config = {
    driver: 'tedious', // tedious , msnodesqlv8 , msnodesql , tds
    user: cfg.mssqldbuser,
    password: cfg.mssqldbpassword,
    server: cfg.mssqldbhost,
    database: cfg.mssqldbname,
    port: cfg.mssqldbport || 1433,
    pool: {
        max: 50,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

var pool = new MSSQL.ConnectionPool(config, function (error) {
    if (error) console.error(error);
});

module.exports = {
    exec: exec,
    tranexec: tranexec,
    query: query
};


function query( /*arguments*/) {
    var args = Array.prototype.slice.call(arguments);
    return exec(args);
}

function exec(args) {
    var request = pool.request();
    var sql = args[0];
    if (args.length > 1) {
        var regexp = new RegExp(/\?/);
        var num = 0;
        while (sql.match(regexp)) {
            sql = sql.replace("\?", "@p" + num);
            request.input('p' + num, MSSQL.NVarChar, args[num + 1]);
            num = num + 1;
        }
        if (cfg.mssqldebug) {
            console.log("=======执行sql:===========\r\n" + sql);
            console.log("=======执行sql结束=========");
        }
    }
    return execarrayByRequrest(request, [sql]);
}

function execarrayByRequrest(request, args) {
    return new Promise((resolve, reject) => {
        var promiseCallback = function (err, recordset) {
            if (err) {
                reject(err);
            } else {
                resolve(recordset);
            }
        };
        args.push(promiseCallback);
        request.query.apply(request, args);
    });
}

function tranexec( /*arguments*/) {
    return new Promise((resolve, reject) => {
        var transaction = pool.transaction();
        var args = Array.prototype.slice.call(arguments);
        transaction.begin(function (err) {
            var request = new MSSQL.Request(transaction);
            var promises = [args.length];
            for (var i = 0; i < args.length; i++) {
                var item = args[i];
                console.log(item);
                if (Object.prototype.toString.call(item) === '[object Array]') {
                    var regexp = new RegExp(/\?/);
                    var sql = item[0];
                    var num = 0;
                    while (sql.match(regexp)) {
                        sql = sql.replace("\?", "@p" + num);
                        request.input('p' + num, MSSQL.VarChar, item[num + 1]);
                        num = num + 1;
                    }
                    console.log(sql);

                    promises[i] = execarrayByRequrest(request, [sql]);
                } else if (typeof item === 'string') {
                    promises[i] = execarrayByRequrest(request, [item]);
                } else {
                    throw `传入的参数不正确, 正确的格式为
                         [ "insert into tmp values('a','b') " ]
                    或者 [[ "insert into tmp values(?,?) ",a,b ]]
                    或者 ["insert into tmp values('a','b') ",[ "insert into tmp values(?,?) ",a,b ]]
                     `
                }
            }
            Promise.all(promises).then(function (results) {
                console.log("commit", results);
                transaction.commit(function (err, recordset) {
                    if (err) {
                        reject(error);
                    } else {
                        resolve(true);
                    }
                });
            }).catch(function (error) {
                console.error("fail....", error);
                reject(error);
                rollback(transaction);
            });
        });
    });
}

function rollback(trans) {
    console.log(" --- rollback ----");
    trans.rollback(function (err, recordset) {
        if (err) {
            setTimeout(function () { rollback(trans) }, 100);
        }
    });
}