import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvataSelector extends React.Component{
  //组件传入时的类型检测，must be function and is required
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const avatarList = '1,2,3,4,5,6,7,8'
                        .split(',')
                        .map(value=>({
                          icon:require(`../img/${value}.jpg`),
                          text:value
                        }))
    //get current selected avatar
    const gridHeader = this.state.text
                       ?
                       (
                         <div>
                           <span>selected: </span>
                           <img style={{width: 20}} src={this.state.icon} alt={this.state.text}/>
                         </div>
                       )
                       :
                       'Please select an avatar'
    return (
      <div id="avatar-selector-display">
        <List renderHeader={()=>gridHeader}>
          <Grid 
          data={avatarList} 
          columnNum={4}
          onClick={elm => {
            this.setState(elm)
            //when user select avatar, add avatar name to state
            this.props.selectAvatar(elm.text)}}
          /> 
        </List>
      </div>
    )
  }
}

export default AvataSelector