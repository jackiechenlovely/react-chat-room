import axios from "axios"
import {getRedirectPath} from "../util"
import {Toast} from "antd-mobile";

const AUTH_SUCCESS = "AUTH_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOADDATA = "LOADDATA";
const LOGOUT = "LOGOUT";
const initState = {
    redirectTo:"",
    msg:"",
    username:'',
    qq:"",
    type:""
}
//reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOADDATA:
            return {...state,...action.payload,redirectTo:getRedirectPath(action.payload)}
        case LOGOUT:
             return {...initState,redirectTo:""}
        default:
            return state;
    }
}
function authSuccess(data){
    const {password,...result} = data;
    return {type:AUTH_SUCCESS,payload:result}
}
function errorMsg(msg){
    Toast.info(msg, 1);
    return {msg,type:ERROR_MSG}
}
export function loadData(userinfo) {
    return {type:LOADDATA,payload:userinfo}
}
//action
export function register({username,password,repeatpassword,type,qq}){
    if(!username || !password || !type){
        return errorMsg("用户名密码必须输入")
    }
    if(password !== repeatpassword){
        return errorMsg("密码和确认密码不同")
    };
    if(!qq){
        return errorMsg("一定要填写自己的QQ哦☺☺")
    }
    return dispatch=>{
        axios.post("/user/register",{
            username,password,type,qq
        }).then(res=>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
//logout
export function logoutSubmit(){
    return {type:LOGOUT}
}

//login
export function login({username,password}) {
     if(!username || !password){
         return errorMsg("用户名和密码必须输入")
     };
     return dispatch =>{
         axios.post("/user/login",{
             username,password
         }).then(res=>{
             if(res.status === 200 && res.data.code === 0){
                 dispatch(authSuccess(res.data.data));
             }else{
                 dispatch(errorMsg(res.data.msg))
             }
         })
     }
}
//update
export function update(data,type){
    let {title,company, money, desc, avater} = data;
    if(avater.trim().length ===0)return errorMsg("请选择头像");
    if(type === "boss"){
        if(title.trim().length ===0)return errorMsg("请输入招聘职位");
        if(company.trim().length ===0)return errorMsg("请输入公司名称");
        if(money.trim().length ===0)return errorMsg("请输入职位薪资");
        if(desc.trim().length ===0)return errorMsg("请输入职位要求");
    }else if(type === 'genius'){
        if(title.trim().length ===0)return errorMsg("请输入求职岗位");
        if(desc.trim().length ===0)return errorMsg("请输入个人简介");
    };
    return dispatch=>{
        axios.post("/user/update",data).then(res=>{
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
