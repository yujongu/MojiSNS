import React from "react"
import { useState, useEffect } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";






function Login() {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');

    function handleTextChange(text) {
        setValue(text);
        setValue1(text);
      
        if (text !== '') {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
    }

    return(

        <React.Fragment>
        
            <div class="background">

            </div>

            <div class="box">

            </div>

            <div class="logoL">

            </div>

            <div class="welcomeL">
                <p1>Welcome back!</p1>
            </div>

            <div id="float-label">
                <input type="username"
                        value={value}
                        onChange={(e) => handleTextChange(e.target.value)}
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="username" >Username</label>
            </div>

            <div id="float-label2">
                <input type="password"
                        value1={value1}
                        onChange={(e) => handleTextChange(e.target.value1)}
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="password" >Password</label>
            </div>

            <div class="loginL">
                <button class="loginBL">Log In</button>
            </div> 

            <div class="forgotpsw">
                <p3>Forgot password?</p3>
            </div>

        </React.Fragment>
    );
}

export default Login;