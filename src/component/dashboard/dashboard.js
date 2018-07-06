import React,{Component} from "react"
import {NavBar} from "antd-mobile"
import Navlink from "../navlink/navlink"
import {connect} from "react-redux"
import {Switch,Route} from "react-router-dom"
import Boss from "../boss/boss"
import Genius from "../genius/genius"
import User from "../user/user"
import Msg from "../msg/msg"
import {getMsgList,sendMsg,getMsg} from "../../redux/chart.redux"
// @overwriteHello  属性代理
// class Hello extends React.Component{
//     render(){
//         return <h2>hello imooc</h2>
//     }
// }
// function overwriteHello(Comp){
//     class WrapComp extends React.Component{
//         render(){
//             return (
//                 <div>
//                      <p>这是特哟的元素</p>
//                     <Comp></Comp>
//                 </div>
//             )
//         }
//     }
//     return WrapComp
// }
@connect(
    state => state,
    {getMsgList,sendMsg,getMsg}
)


class Dashboard extends Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.getMsg();
        }
    }
     render(){
         const pathname = this.props.location.pathname;
         const user = this.props.user;
         const navList = [
             {
                 path:"/boss",
                 text:"求职者",
                 icon:"boss",
                 title:"职员列表",
                 component:Boss,
                 hide:user.type === 'genius'
             },{
                 path:"/genius",
                 text:"boss",
                 icon:"job",
                 title:"总裁列表",
                 component:Genius,
                 hide:user.type === 'boss'
             },{
                 path:"/msg",
                 text:"消息",
                 icon:"msg",
                 title:"消息列表",
                 component:Msg,
             },{
                 path:"/user",
                 text:"个人中心",
                 icon:"user",
                 title:"个人中心",
                 component:User
             }

         ];
         return navList.find(item=>item.path === pathname)?<div>
             <NavBar mode="dark" className='fixd-header'>{navList.find(item=>item.path === pathname).title}</NavBar>
             <Switch>
                 { navList.map(item=>(
                     <Route key={item.path} path={item.path} component={item.component}></Route>
                 ))}
             </Switch>
             <Navlink data={navList}></Navlink>
         </div>:null
     }
}
export default Dashboard;