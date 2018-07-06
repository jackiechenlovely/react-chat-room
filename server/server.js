const express = require("express")

const bodyParser = require("body-parser")

const cookieParser = require("cookie-parser")

const app = express();

const server = require("http").Server(app)

const io = require("socket.io")(server)

const model  = require("./model");

const User = model.getModel("user");

const Chat = model.getModel('chat');

io.on('connection', function (socket) {
    console.log("a user connect")
    socket.on('sendmsg', function (data) {
        console.log(data)
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join("_");
        Chat.create({chatid,from,to,content:msg},function(err,doc){
             io.emit("getmsg",doc)
        })
    });
});

app.use(cookieParser())

app.use(bodyParser.json())

const userRouter = require("./user")

app.use("/user",userRouter)

server.listen(9093,function(){
    console.log("node app start at port 9093")
})