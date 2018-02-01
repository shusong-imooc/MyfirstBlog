/*
*连接sqlsever的promise.all的写法成功
*/
var express = require('express');
var router = express.Router();
var db=require('../../utils/dbmssql')
router.get('/index',function(req,res,next){
    let a=db.query(`select * from users where id=?`,'1')
    let b=db.query(`select id,name,password from users`)
    Promise.all([a,b]).then((result)=>{
        console.log(result[0].recordset);
        console.log(result[1].recordset);
        res.json({code:200,msg:'请求测试成功'});
    }).catch(err=>{
        console.log(err)
    })
    
})


module.exports = router;