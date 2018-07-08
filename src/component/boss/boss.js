import React from "react"
import {getUserList} from "../../redux/chartuser.redux";
import {connect} from "react-redux"
import UserCard from "../usercard/usercard"

@connect(
    state=>state,
    {getUserList}
)
class Boss extends React.Component{
    componentWillMount(){
        if(this.props.user.type === "genius"){
            this.props.history.push("/boss")
        }
    }
    componentDidMount(){
        if(!this.props.chartuser.userList.length){
            this.props.getUserList('genius');
        }
    }
    render(){
        const UserLsit = this.props.chartuser.userList;
        return (
            <UserCard userList={UserLsit}></UserCard>
        )
    }
}
export default  Boss;