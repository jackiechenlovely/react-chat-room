import React from "react"
import {Card,WingBlank,WhiteSpace} from "antd-mobile"
import PropTypes from "prop-types"
import {withRouter} from "react-router-dom"
@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    handleClick(v){
       this.props.history.push(`/chartroom/${v._id}`)
    }
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
        const UserLsit = this.props.userList;
        return <WingBlank>
                 <WhiteSpace></WhiteSpace>
                {UserLsit.map(v=>(
                    <Card onClick={()=>this.handleClick(v)} key={v._id}>
                        <Header title={v.username} thumb={require(`../img/${v.avater}.jpg`)}></Header>
                        <Body>
                            <div> {v.type === 'boss'? '公司名称：' + v.company:null}</div>
                            <div> 扣扣号码：{v.qq}</div>
                            <div> {v.type === 'boss'? '招聘岗位':'求职岗位'}：{v.title}</div>
                            <div> {v.type === 'boss'? '岗位要求':'个人简介'}：{v.desc.split("\n").map((item,index)=>{
                                return <span key={item}>{item}{index === v.desc.split("\n").length -1?null:"/"}</span>
                            })}</div>
                            <div> {v.type === 'boss'? '岗位薪资：'+  v.money:''}</div>
                        </Body>
                    </Card>
                ))}
            </WingBlank>
    }
}
export default UserCard;