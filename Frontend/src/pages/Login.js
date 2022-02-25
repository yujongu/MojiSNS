import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleTextChange = (e) => {
    console.log(e.target)
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
    if (e.target.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      alert("Please enter your username");
    } else {
      if (password === "") {
        alert("Please enter your password");
      } else {
        // const response = await axios.get(
        //   `http://localhost:5000/api/user/login/${username}/${password}`
        // );
        // console.log(response);
        navigate("/home");

      }
    }
  };

  return (
    <main className="loginMain">
      <form onSubmit={handleSubmit}>
        <div className="loginContainer">
          <div class="logo"></div>
          <p className="welcomeL">Welcome back!</p>

          <div id="float-label">
            <input
              type="text"
              value={username}
              onChange={(e) => handleTextChange(e)}
              name="username"
            ></input>
            <label className={isActive ? "Active" : ""} htmlFor="username">
              Username
            </label>
          </div>

          <div id="float-label2">
            <input
              type="password"
              value={password}
              onChange={(e) => handleTextChange(e)}
              name="password"
            ></input>
            <label className={isActive ? "Active" : ""} htmlFor="password">
              Password
            </label>
          </div>

          <div className="loginL">
            <button type="submit" className="login">
              Log In
            </button>
          </div>

          <div className="forgotpsw">
            <p>Forgot Password?</p>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
