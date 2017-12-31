import React from 'react'
import axios from 'axios'
//display this.props.history
import {withRouter} from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux';
@withRouter
@connect(
  null,
  { loadData }
)

class AuthRoute extends React.Component{

    
    componentDidMount(){
      //已经是注册页了，那就不用管了
      const publicList = ['/login', '/register']
      const pathname = this.props.location.pathname;
      if (publicList.indexOf(pathname) > -1) {
        return null
      }
      //get user data
      axios.get('/user/info')
      .then(res => {
        if(res.status === 200) {
          if(res.data.code === 0) {
            // this.props.history.push('/Boss')
            this.props.loadData(res.data.data);
          } else {
            //没有登入信息就跳转
            this.props.history.push('/login')
          }
        }
      })
      //is login?

      //现在的url 地址
      // login是不需要跳转的

      // 用户的type，身份是boss还是牛人

      // 用户是否完善信息（选择头像，个人简介）
    }

    render(){
        return null
    }
}

export default AuthRoute