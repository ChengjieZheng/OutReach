import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter

class UserCard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(v){
    this.props.history.push(`/chat/${v._id}`)
  }

  render(){
    const userList = this.props.userList
    return (
      <WingBlank>
      <WhiteSpace></WhiteSpace>
        {userList.map(v=>(
          v.avatar 
          ?
          ( 
            <div>
              <Card 
                key={v._id}
                onClick={()=>this.handleClick(v)}
                >
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
              <WhiteSpace></WhiteSpace>
            </div>
            )
          :
          null
        ))}
      </WingBlank>

    )
  }
}

export default UserCard