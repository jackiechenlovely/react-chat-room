import axios from "axios"
import io from "socket.io-client"
const socket =  io.connect("ws://192.168.42.100:8000");
//获取聊天列表
const MSG_LIST = "MSG_LIST"
//读取信息
const MSG_RECV = "MSG_RECV"
//标识已读
const MSG_READ = "MSG_READ"

const initState = {
    chatmsg:[],
    users:[],
    unread:0
}
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatmsg:action.payload.msgs,users:action.payload.users,unread:action.payload.msgs.filter(v=>!v.read && v.to === action.payload.userid).length}
        case MSG_RECV :
            const n = action.payload.userid === action.payload.data.to ? 1 : 0;
            const users = state.users;
            users[action.payload.data.from] = action.payload.senderinfo;
            return {...state,chatmsg:[...state.chatmsg,action.payload.data],users,unread:state.unread+n}
        case MSG_READ:
            const {from,num} = action.payload;
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from === v.from? true : v.read })),unread:state.unread - num}
        default:
            return state
    }
}
function msgList(msgs,users,userid){
    return {type:MSG_LIST,payload:{msgs,users,userid}}
}
function msgRecv(data,userid,senderinfo){
    return {type:MSG_RECV,payload:{data,userid,senderinfo}}
}
function msgRead({from,to,num}){
    return {type:MSG_READ,payload:{from,to,num}}
}
export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get("/user/getmsglist").then(res=>{
              if(res.status === 200 && res.data.code===0){
                  const userid = getState().user._id;
                  dispatch(msgList(res.data.msgs,res.data.users,userid))
                  let node = document.getElementById("chatme")
                  if(!node){return;}
                  node.scrollTop = node.scrollHeight;
              }
        })
    }
}
export function sendMsg({from,to,msg}){
    return (dispatch,getState)=>{
        const userid = getState().user._id;
        const senderinfo = getState().chat.users[userid];
        console.log(senderinfo)
        socket.emit("sendmsg",Object.assign({},{from,to,msg},senderinfo))
    }
}

export function getMsg(){
    return (dispatch,getState)=>{
        socket.on("getmsg",function(data,senderinfo){
            const userid = getState().user._id;
            dispatch(msgRecv(data,userid,senderinfo));
            setTimeout(function () {
                let node = document.getElementById("chatme");
                if(!node){return;}
                node.scrollTop = node.scrollHeight;
            },20)
        })
    }
}
export function readMsg(from) {
    return async (dispatch,getState)=>{
        const res = await  axios.post("/user/readmsg",{from});
        const userid = getState().user._id;
        if(res.status === 200 && res.data.code === 0){
           dispatch(msgRead({to:userid,from,num:res.data.num}))
        }
    }
}