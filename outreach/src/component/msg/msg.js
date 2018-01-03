import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
  state=>state
)

class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length - 1]
  }

  render(){
    //根据chatid对聊天进行分组????????????????????????????????????????????????
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    //get all the values
    const chatList = Object.values(msgGroup).sort((a,b) => {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    })
    const Item = List.Item;
    const Brief = Item.Brief;
    //user who logged in
    const userid = this.props.user._id
    
    return (
      <div>
        <List>
          {chatList.map(v=>{
            const LastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const userInfo = this.props.chat.users;
            const unreadNum = v.filter(list=>!list.read && list.to === userid).length
            if(!userInfo){
              return null
            }
            return (
            <Item
              thumb={require(`../img/${userInfo[targetId].avatar}.jpg`)}
              key={LastItem._id}
              extra={<Badge text={unreadNum}></Badge>}
              arrow="horizontal"
              onClick={()=>{
                this.props.history.push(`/chat/${targetId}`)
              }}
            >
            {LastItem.content}
            <Brief>{userInfo[targetId].name}</Brief>
            </Item>

          )})}
        </List>

      </div>
    )
  }
}

export default Msg