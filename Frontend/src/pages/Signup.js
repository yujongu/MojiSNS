import React from "react";
import { useState, useEffect } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conpsw, setConpsw] = useState("");
  const [user, setUser] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    const user = { USER_EMAIL: email, USER_USERNAME: username, USER_PW: password };
    // send the username and password to the server
    const response = await axios.post(
      "http://localhost:3010/api/user/signup", user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', response.data)
    console.log(response.data)
  };

  function handleTextChange(text) {
    setEmail(text);
    setUsername(text);
    setPassword(text);
    setConpsw(text);

    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  return (
    <main className="signupMain">
        <form onSubmit={handleSubmit}>

            <div className="signupContainer">
                <div class="logo"></div>

                <div id="float-label3">
                <input
                    type="text"
                    value={email}
                    onChange={(e) => handleTextChange(e.target.value)}
                />
                <label className={isActive ? "Active" : ""} htmlFor="username">
                    Email
                </label>
                </div>

                <div id="float-label4">
                <input
                    type="text"
                    value1={username}
                    onChange={(e) => handleTextChange(e.target.value1)}
                />
                <label className={isActive ? "Active" : ""} htmlFor="username">
                    Username
                </label>
                </div>

                <div id="float-label5">
                <input
                    type="password"
                    value2={password}
                    onChange={(e) => handleTextChange(e.target.value2)}
                />
                <label className={isActive ? "Active" : ""} htmlFor="password">
                    Password
                </label>
                </div>

                <div id="float-label6">
                <input
                    type="password"
                    value3={conpsw}
                    onChange={(e) => handleTextChange(e.target.value3)}
                />
                <label className={isActive ? "Active" : ""} htmlFor="conpsw">
                    Confirm Password
                </label>
                </div>

                <div class="signupS">
                    <button 
                        type="submit"
                        onClick={() => {
                            navigate("/signup/bio")
                        }}    >Sign Up</button>
                </div>
                
            </div>
        </form>
    </main>
  );
}

export default Signup;
