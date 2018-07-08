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
    let hasconect = true;
    if(hasconect){
        socket.on('sendmsg', function (data) {
            hasconect = false;
            const {from,to,msg,avater,username,type} = data;
            const chatid = [from,to].sort().join("_");
            Chat.create({chatid,from,to,content:msg},function(err,doc){
                if(!err){
                    console.log({avater,username,type})
                    io.emit("getmsg",doc,{avater,username,type});
                }
            })
        });
    }
});
io.on("disconnect",function(socket){
    socket = null;
})
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

server.listen(8000,function(){
    console.log("node app start at port 8000")
})