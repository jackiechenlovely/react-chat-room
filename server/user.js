const express = require("express");

const router = express.Router()

const model  = require("./model");

const User = model.getModel("user");

const Chat = model.getModel('chat');

const utils = require("utility")

const _filter = {"password":0,"__v":0}

function Md5(password){
    const salt = "260068413@qq.comjackiechenlovely";
    return  utils.md5(utils.md5(salt+password+salt));
}
router.get("/getmsglist",function (req,res) {
    const userid = req.cookies.userid;
    User.find({},function(err,doc){
        if(!err){
            let users = {};
            doc.forEach(v=>{
                users[v._id] = {username:v.username,avater:v.avater,type:v.type}
            })
            Chat.find({"$or":[{from:userid},{to:userid}]},function(err,msgdoc){
                if(!err){
                    return res.json({code:0,msgs:msgdoc,users})
                }
            })
        }
    })
})
router.post("/readmsg",function (req,res) {
    const userid = req.cookies.userid;
    const {from} = req.body;
    Chat.update({from,to:userid},{$set:{read:true}},{multi:true},function(err,doc){
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
    })
})
router.get("/list",function (req,res) {
    const { type } = req.query;
    User.find({type},function (err,doc) {
        res.json({
            code:0,
            data:doc
        })
    })
})

router.post("/register",function (req,res) {
     let {username,password,type,qq} = req.body;
     if(!username || !password || !type || !qq){
         return;res.json(res.json({code:1,msg:"缺少信息"}))
     }
     User.findOne({username},function (err,doc) {
         if(doc){
             return res.json({code:1,msg:"用户已注册"})
         };
         User.create({username,password:Md5(password),type,qq},function (err,doc) {
             if(err){
                 return res.json({code:1,msg:"后端出错了"})
             };
             res.cookie("userid",doc['_id']);
             return res.json({code:0,data:doc})
         })
     })
})

router.post("/login",function (req,res){
     let {username,password} = req.body;
     User.findOne({username,password:Md5(password)},_filter,function (err,doc) {
         if(err){return res.json({code:1,msg:"数据库异常"})};
         if(!doc){
            return res.json({code:1, msg:"用户名或者密码错误"})
         };
         res.cookie("userid",doc['_id']);
         res.json({code:0, data:doc});
     })
})

router.get("/info",function(req,res){
     const {userid} = req.cookies;
     if(!userid){
         return res.json({code:1})
     }
     User.findOne({_id:userid},_filter,function (err,doc){
         if(err){
             return res.json({code:1,msg:"服务端出错了"})
         };
         if(doc){
             return res.json({code:0,data:doc})
         }else{
             return res.json({code:1})
         };
     })
})
router.post("/update",function(req,res){
    const userid = req.cookies.userid;
    if(!userid){return res.json({code:1,msg:"错误"})}
    const body = req.body;
    User.findByIdAndUpdate(userid,body,_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:"服务端出错了"})
        }else{
            const data  = Object.assign({},{
                username:doc.username,type:doc.type
            },body)
            console.log(data)
            res.json({code:0,data})
        }
    })
})
module.exports = router