import React from 'react'
import './LoginReg.css'

import UserIcon from '../components/Assets/UserIcon.png'
import PasswordIcon from '../components/Assets/PasswordIcon.png'


const LoginReg = () => {
    return (
        <>
            <div className = "welcome-header">
                Welcome to Notion 2.0
            </div>
            <div className='container'>
                <div className="header">
                    <div className="text"> Sign Up</div>
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
                    <div className="submit"> Sign Up </div>
                    <div className="submit" > Log in </div>
                </div>
            </div>
        </>
    )
}

export default LoginReg