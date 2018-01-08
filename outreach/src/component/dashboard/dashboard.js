import React from 'react';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlinkbar/navlinkbar'
import {Route,Redirect} from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMegList, recvMsg} from '../../redux/chart.redux'
import QueueAnim from 'rc-queue-anim'

@connect(
  state=>state,
  {getMegList, recvMsg}
)

class Dashboard extends React.Component{
  componentDidMount(){
    if(this.props.chat.chatmsg.length === 0) {
      this.props.getMegList();
      this.props.recvMsg();
      console.log("messages from Dashboard")
    }
  }

  componentDidCatch(err, info) {
    this.setState({
      hasError: true
    })
  }

  render(){
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: 'Genius',
        icon: 'job',
        title: 'Genius',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'boss',
        title: 'BOSS',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: 'Message',
        icon: 'msg',
        title: 'Message List',
        component: Msg,
      },
      {
        path: '/me',
        text: 'Profile',
        icon: 'user',
        title: 'Profile',
        component: User,
      }
    ]
    const page = navList.find(v=>v.path === pathname)
    return (
      page ?
      (
        <div>   
          <NavBar className='fixed-header' mode='dard'>{page.title}</NavBar>
          <div style={{marginTop: 45,marginBottom: 50}}>
              <QueueAnim type="scaleX" duration={800}>
                <Route key={page.title} path={page.path} component={page.component}></Route>
              </QueueAnim> 
          </div>
          <NavLinkBar data={navList}></NavLinkBar>
        </div>
      )
      :
      <Redirect to='/msg'></Redirect>
    )
  }
}

export default Dashboard