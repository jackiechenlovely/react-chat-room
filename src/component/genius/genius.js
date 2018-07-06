import React from "react"
import {getUserList} from "../../redux/chartuser.redux";
import UserCard from "../usercard/usercard"
import {connect} from "react-redux"
@connect(
    state=>state,
    {getUserList}
)
class Genius extends React.Component{
    componentDidMount(){
        this.props.getUserList('boss');
    }
    render(){
        const UserLsit = this.props.chartuser.userList;
        return (
            <UserCard userList={UserLsit}></UserCard>
        )
    }
}
export default Genius;