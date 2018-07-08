import React from "react"
import PropTypes from "prop-types"
import {TabBar} from "antd-mobile"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import "./css/navlink.css"
@withRouter
@connect(
    state=>state
)
class Navlink extends React.Component{
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    constructor(props){
        super(props)
        this.state = {
            selectedTab:"blueTab"
        }
    }
    render(){
        const {pathname} = this.props.location;
        const navList = this.props.data.filter(item=>!item.hide)
        return (
            <TabBar>
                {navList.map(item=>(
                    <TabBar.Item  icon={<div><img src={item.img} alt={item.img}/></div>}
                        selectedIcon={<div><img src={item.imgactive} alt={item.imgactive}/></div>}
                        badge={item.path === '/msg'?this.props.chat.unread:0}
                        title={item.text ==='boss'?'霸道总裁':item.text === 'genius'?'求职者': item.text}
                        key={item.text}
                        selected={pathname === item.path}
                        onPress={() => {
                            this.props.history.push(item.path)
                        }}
                    ></TabBar.Item>
                ))}
            </TabBar>
        )
    }
}
export default Navlink;