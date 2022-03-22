import React from "react";
import { useState, useEffect } from "react";
import "./Bio.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";

function Bio() {
  let navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check birthday format
    const userKeyRegExp =
      /^(?:0[1-9]|[12][0-9]|3[01])[-/.](?:0[1-9]|1[012])[-/.](?:19\d{2}|20[01][0-9]|2020)$/;
    const valid = userKeyRegExp.test(birthday);

    if (!valid) {
      alert("Please check your birthday format!");
    } else {
      if (gender === "Male" || gender === "Female") {
        //passed all checks
        //update gender info and birthday info

        var me = JSON.parse(localStorage.getItem("currentUser"));
        var myId = me._id;
        var bDayArr = birthday.split("/");
        var myBirthday = bDayArr[2] + "-" + bDayArr[1] + "-" + bDayArr[0];
        console.log("Birthday: ");
        console.log(myBirthday);
        me.birthday = new Date(myBirthday);
        me.gender = gender;

        const response = await axios.patch(
          `${BackendConn}user/updateUser/${myId}`,
          {
            USER_BIRTHDAY: myBirthday,
            USER_SEX: gender,
          }
        );
        console.log(response);
        if(response.data._id === myId) {
          localStorage.setItem('currentUser', JSON.stringify(response.data))
          navigate("/signup/interest");
        }
      } else {
        alert("Please check your gender!");
      }
    }
  };

  const handleTextChange = (e) => {
    console.log(e.target);
    switch (e.target.name) {
      case "gender":
        setGender(e.target.value);
        break;
      case "birthday":
        setBirthday(e.target.value);
        break;
    }
    if (e.target.value !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  return (
    <main className="bioMain">
      <form onSubmit={handleSubmit}>
        <div className="bioContainer">
          <div class="logo"></div>

          <div id="float-label7">
            <input
              type="text"
              value={birthday}
              onChange={(e) => handleTextChange(e)}
              name="birthday"
            />
            <label className={isActive ? "Active" : ""} htmlFor="birthday">
              Birthday (DD/MM/YYYY)
            </label>
          </div>

          <div id="float-label8">
            <input
              type="text"
              value={gender}
              onChange={(e) => handleTextChange(e)}
              name="gender"
            />
            <label className={isActive ? "Active" : ""} htmlFor="gender">
              Gender (Male or Female)
            </label>
          </div>

          <div class="NextB">
            <button type="submit" className="bio">Next</button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default Bio;
