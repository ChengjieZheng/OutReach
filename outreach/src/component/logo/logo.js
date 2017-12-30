import React from 'react'
import logoImg from './Screen Shot 2017-12-30 at 12.50.15 AM.png'
import './logo.css'
class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}
export default Logo