import React from "react"
import { useState, useEffect } from "react";
import "./Signup.css"
import { useNavigate } from "react-router-dom";

function Signup() {
    const [isActive, setIsActive] = useState(false);


    return(

        <React.Fragment>
        
            <div class="background">

            </div>

            <div class="box">

            </div>

            <div class="logoS">

            </div>

            <div id="float-label3">
                <input type="email" 
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="username" >Email</label>
            </div>

            <div id="float-label4">
                <input type="username" 
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="username" >Username</label>
            </div>

            <div id="float-label5">
                <input type="password" 
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="password" >Password</label>
            </div>

            <div id="float-label6">
                <input type="confirmpsw" 
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="confirmpsw" >Confirm Password</label>
            </div>


            <div class="signupS">
                <button class="signupBS">Sign Up</button>
            </div> 

        </React.Fragment>
    );
}

export default Signup;