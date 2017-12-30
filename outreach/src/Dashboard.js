import React from 'react';
import {Link, Route, Redirect} from 'react-router-dom';
import App from './App';
//需要用到redux数据时：
import { connect } from 'react-redux';
import {logout} from "./Auth.redux"

function Erying() {
  return <h2>二营</h2>
}

function Qibinglian() {
  return <h2>骑兵连</h2>
}

@connect(
  state=>state.auth,
  {logout}
)



class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){
    console.log(value.target.value)
  }

  render(){
    console.log(this.props)
    const redirectToLogin = <Redirect to='/login'></Redirect>
    const app = (
      <div>
        {this.props.isAuth ? <button onClick={this.props.logout}>logout</button> : null}
        <ul>
          <li>
            <Link to={`${this.props.match.url}/`}>一营</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/erying`}>二营</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/qibinglian`}>骑兵连</Link>
          </li> 
        </ul>
        <input type='text' onChange={this.handleChange} />
        <Route path={`${this.props.match.url}/`} exact component={App}></Route>
        <Route path={`${this.props.match.url}/erying`} component={Erying}></Route>
        <Route path={`${this.props.match.url}/qibinglian`} component={Qibinglian}></Route>
      </div>
    )

    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard;