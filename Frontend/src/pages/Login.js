import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");

  function handleTextChange(text) {
    setValue(text);
    setValue1(text);

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

        <div className="usernameTextbox" id="float-label">
          <input
            type="username"
            value={value}
            onChange={(e) => handleTextChange(e.target.value)}
          ></input>
          <label className={isActive ? "Active" : ""} htmlFor="username">
            Username
          </label>
        </div>

        <div className="passwordTextbox" id="float-label2">
          <input
            type="password"
            value1={value1}
            onChange={(e) => handleTextChange(e.target.value1)}
          ></input>
          <label className={isActive ? "Active" : ""} htmlFor="password">
            Password
          </label>
        </div>

        <div className="loginL">
          <button className="loginBL">Log In</button>
        </div>

        <div className="forgotpsw">
            <p>Forgot Password?</p>
        </div>
      </div>
    </main>
  );
}

export default Login;
