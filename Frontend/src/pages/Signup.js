import React from "react"
import { useState, useEffect } from "react";
import "./Signup.css"
import { useNavigate } from "react-router-dom";

function Signup() {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    function handleTextChange(text) {
        setValue(text);
        setValue1(text);
        setValue2(text);
        setValue3(text);
      
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

            <div class="logoS">

            </div>

            <div id="float-label3">
                <input type="email"
                    value={value}
                    onChange={(e) => handleTextChange(e.target.value)}
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="username" >Email</label>
            </div>

            <div id="float-label4">
                <input type="username" 
                    value1={value1}
                    onChange={(e) => handleTextChange(e.target.value1)}
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="username" >Username</label>
            </div>

            <div id="float-label5">
                <input type="password"
                    value2={value2}
                    onChange={(e) => handleTextChange(e.target.value2)} 
                />  
                <label className={ isActive ? "Active" : ""} htmlFor="password" >Password</label>
            </div>

            <div id="float-label6">
                <input type="password" 
                    value3={value3}
                    onChange={(e) => handleTextChange(e.target.value3)}
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
