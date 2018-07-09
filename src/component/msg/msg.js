import React from "react"
import {connect} from "react-redux"
import {List,Badge} from "antd-mobile"
import {formatContent} from "../../util";
@connect(
    state=>state
)
class Msg extends React.Component{
    getLast(arr){
       return arr[arr.length-1]
    }
    render(){
        // if(!this.props.chat.chatmsg.length){return;}
        const userid = this.props.user._id;
        const Item = List.Item;
        const Brief = Item.Brief;
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        const users = this.props.chat.users;
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const alast = this.getLast(a).createtime;
            const blast = this.getLast(b).createtime;
            return blast - alast;
        });
        return  <div>
            {chatList.map( (v) => {
                   const lastItem = this.getLast(v);
                   const unreadNum = v.filter(item=>!item.read && item.to === userid).length;
                   const user = users[lastItem.from===userid ? lastItem.to:lastItem.from];
                   if(!user){return null;}
                   if(lastItem){
                   return (<List key={lastItem.chatid}>
                       <Item
                           extra={<Badge text={unreadNum}></Badge>}
                           thumb={require(`../img/${user.avater}.jpg`)}
                           arrow="horizontal"
                           onClick={()=>{
                               this.props.history.push(`/chartroom/${ userid === lastItem.from ? lastItem.to : lastItem.from}`)
                           }}
                       >
                           <div dangerouslySetInnerHTML={{__html:formatContent(lastItem.content)}}></div>
                           <Brief>msg from {users[lastItem.from].username}</Brief>
                       </Item>
                   </List>)
                   }
                   return null;
               }
            )}
        </div>

    }
}
export default Msg;