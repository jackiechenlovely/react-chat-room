const mongoose = require("mongoose")

const DB_URL = "mongodb://localhost:27017/chat"

mongoose.connect(DB_URL);

mongoose.connection.on("connected",function(){
    console.log("mongoDB connect success")
})

const models = {
     user:{
         "username":{type:String,require:true},
         "password":{type:String,require:true},
         "type":{type:String,require:true},
         "avater":{type:String},
         "desc":{type:String},
         'title':{type:String},
         'company':{type:String},
         'money':{type:String},
         'qq':{type:String}
     },
     chat:{
         'chatid':{type:String,require:true},
         'from':{type:String,require:true},
         'to':{type:String,require:true},
         'read':{type:Boolean,default:false},
         'content':{type:String,require:true},
         'createtime':{type:Number,default:new Date().getTime()}
     }
}

for(let m in models){
     mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function (name) {
         return mongoose.model(name)
    }
}