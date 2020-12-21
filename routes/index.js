var express = require('express');
var router = express.Router();
var crypto = require('crypto');
let models = require('../models')
let ip = require('ip');


let jwt = require('jsonwebtoken');
let screteObj = require('../config/jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Main Page');
});

//로그인
router.put('/login', async (req,res,next)=>{
  let body = req.body;

  let result = await models.users.findOne({
    where : {
      user_id : body.userId
    }
  })
  
  let dbPassword = result.dataValues.password;
  let inputPassword = body.userPassword;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
    req.session.userId = body.userId;

    console.log(ip.address())

    // 세션 데이터 추가
    await models.session.create({
      session_value : req.session.id,
      ip_addr : ip.address(),
      createdAt : Date.now()
    })
    .then(async()=>{
      let result = await models.session.findOne({
        where:{
          session_value : req.session.id
        }
      },
      {
        attributes:['id','logout_time','createdAt']
      })
      res.json({result : 0, session:result.dataValues.id}).redirect('/uesrs')
    })
    .catch(err=>{throw err});   
    
  }

})
//회원가입
router.post('/sign_up', async(req,res,next)=>{
  let body = req.body;
  let inputPassword = req.body.userPassword;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword+salt).digest("hex");

  let id_check=await models.users.findOne({
    where:{user_id:body.userId}
  });
  if(id_check){
    res.send("중복되는 아이디 입니다.");
  }
  else{
    console.log("회원가입 가능");
  
  await models.users.create({
    user_id:body.userId,
    password:hashPassword,
    createdAt : Date.now(),
    salt : salt
  })
  .then(()=>{
    res.json({result:0});
  })
  .catch(err=>{
    res.json({result:-1});
    throw err;
  })
}
})
module.exports = router;
