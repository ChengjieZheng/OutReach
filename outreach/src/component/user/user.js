import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace } from 'antd-mobile'
@connect(
  state=>state.user
)

class User extends React.Component{
  render(){
    console.log(this.props)
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief
    // if we can not get user information, we can return null first
    return props.user ? (
      <div>
        <Result 
          img = {<img src={require(`../img/${this.props.avatar}.jpg`)} style={{width:60}} alt=""/>}
          title={this.props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={()=>'简介'}>
          <Item
            multipleLine
          >
            {props.title}
            {props.desc.split('\n').map(v=>(<Brief key={v}>{v}</Brief>))}
            {props.money ? <Brief>Sarlay: {props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item>Log Out</Item>
        </List>
      </div>
    )
    :
    null
  }
}
export default User