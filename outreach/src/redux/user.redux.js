import axios from 'axios';
import {getRedirectPath} from '../util';

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const UPDATE_DATA = 'UPDATE_DATA'

const initState={
  redirectTo:'',
  // isAuth:false,
  msg: '',
  user: '',
  type: '',
}


export function user(state=initState, action) {
  switch(action.type) {
    // case REGISTER_SUCCESS:
    //   return {...state, msg:'', redirectTo:getRedirectPath(action.payload),isAuth: true,...action.payload}
    // case LOGIN_SUCCESS:
    //   return {...state, msg:'', redirectTo:getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case AUTH_SUCCESS:
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload),...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, msg:action.msg}
    default:
      return state
    
  }
}

// function registerSuccess(data) {
//   return {type: REGISTER_SUCCESS, payload: data}
// }

function authSuccess(data) {
  return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg(msg) {
  return {msg, type: ERROR_MSG}
}

// function loginSuccess(data) {
//   return {type: LOGIN_SUCCESS, payload: data}
// }

export function update(data) {
  return dispatch=>{
    axios.post('/user/update', data)
    .then(res=>{
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function loadData(userinfo){
  return { type: LOAD_DATA, payload: userinfo}
}

export function register({user, pwd, repeatpwd, type}){
  if (!user || !pwd || !type) {
    return errorMsg('Please put your username and password')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('The passwrods are not the same')
  }

  //redux thunk返回函数的写法，而且是异步操作
  return dispatch=>{
    axios.post('/user/register',{user, pwd, type})
    .then(res=>{
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }    
}

export function login({user, pwd}){
  if (!user || !pwd) {
    return errorMsg('Please put your username and password')
  }

  //redux thunk返回函数的写法，而且是异步操作
  return dispatch=>{
    axios.post('/user/login',{user, pwd})
    .then(res=>{
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }    
}