import React from "react"
import {connect} from "react-redux"
import {register} from "../../redux/user.redux";
import Logo from "../../component/logo/logo"
import {Redirect} from "react-router-dom"
import {List,InputItem,Radio,WhiteSpace,Button,WingBlank} from "antd-mobile"
import jackieForm from "../../component/jackieform/jackieform"
@connect(
    state => state.user,
    {register}
)
@jackieForm
class Register extends React.Component{
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    register(){
        this.props.register(this.props.state)
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return <div>
            <Logo></Logo>
            {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
            <List>
                <InputItem ref={"username"} onChange={v=>this.props.handleChange("username",v)}>登陆名</InputItem>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.props.handleChange("password",v)}>密码</InputItem>
                <WhiteSpace/>
                <InputItem onChange={(v)=>this.props.handleChange("repeatpassword",v)}>确认密码</InputItem>
                <WhiteSpace/>
                <InputItem onChange={v=>this.props.handleChange("qq",v)}>QQ</InputItem>
                <WhiteSpace/>
                <RadioItem checked={this.props.state.type === 'genius'} onChange={(v)=>this.props.handleChange("type","genius")}>小萝莉</RadioItem>
                <WhiteSpace/>
                <RadioItem checked={this.props.state.type === 'boss'} onChange={(v)=>this.props.handleChange("type","boss")}>霸道总裁</RadioItem>
                <WhiteSpace/>
            </List>
            <WingBlank>
                <Button type={"primary"} onClick={this.register.bind(this)}>注册</Button>
            </WingBlank>
        </div>
    }
}
export default Register;