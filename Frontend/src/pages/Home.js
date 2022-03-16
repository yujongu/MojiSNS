import React from "react";

import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <main className="homeMain">
      <div className="center">
        <div className="lh">
          <div className="intro">
            <h1>Welcome to Moji!</h1>
            <p>
              <br></br>
              <br></br>Moji is a social networking site where people can share
              thoughts and ideas.
            </p>
            <p>
              <br></br>-------------------------------------------
            </p>
            <p>
              <br></br>Created by<br></br>
              <br></br>Jongu Yu<br></br>Juha Jeon<br></br>Jaseok Choi<br></br>
              Jooheon Lee<br></br>
            </p>
          </div>
        </div>
        <div className="rh">
          <div className="logo"></div>
          <div className="btns">
            <div className="login">
              <button
                className="loginB"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log In
              </button>
            </div>

            <p className="homeText">or</p>

            <div className="signup">
              <button
                className="signupB"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
