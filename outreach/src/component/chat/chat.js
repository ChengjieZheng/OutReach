import React from 'react'
// import io from 'socket.io-client'
import {List, InputItem, NavBar,Icon,Grid} from 'antd-mobile'
import { connect } from 'react-redux'
import {  sendMsg,getMegList,recvMsg,readMsg } from '../../redux/chart.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'

// const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {sendMsg,getMegList,recvMsg,readMsg}
)

class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state={
      text: "",
      msg:[],
      showEmoji : false,
      emojiHeight: 50,
    }
    this.handleEmojiDisplay = this.handleEmojiDisplay.bind(this);
  }

  componentDidMount(){
		if (!this.props.chat.chatmsg.length) {
			this.props.getMegList()
      this.props.recvMsg()
		}

	}

  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  fixCarousel(){
    setTimeout(function(){
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  async handleEmojiDisplay() {
      await this.setState({emojiHeight: this._div.scrollHeight});
      await this.setState({showEmoji: !this.state.showEmoji});
      await this.fixCarousel();
      if (this.state.emojiHeight === 50) {
        const height=this._div.scrollHeight;
        this._div.setAttribute("style",`bottom: ${height + 95}px;`);
      } else {
        this._div.setAttribute("style",`bottom: 0px;`);
      }
  }

  handleSubmit(){
    // socket.emit('sendmsg',{text: this.state.text})
    // this.setState({text: ''})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    // handle empty message
    if(!msg){
      return;
    }
    this.props.sendMsg({from,to,msg})
    this.setState({
      text:'',
      showEmoji: false})
      this._div.setAttribute("style",`bottom: 0px;`);
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
    // console.log("chatmsgs: ", chatmsgs)
    return (
      <div id="chat-page">
        <NavBar 
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.goBack()}}
          mode='dark'>
          {users[userid].name}
        </NavBar>
        <div id="chat-page-messages">
          <QueueAnim delay={100}>
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
                  extra={<img src={avatar} alt=""/>}
                  className='chat-me'>
                  {v.content}
                </Item>
              </List>
            )
            
          })}
        </QueueAnim>
      </div> 
      <div className="stick-footer" ref={div => this._div = div}>
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
                  onClick={this.handleEmojiDisplay}
                   
                >😍</span>
                <span onClick={()=>this.handleSubmit()}>Send</span>
              </div>
              
            }
          ></InputItem>
        </List>
        {this.state.showEmoji ?
          <div id="emojiDisplay">
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
          </div>
          : 
          null
          } 
        
      </div>
      </div>
    )
  }
}
export default Chat