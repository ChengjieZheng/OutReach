import React from 'react'
import {NavBar, InputItem, TextareaItem, Button, List, WhiteSpace, WingBlank} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {update} from '../../redux/user.redux'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title: "",
      companyName: "",
      salay: "",
      discription: "",
    }
  }
  onChange(key, value) {
    this.setState({[key]: value})
  }

  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {/* 防治重复定向的报错信息 */}
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">BOSS Information</NavBar>
        <AvatarSelector
        //when user select avatar, add avatar name to state
          selectAvatar={(imgname)=>{
            this.setState({
              avatar: imgname
            })
          }}
        ></AvatarSelector>
        <WingBlank>
          <List>
            <InputItem onChange={(value) => this.onChange('title', value)}>
              Position:
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={(value) => this.onChange('companyName', value)}>
              CName:
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={(value) => this.onChange('salay', value)}>
              Salary:
            </InputItem>
            <WhiteSpace />
            <TextareaItem 
              onChange={(value) => this.onChange('discription', value)}
              rows={3}
              autoHeight
              title='Discription:'
            >
            </TextareaItem>
          </List>
          <Button 
            type='primary'
            onClick={()=>this.props.update(this.state)}
          >Save</Button>
        </WingBlank>
      </div>
    )
  }
}

export default BossInfo