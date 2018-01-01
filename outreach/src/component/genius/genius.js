import React from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
@connect(
  state=>state.chatuser,
  {getUserList}
)


class Genius extends React.Component{
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render(){
    return (
      <WingBlank>
        {this.props.userList.map(v=>(
          v.avatar 
          ?
          <div key={v._id}>
            <Card>
              <Card.Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.jpg`)}
                extra={<span>{v.title}</span>}
              ></Card.Header>
              <Card.Body>
                {v.desc.split('\n').map(v=>(
                  <div key={v}>{v}</div>
                ))}
              </Card.Body>
            </Card>
            <WhiteSpace/>
          </div>
          :
          null
        ))}
      </WingBlank>
    )
  }
}

export default Genius
