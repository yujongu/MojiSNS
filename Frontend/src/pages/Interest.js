import React from "react";
import { useState, useEffect } from "react";
import "./Interest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

var intList = [];

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

                <div class="topics">
                    <p4>Tell us your interests!</p4>
                </div>

                <div class="Interest1">
                    <button 
                        type="button"
                        class="sports"
                        onClick={() => {
                        if (intList.indexOf("sports") < 0) {
                            intList.push('sports');
                        }
                        console.log(intList);
                        }}
                        >Sports</button>
                    <button 
                        type="button"
                        class="game"
                        onClick={() => {
                        if (intList.indexOf("game") < 0) {
                            intList.push('game');
                        }                        
                        console.log(intList);
                        }}
                         >Game</button>
                    <button 
                        type="button"
                        class="news"
                        onClick={() => {
                        if (intList.indexOf("news") < 0) {
                            intList.push('news');
                        }                        
                        console.log(intList);
                        }}
                        >News</button>
                </div>

                <div class="Interest2">
                    <button 
                        type="button"
                        class="literature"
                        onClick={() => {
                        if (intList.indexOf("literature") < 0) {
                            intList.push('literature');
                        }
                        console.log(intList);
                        }}
                        >Literature</button>
                    <button 
                        type="button"
                        class="memes"
                        onClick={() => {
                        if (intList.indexOf("memes") < 0) {
                            intList.push('memes');
                        }
                        console.log(intList);
                        }}
                        >Memes</button>
                    <button 
                        type="button"
                        class="beauty"
                        onClick={() => {
                        if (intList.indexOf("beauty") < 0) {
                            intList.push('beauty');
                        }
                        console.log(intList);
                        }}
                        >Beauty</button>

                </div>
        
                <div class="Interest3">
                    <button 
                        type="button"
                        class="movies"
                        onClick={() => {
                        if (intList.indexOf("movies") < 0) {
                            intList.push('movies');
                        }
                        console.log(intList);
                        }}
                        >Movies</button>
                    <button 
                        type="button"
                        class="anonymous"
                        onClick={() => {
                        if (intList.indexOf("anonymous") < 0) {
                            intList.push('anonymous');
                        }                        
                        console.log(intList);
                        }}
                        >Anonymous</button>

                </div>

                <div class="Finish">
                    <button 
                        type="submit"
                        class="finished"
                        onClick={() => {
                            navigate("/login")
                            }}    >Finish</button>
                </div>
                
            </div>
        {/* </form> */}

    </main>
  );
}

export default Interest;
