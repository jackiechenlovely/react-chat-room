import React from "react"
import { NavBar,InputItem,TextareaItem,Button} from "antd-mobile"
import AvaterSelect from "../../component/avaterselect/avaterselect"
import {Redirect,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {update} from "../../redux/user.redux"
@withRouter
@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            desc:"",
            avater:""
        }
    }
    changeHandle(key,val){
        this.setState({
            [key]:val
        })
    }
    saveHandle(){
        this.props.update(this.state,this.props.type)
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return <div>
            { path !== redirect ? <Redirect to={redirect}></Redirect>:null}
            <NavBar mode="dark">萝莉完善信息页</NavBar>
            <AvaterSelect selectAvater={(imageName)=>{this.setState({
                avater:imageName
            })}}></AvaterSelect>
            <InputItem onChange={v => this.changeHandle("title",v)}>求职岗位</InputItem>
            <TextareaItem
                autoHeight
                onChange={v => this.changeHandle("desc",v)}
                rows={3}
                title="个人简介"
            />
            <Button type={"primary"} loading={false} onClick={this.saveHandle.bind(this)}>保存</Button>
        </div>
    }
}
export default GeniusInfo;