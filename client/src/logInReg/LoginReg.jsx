import React, { useState } from 'react';
import './LoginReg.css'

import UserIcon from '../components/Assets/UserIcon.png'
import PasswordIcon from '../components/Assets/PasswordIcon.png'


const LoginReg = () => {

    const[action,setAction] = useState("Sign Up");
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    //synchronize input fields with component state
    const handleUserN = (event) => {
        setUsername(event.target.value);
    }
    
    //synchronize input fields with component state
    const handlePassW = (event) => {
        setPassword(Event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (action== "Sign Up") {
            //logic for sign up, API calls to backend
        } else {
            //Logic for login, API calls to backend
        }
    }
    return (
        <>
            <div className = "welcome-header">
                Welcome to Notion 2.0
            </div>
            <div className='container'>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <img src={UserIcon} alt="" />
                        <input type="text" placeholder="Name" />
                    </div>
                    <div className="input">
                        <img src={PasswordIcon} alt="" />
                        <input type="password" placeholder="password" />
                    </div>
                </div>
                <div className="submit-container">
                    <div className= {action == "Sign Up"?"submit gray":"submit"} onClick = {()=>{setAction("Sign Up")}}> Sign Up </div>
                    <div className={action == "Login"?"submit gray":"submit"} onClick = {()=>{setAction("Login")}} > Log in </div>
                </div>
            </div>
        </>
    )
}

export default LoginReg