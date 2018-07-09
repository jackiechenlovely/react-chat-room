const express = require("express")

const bodyParser = require("body-parser")

const cookieParser = require("cookie-parser")

const path = require("path");

const app = express();

const server = require("http").Server(app)

const io = require("socket.io")(server)

const model  = require("./model");

const User = model.getModel("user");

const Chat = model.getModel('chat');

io.on('connection', function (socket) {
    socket.on('sendmsg', function (data) {
        const {from,to,msg,avater,username,type} = data;
        const chatid = [from,to].sort().join("_");
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            if(!err){
                io.emit("getmsg",doc,{avater,username,type});
            }
        })
    });
});
app.use(cookieParser())

app.use(bodyParser.json())

app.use(function(req,res,next){
    if(req.url.startsWith("/user/")|| req.url.startsWith("/static/")){
        return next()
    }
    return  res.sendFile(path.resolve("build/index.html"));
})

app.use("/",express.static(path.resolve("build")))

const userRouter = require("./user")

app.use("/user",userRouter)

server.listen(8000,"192.168.42.100",function(){
    console.log("node app start at port 8000")
})