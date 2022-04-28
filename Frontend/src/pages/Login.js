import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";
import { browserName } from "react-device-detect";

function Login() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleTextChange = (e) => {
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

  function functionForget() {
    console.log(document.getElementById("emailInput").value)
    var emailAddr = document.getElementById("emailInput").value;
    alert("The password reset email is sent!")
    const response = axios.post(`${BackendConn}user/auth/requestResetPassword/${emailAddr}`);
    response.then((response) => {
      // if (response.status === 200) {
      //   setLoading(false);
      //   setPostData(response.data);
      // } else {
      //   alert("Something Went Wrong...");
      // }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      alert("Please enter your username");
    } else {
      if (password === "") {
        alert("Please enter your password");
      } else {
        axios
          .get(`${BackendConn}user/login/${username}/${password}`)
          .then((res) => {
            console.log(res);
            if (res.data === "User not found" || res.data === "Incorrect password") {
              alert("Username or Password is not valid!");
            }
            else {
              localStorage.setItem("currentUser", JSON.stringify(res.data))
              if (window.confirm("Your login information will be saved. Is this a trustable device?")) {
                localStorage.setItem("Trustworthy", "YES")
                localStorage.setItem("BrowserName", browserName)
              } else {
                alert("Canceled");
              }
              navigate("/home");
            }
          })
          .catch((Error) => {
            alert("Username and password does not exist in our database")
          });
      }
    }
  };

  return (
    <main className="loginMain">
      <form onSubmit={handleSubmit}>
        <div className="loginContainer">
          <div className="logo"></div>
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
            <button type="submit" className="login" id="1">
              Log In
            </button>
          </div>
          <div className="footerLogin">
            <div className="cancelL">
              <a href="/">Cancel</a>
            </div>
            <div className="forgotpsw">
              <a href="?#divOne">Forget Password?</a>
            </div>
          </div>
          <div class="overlay" id="divOne">
            <div class="wrapper">
              <div class="forgetHeader">
                <h2>Please Insert Email Address</h2>
                <a href="#" class="close">&times;</a>
              </div>
              <div class="content">
                <div class="contentInsideEmail">
                  <form>
                    <label>
                      User Email
                    </label>
                    <input type="textF" placeholder="Your Email Address" id="emailInput">
                    </input>
                    <button type="submitF" onClick={functionForget}>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Login;
