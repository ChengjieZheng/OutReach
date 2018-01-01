import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state=>state.chatuser,
  {getUserList}
)


class Boss extends React.Component{
  componentDidMount() {
    this.props.getUserList('genius')
  }

  render(){
    return (
      <WingBlank>
        <UserCard userList={this.props.userList}></UserCard>
      </WingBlank>
    )
  }
}

export default Boss
