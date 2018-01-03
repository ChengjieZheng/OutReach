import React from 'react'
import io from 'socket.io-client'
import {List, InputItem, NavBar,Icon,Grid} from 'antd-mobile'
import { connect } from 'react-redux'
import {  sendMsg,getMegList,recvMsg } from '../../redux/chart.redux'
import {getChatId} from '../../util'

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
      showEmoji : false,
    }
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length) {
      this.props.getMegList();
      this.props.recvMsg();
    }
    // this.fixCarousel()
    
  }

  fixCarousel(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }


  handleSubmit(){
    // socket.emit('sendmsg',{text: this.state.text})
    // this.setState({text: ''})
    console.log("this.props: ", this.props)
    const from = this.props.user._id
    console.log("from: ", from)
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})

  }

  

  render(){

    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗'
                  .split(' ')
                  .filter(v=>v)
                  .map(v=>({text: v}))


    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if(!users[userid]){
      return null;
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid === chatid)
    return (
      <div id="chat-page">
        <NavBar 
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.goBack()}}
          mode='dark'>
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v=>{
        const avatar = require(`../img/${users[v.from].avatar}.jpg`)
        return v.from === userid ? (
          <List key={v._id}>
            <Item
              thumb = {avatar}
            >
              {v.content}
            </Item>
          </List>
        ) : (
          <List key={v._id}>
            <Item 
              extra={<img src={avatar}/>}
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
            extra={
              <div>
                <span
                  style={{marginRight:15}}
                  onClick={
                    ()=>{
                      this.setState({showEmoji: !this.state.showEmoji})
                      this.fixCarousel()
                    }
                  }
                >😍</span>
                <span onClick={()=>this.handleSubmit()}>Send</span>
              </div>
              
            }
          ></InputItem>
        </List>
        {this.state.showEmoji ? 
          <Grid 
            data = {emoji}
            columnNum = {9}
            carouselMaxRow = {4}
            isCarousel = {true}
            onClick = {(e)=>{    
              const selectEmoji = e.text;
              this.setState({text:this.state.text + selectEmoji});
              }
            }
          />
          : 
          null
          } 
        
      </div>
      </div>
    )
  }
}
export default Chat