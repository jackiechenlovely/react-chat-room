import React from "react"
import {getUserList} from "../../redux/chartuser.redux";
import UserCard from "../usercard/usercard"
import {connect} from "react-redux"
import{Redirect} from "react-router-dom"
@connect(
    state=>state,
    {getUserList}
)
class Genius extends React.Component{
    componentWillMount(){
        if(this.props.user.type === "boss"){
            return <Redirect to={"/boss"}></Redirect>
        }
    }
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