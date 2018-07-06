import React from "react"
import Logo from "../../component/logo/logo"
import {List,InputItem,WhiteSpace,Button,WingBlank} from "antd-mobile"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {login} from "../../redux/user.redux"
import jackieForm from "../../component/jackieform/jackieform"
@connect(
    state=>state.user,
    {login}
)
@jackieForm
class Login extends React.Component{
    constructor(props){
         super(props);
         this.register = this.register.bind(this);
         this.login = this.login.bind(this);
    }
    register(){
        this.props.history.push("/register")
    }
    login(){
        this.props.login(this.props.state)

    }
    render(){
        return <div>
            <Logo></Logo>
            {this.props.redirectTo && this.props.redirectTo !== '/login'? <Redirect to={this.props.redirectTo}></Redirect>:null}
            <List>
                <InputItem onChange={v => this.props.handleChange("username",v)}>
                    用户名
                </InputItem>
                <InputItem onChange={v => this.props.handleChange("password",v)}>
                    密码
                </InputItem>
            </List>
            <WingBlank>
                <Button type={"primary"} onClick={this.login}>登陆</Button>
                <WhiteSpace/>
                <Button onClick={this.register} type={"primary"}>注册</Button>
            </WingBlank>
        </div>
    }
}
export default Login;