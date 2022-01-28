import React from "react"
import "./Home.css"
import { useNavigate } from "react-router-dom";

function Home() {

        let navigate = useNavigate();

        return (
            <React.Fragment>

                <div class="left">

                </div>

                <div class="rightHalf">

                </div>

                <div class="leftHalf">

                </div>

                <div class="welcome">
                    <h1>Welcome to Moji!</h1>
                    <p><br></br><br></br>Moji is a social networking site where people can share thoughts and ideas.</p>
                    <p><br></br>-------------------------------------------</p>
                    <p><br></br>Created by<br></br><br></br>Jongu Yu<br></br>Juha Jeon<br></br>Jaseok Choi<br></br>Jooheon Lee<br></br></p>
                </div>

                <div class="logo">

                </div>

                <div class="login">
                    <button class="loginB"  onClick={() => {
                      navigate("/login")}}>Log In</button>
                </div> 

                <div class="signup">
                  <button class="signupB">Sign Up</button>
                </div> 

            </React.Fragment>
        );


}

export default Home;