import React,{Component} from "react"
import {NavBar} from "antd-mobile"
import Navlink from "../navlink/navlink"
import {connect} from "react-redux"
import {Route} from "react-router-dom"
import Boss from "../boss/boss"
import Genius from "../genius/genius"
import User from "../user/user"
import Msg from "../msg/msg"
import {getMsgList,sendMsg,getMsg} from "../../redux/chart.redux"
import QueueAnim from "rc-queue-anim"

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
        };
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
                 img:"https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
                 imgactive:"https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
                 component:Boss,
                 hide:user.type === 'genius'
             },{
                 path:"/genius",
                 text:"boss",
                 icon:"job",
                 title:"总裁列表",
                 img:"https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg",
                 imgactive:"https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg",
                 component:Genius,
                 hide:user.type === 'boss'
             },{
                 path:"/msg",
                 text:"消息",
                 icon:"msg",
                 title:"消息列表",
                 component:Msg,
                 img:"https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg",
                 imgactive:"https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg",
             },{
                 path:"/user",
                 text:"个人中心",
                 icon:"user",
                 title:"个人中心",
                 component:User,
                 img:"https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg",
                 imgactive:"https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg",
             }

         ];
         const page = navList.find(v=> v.path === pathname);
         if(!page){return null}
         //让动画生效 只渲染一个Route 根据当前组件
         return <div>
             <NavBar mode="dark" className='fixd-header'>{page.title}</NavBar>
             <div>
                 <QueueAnim type="scaleX" duration={800}>
                     <Route key={page.path} path={page.path} component={page.component}></Route>
                 </QueueAnim>
             </div>
             <Navlink data={navList}></Navlink>
         </div>
     }
}
export default Dashboard;