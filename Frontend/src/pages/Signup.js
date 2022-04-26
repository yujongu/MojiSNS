import React from "react";
import { useState, useEffect } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";

function Signup() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conpsw, setConpsw] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (password !== conpsw) {
      alert("Password do not match!!");
    } else {
      //check email format with regex
      if (!emailRegExp.test(email)) {
        alert("Email format seems wrong!");
      } else {
        //check if email exists
        const response = await axios.get(
          `${BackendConn}user/getUserByEmail/${email}`
        );
        if (response.data !== "") {
          alert("Email already exists!");
        } else {
          //check if username exists
          const response = await axios.get(
            `${BackendConn}user/getUserByUsername/${username}`
          );
          if (response.data !== "") {
            alert("Username already exists!");
          } else {
            //passed email and username check.
            //submit user to signup.
            const user = {
              USER_EMAIL: email,
              USER_USERNAME: username,
              USER_PW: password,
            };
            const response = await axios.post(
              `${BackendConn}user/signup`,
              user
            );
            console.log("This is user data: ");
            console.log(response.data);
            if (response.status === 200) {
              //store user data to local storage
              setUser(response.data);
              localStorage.setItem(
                "currentUser",
                JSON.stringify(response.data)
              );
              navigate("/signup/bio");
            }
          }
        }
      }
    }
  };

  const handleTextChange = (e) => {
    console.log(e.target);
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "username":
        if (e.target.value.length > 25) {
          alert("Username cannot be longer than 25 characters");
        } else {
          setUsername(e.target.value);
        }
        break;
      case "conpsw":
        setConpsw(e.target.value);
        break;
    }
    if (e.target.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  return (
    <main className="signupMain">
      <form onSubmit={handleSubmit}>
        <div className="signupContainer">
          <div className="headerSignup">
            <div className="logoSignup"></div>
            <a href="/" className="close">
              &times;
            </a>
          </div>

          <div id="float-label3">
            <input
              type="text"
              value={email}
              onChange={(e) => handleTextChange(e)}
              name="email"
            />
            <label className={isActive ? "Active" : ""} htmlFor="username">
              Email
            </label>
          </div>

          <div id="float-label4">
            <input
              type="text"
              value={username}
              onChange={(e) => handleTextChange(e)}
              name="username"
            />
            <label className={isActive ? "Active" : ""} htmlFor="username">
              Username (25)
            </label>
          </div>

          <div id="float-label5">
            <input
              type="password"
              value={password}
              onChange={(e) => handleTextChange(e)}
              name="password"
            />
            <label className={isActive ? "Active" : ""} htmlFor="password">
              Password
            </label>
          </div>

          <div id="float-label6">
            <input
              type="password"
              value={conpsw}
              onChange={(e) => handleTextChange(e)}
              name="conpsw"
            />
            <label className={isActive ? "Active" : ""} htmlFor="conpsw">
              Confirm Password
            </label>
          </div>

          <div className="signupS">
            <button
              className="signup"
              type="submit"
              onClick={() => {
                // navigate("/signup/bio");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Signup;
