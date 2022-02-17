import React from "react"
import { useState, useEffect } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";




function Login() {
    const [isActive, setIsActive] = useState(false);
    

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
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="username" >Username</label>
            </div>

            <div id="float-label2">
                <input type="password" 
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