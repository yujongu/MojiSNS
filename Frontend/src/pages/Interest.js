import React from "react";
import { useState, useEffect } from "react";
import "./Interest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Interest() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);


/*  const handleSubmit = async e => {
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
  };*/

  return (
    <main className="interestMain">
        {/* <form onSubmit={handleSubmit}> */}

            <div className="interestContainer">
                <div class="logo"></div>


                <div class="Interest1">
                    <button 
                        type="submit"
                        class="sports"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Sports</button>
                    <button 
                        type="submit"
                        class="game"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Game</button>
                    <button 
                        type="submit"
                        class="news"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >News</button>
                </div>

                <div class="Interest2">
                    <button 
                        type="submit"
                        class="literature"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Literature</button>
                    <button 
                        type="submit"
                        class="game"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Game</button>
                    <button 
                        type="submit"
                        class="news"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >News</button>

                </div>


                <div class="Interest2">

                </div>


                <div class="NextB">
                    <button 
                        type="submit"
                        class="interest"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Next</button>
                </div>


                <div class="NextB">
                    <button 
                        type="submit"
                        class="interest"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Next</button>
                </div>





                <div class="NextB">
                    <button 
                        type="submit"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Next</button>
                </div>
                
            </div>
        {/* </form> */}
    </main>
  );
}

export default Interest;
