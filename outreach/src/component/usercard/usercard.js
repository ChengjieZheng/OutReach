import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'

class UserCard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render(){
    const userList = this.props.userList
    return (
      <div>
        {userList.map(v=>(
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
                {v.type === 'boss' ? <div>Company: {v.company}</div> : null}
                {v.desc.split('\n').map(d=>(
                  <div key={d}>{d}</div>
                ))}
                {v.type === 'boss' ? <div>Salary: {v.money}</div> : null }
              </Card.Body>
            </Card>
            <WhiteSpace/>
          </div>
          :
          null
        ))}
      </div>

    )
  }
}

export default UserCard