import React from "react";
import { useState, useEffect } from "react";
import "./Bio.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Bio() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState();


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

  function handleTextChange(text) {
    setBirthday(text);
    setGender(text);

    if (text !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }
  return (
    <main className="bioMain">
        {/* <form onSubmit={handleSubmit}> */}

            <div className="bioContainer">
                <div class="logo"></div>

                <div id="float-label7">
                <input
                    type="text"
                    value={birthday}
                    onChange={(e) => handleTextChange(e.target.value)}
                />
                <label className={isActive ? "Active" : ""} htmlFor="birthday">
                    Birthday
                </label>
                </div>

                <div id="float-label8">
                <input
                    type="text"
                    value1={gender}
                    onChange={(e) => handleTextChange(e.target.value1)}
                />
                <label className={isActive ? "Active" : ""} htmlFor="gender">
                    Gender
                </label>
                </div>

                <div class="NextB">
                    <button 
                        type="submit"
                        class="bio"
                        onClick={() => {
                            navigate("/signup/interest")
                            }}    >Next</button>
                </div>
                
            </div>
        {/* </form> */}
    </main>
  );
}

export default Bio;
