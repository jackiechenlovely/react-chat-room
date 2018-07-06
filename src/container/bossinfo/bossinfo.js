import React from "react"
import { NavBar,InputItem,TextareaItem,Button} from "antd-mobile"
import AvaterSelect from "../../component/avaterselect/avaterselect"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {update} from "../../redux/user.redux"
@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            company:"",
            money:"",
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
            {path !== redirect? <Redirect to={redirect}></Redirect>:null}
            <NavBar mode="dark">总裁完善信息页</NavBar>
            <AvaterSelect selectAvater={(imageName)=>{this.setState({
                avater:imageName
            })}}></AvaterSelect>
            <InputItem onChange={v => this.changeHandle("title",v)}>招聘职位</InputItem>
            <InputItem onChange={v => this.changeHandle("company",v)}>公司名称</InputItem>
            <InputItem onChange={v => this.changeHandle("money",v)}>职位薪资</InputItem>
            <TextareaItem
                autoHeight
                onChange={v => this.changeHandle("desc",v)}
                labelNumber={5}
                title="职位要求"
            />
            <Button type={"primary"} loading={false} onClick={this.saveHandle.bind(this)}>保存</Button>
        </div>
    }
}
export default BossInfo;