import React from 'react';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlinkbar/navlinkbar'
import {Switch,Route} from 'react-router-dom'
import Boss from '../boss/boss'

function Genius() {
  return <h2>Genius首页</h2>
}

function Msg() {
  return <h2>消息列表</h2>
}

function User() {
  return <h2>个人中心</h2>
}

@connect(
  state=>state
)

class Dashboard extends React.Component{
  
  render(){
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: 'Genius',
        icon: 'job',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'boss',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: 'Message',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: 'Me',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ]

    return (
      <div>   
        <NavBar className='fixed-header' mode='dard'>{navList.find(v=>v.path===pathname).title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.title} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>

    )
  }
}

export default Dashboard