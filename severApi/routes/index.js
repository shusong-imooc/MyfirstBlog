var express = require('express');
var PATH =require('path')
var router = express.Router();

/* GET home page. */
require("../utils/router").appsRoute(PATH.join(__dirname,'/api'),'',router);

module.exports = router;
