import React from 'react'
import './logo.css'
class Logo extends React.Component{
    render(){
        return (
            <div className="logo-container">
                <img src={require('../img/logo.png')} alt="Logo"/>
            </div>
        )
    }
}
export default Logo