import React from "react"
import {Result,List,Button,WingBlank,WhiteSpace,Modal} from "antd-mobile"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import Cookie from "browser-cookies"
import {logoutSubmit} from "../../redux/user.redux"
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert;
        alert('删除', '确定删除么???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                Cookie.erase("userid");
                this.props.logoutSubmit()
            }, style: { fontWeight: 'bold' } },
        ])
    }
    render(){
        const Item = List.Item;
        return this.props.username?(
            <WingBlank>
                <Result
                    img={<img  src={require(`../img/${this.props.avater}.jpg`)} alt={require(`../img/${this.props.avater}.jpg`)} style={{width:"50px"}}/>}
                    title={this.props.username}
                    message={this.props.type==='boss'? <div>{this.props.company}</div>:null}
                ></Result>
                <List renderHeader={()=> this.props.type==='boss'? "招聘简介":"求职简介"}>
                    <Item wrap multipleLine>
                       <div>{this.props.title}{this.props.type ==='boss'?this.props.money:''}</div>
                       <div>{this.props.desc}</div>
                    </Item>
                </List>
                <WhiteSpace/>
                <Button type={'primary'} onClick={this.logout}>退出登陆</Button>
            </WingBlank>
        ):<Redirect to={this.props.redirectTo}></Redirect>
    }
}

export default User;