import React from "react"
import {Grid,List} from "antd-mobile"
import PropTypes from "prop-types"
class AvaterSelect extends React.Component{
    static propTypes = {
        selectAvater:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state ={
            avater:""
        }
    }
    render(){
        const aveterList = ["呆萌一","呆萌二","呆萌三","呆萌四"].map(v=>({
            icon:require(`../img/${v}.jpg`),
            text:v
        }))
        const gridHeader = <div style={{textAlign:"center",lineHeight:"50px",height:"50px"}}>
            {this.state.avater?(<div><span>已选择头像</span><img style={{width:20}} src={this.state.avater} alt=""/></div>): <div>请选择头像</div>}
        </div>
        return <div>
            <List renderHeader={()=> gridHeader}>
                <Grid data={aveterList} columnNum={2}
                      onClick={elm=>{ this.setState({
                          avater:elm.icon
                      }); this.props.selectAvater(elm.text)}}></Grid>
            </List>
        </div>
    }
}
export default AvaterSelect;