import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  function handleTextChange(text) {
    setUsername(text);
    setPassword(text);

    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <main className="loginMain">
        <div className="loginContainer">
            <div class="logo"></div>
            <p className="welcomeL">Welcome back!</p>

            <div id="float-label">
                <input
                type="text"
                value={username}
                onChange={(e) => handleTextChange(e.target.value)}
                ></input>
                <label className={isActive ? "Active" : ""} htmlFor="username">
                Username
                </label>
            </div>

            <div id="float-label2">
                <input
                type="password"
                value1={password}
                onChange={(e) => handleTextChange(e.target.value1)}
                ></input>
                <label className={isActive ? "Active" : ""} htmlFor="password">
                Password
                </label>
            </div>

            <div className="loginL">
                <button type="submit">Log In</button>
            </div>

            <div className="forgotpsw">
                <p>Forgot Password?</p>
            </div>
        </div>
    </main>
  );
}

export default Login;
