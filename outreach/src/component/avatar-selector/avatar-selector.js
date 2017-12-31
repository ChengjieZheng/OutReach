import React from 'react'
import {Grid, List} from 'antd-mobile'

class AvataSelector extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  render(){
    const avatarList = '1,2,3,4,5,6,7,8'
                        .split(',')
                        .map(value=>({
                          icon:require(`../img/${value}.jpg`),
                          text:value
                        }))
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
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid 
          data={avatarList} 
          columnNum={4}
          onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)}}
          /> 
        </List>
      </div>
    )
  }
}

export default AvataSelector