import React from 'react'
import io from 'socket.io-client'
import {List, InputItem, NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import {  sendMsg,getMegList,recvMsg } from '../../redux/chart.redux'
const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {sendMsg,getMegList,recvMsg}
)



class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      text: "",
      msg:[],
    }
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length) {
      this.props.getMegList();
      this.props.recvMsg();
    }
  }

  handleSubmit(){
    // socket.emit('sendmsg',{text: this.state.text})
    // this.setState({text: ''})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg(from,to,msg)
    this.setState({text:''})
  }

  render(){
    const userid = this.props.match.params.user
    const Item = List.Item
    return (
      <div id="chat-page">
        <NavBar mode='dark'>
          {this.props.user.user}
        </NavBar>
      {this.props.chat.chatmsg.map(v=>{
        console.log(v.from === userid)
        console.log(v.from, userid)
        return v.from === userid ? (
          <List key={v._id}>
            <Item>
              {v.content}
            </Item>
          </List>
        ) : (
          <List key={v._id}>
            <Item 
              extra={'avatar'}
              className='chat-me'>
              {v.content}
            </Item>
          </List>
        )
         
      })}
      
      <div className="stick-footer">
        <List>
          <InputItem
            placeholder='please input your message'
            value={this.state.text}
            onChange={
              v=>{
                  this.setState({text: v})
              }
            }
            extra={<span onClick={()=>this.handleSubmit()}>Send</span>}
          ></InputItem>
        </List>
      </div>
      </div>
    )
  }
}
export default Chat