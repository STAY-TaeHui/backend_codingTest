var express = require('express');
var router = express.Router();
let models = require('../models')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User Page');
});

//로그아웃
router.delete('/logout',  async (req,res,next)=>{
 
  console.log("로그아웃 라우터");
  
 let session_uniq = req.body.session;

 await models.session.findOne({
   where:{id:session_uniq}
 })
 .then(result=>{
  models.session.update(
    {
    logout_time : Date.now()
  },{
    where:{
      session_value : result.dataValues.session_value
    }
  },
  )
 })
  
  await models.users.update(
    {
      where : {
        user_id : session_uniq
      }
    },{
    signout_time : Date.now()
  }
  )
  .then(()=>{
    res.json({result:0})
  })
  .catch(err=>{throw err})
 req.session.destroy();
});

//회원탈퇴
router.delete('/exit', async(req,res,next)=>{
  console.log("회원탈퇴 라우터");
  let body = req.body;

  await models.users.update(
    {
      exit_time:Date.now()
    },
    {
    where:{
      user_id:body.userId
    }
  }
  ).then(()=>{res.json({result : 0})})
  .catch(err=>{res.json({result:-1})})
})

//회원조회
router.get('/userslist', async(req,res,next)=>{
  console.log("회원조회 라우터");
  let body = req.body;

  await models.users.findOne(
    {where:{
    user_id: body.userId 
    }},
    {attributes:
    [
      ''
    ]}
  )
})

module.exports = router;
