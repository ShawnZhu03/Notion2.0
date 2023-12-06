import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginReg.css'
import UserIcon from '../components/Assets/UserIcon.png'
import PasswordIcon from '../components/Assets/PasswordIcon.png'
import axios from 'axios'


const LoginReg = () => {

    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //synchronize input fields with component state
    const handleUserN = (event) => {
        setUsername(event.target.value);
    }

    //synchronize input fields with component state
    const handlePassW = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = action === "Sign Up" ? '/signup' : '/login';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        try {
            const response = await fetch(`http://localhost:5001${endpoint}`, requestOptions);
            const data = await response.json();
            console.log(response);

            if (response.ok) {
                localStorage.setItem("username", username);
                navigate('/MainPage');
                
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <>
            <div className="welcome-header">
                Welcome to Notion 2.0
            </div>
            <div className='container'>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <form className="inputs" onSubmit={handleSubmit}>
                    <div className="input">
                        <img src={UserIcon} alt="" />
                        <input
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <img src={PasswordIcon} alt="" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submit-container">
                        <button type="submit">{action}</button>
                    </div>
                </form>
                <div className="switch-action">
                    <span onClick={() => setAction(action === "Sign Up" ? "Login" : "Sign Up")}>
                        {action === "Sign Up" ? "Already have an account? Log in" : "Need an account? Sign Up"}
                    </span>
                </div>
            </div>
        </>
    );
};


export default LoginReg