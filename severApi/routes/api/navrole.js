var express = require('express');
var router = express.Router();
var db=require('../../utils/dbmysql')
router.get('/index',function(req,res,next){
    let a=db.query(`select * from users`)
    let b=db.query(`select id,name,password from users`)
    Promise.all([a,b]).then((result)=>{
        console.log(result);
        res.json({code:200,msg:'请求测试成功'});
    }).catch(err=>{
        console.log(err)
    })
    
})


module.exports = router;