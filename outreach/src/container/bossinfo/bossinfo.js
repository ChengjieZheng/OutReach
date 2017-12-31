import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

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
    return (
      <div>
      <NavBar mode="dark">BOSS Information</NavBar>
      <AvatarSelector
       //when user select avatar, add avatar name to state
        selectAvatar={(imgname)=>{
          this.setState({
            avatar: imgname
          })
        }}
      ></AvatarSelector>
      <InputItem onChange={(value) => this.onChange('title', value)}>
        Position:
      </InputItem>
      <InputItem onChange={(value) => this.onChange('companyName', value)}>
        CName:
      </InputItem>
      <InputItem onChange={(value) => this.onChange('salay', value)}>
        Salary:
      </InputItem>
      <TextareaItem 
      onChange={(value) => this.onChange('discription', value)}
      rows={3}
      autoHeight
      title='Discription:'
      >
      </TextareaItem>
      <Button type='primary'>Save</Button>
      </div>
    )
  }
}

export default BossInfo