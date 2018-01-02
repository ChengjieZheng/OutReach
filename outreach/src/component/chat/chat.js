import React from 'react'
import io from 'socket.io-client'
import {List, InputItem, NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import {  sendMsg } from '../../redux/chart.redux'
const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {sendMsg}
)



class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      text: "",
      msg:[],
    }
  }
  componentDidMount() {
    // socket.on('recvmsg', (data) => {
    //   console.log(data);
    //   this.setState({
    //     msg:[...this.state.msg, data.text]
    //   })
    // })

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
    const user = this.props.match.params.user
    const Item = List.Item
    console.log(this.props)
    return (
      <div id="chat-page">
        <NavBar mode='dark'>
          {this.props.user.user}
        </NavBar>
      {this.props.chat.chatmsg.map(v=>{
        return v.from === user ? (
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