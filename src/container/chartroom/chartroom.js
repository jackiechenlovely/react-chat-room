import React from "react"
import {List,InputItem,NavBar,Icon,Grid} from "antd-mobile"
import {getMsgList,sendMsg,getMsg,readMsg} from "../../redux/chart.redux"
import { connect} from "react-redux"
import {getChatId,formatContent}  from "../../util";
import "./chartroom.css"
@connect(
    state=>state,
    {getMsgList,sendMsg,getMsg,readMsg}
)
class Chartroom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:"",
            showEmoji:false
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.getMsg();
        };
        let node = document.getElementById("chatme");
        if(!node){return}
        node.scrollTop = node.scrollHeight;
    }
    componentWillUnmount(){
        const id = this.props.match.params.id;
        this.props.readMsg(id);
    }
    handleSubmit(){
        const from = this.props.user._id;
        const to = this.props.match.params.id;
        const msg = this.state.text;
        if(msg.trim().length === 0){return;}
        this.props.sendMsg({from,to,msg})
        this.setState({text:"",showEmoji:false});
    }
    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event("resize"))
        })
    }
    render(){
        const id = this.props.match.params.id;
        const Item = List.Item;
        const users = this.props.chat.users;
        if(!users[id]){
            return null;
        }
        let title = users[id].type === 'boss'?'霸道总裁':"小萝莉";
        title+=users[id].username;
        const chatid = getChatId(this.props.user._id,id);
        const chatmsg = this.props.chat.chatmsg.filter(item=>item.chatid === chatid);
        let emoji = [];
        for(let i = 1;i<65;i++){
           let emojiItem = require(`../../arclist/${i}.gif`);
           emoji.push({
              text:i,
              icon:emojiItem
           })
        };
        return (
            <div className={"chatroom"} id={"chatme"}>
                <NavBar className={'chat-header'} mode="dark"
                        onLeftClick={()=>{
                            this.props.history.goBack()
                        }}
                        icon={<Icon type="left"/>}>
                    {title}
                </NavBar>
                {chatmsg.map((item,index)=> {
                    const avater = require(`../../component/img/${users[item.from].avater}.jpg`);
                    return item.from === this.props.user._id ?
                        <List key={index} className="chat-me" >
                            <Item  wrap extra={<img src={avater} alt={avater}/>}>
                                <div dangerouslySetInnerHTML={{__html:formatContent(item.content)}}>
                                </div>
                            </Item>
                        </List>
                        :
                        <List key={index}>
                            <Item wrap thumb={avater}>
                                <div dangerouslySetInnerHTML={{__html:formatContent(item.content)}}>
                                </div>
                            </Item>
                        </List>
                })}
                <div className={"inputbox"}>
                    <InputItem  placeholder={"请输入"} value={this.state.text}
                                onChange={(v)=>{ this.setState({text:v})}}
                                extra={<div className={"sendbtn"}><img onClick={
                                    (e)=>{
                                       e.stopPropagation()
                                       this.setState({ showEmoji:!this.state.showEmoji })
                                       this.fixCarousel()
                                    }
                                } style={{marginRight:"15px"}} src={require("../../arclist/1.gif")} alt=""/><span  style={{fontSize:"16px"}}>发送</span></div>}
                                onExtraClick={()=>this.handleSubmit()}>
                    </InputItem>
                    {this.state.showEmoji?<Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow ={4}
                        isCarousel={true}
                        onClick={(el)=>{
                             this.setState({
                                 text:this.state.text+`${el.text}.jpg`
                             })
                        }}
                    >
                    </Grid>:null}
                </div>
            </div>
        )
    }
}

export default Chartroom;