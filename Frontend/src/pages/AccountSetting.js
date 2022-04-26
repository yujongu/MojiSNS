import React from "react";
import "./AccountSetting.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BackendConn } from "../constants/backendConn";

const AccountSetting = () => {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const bday = currUser.USER_BIRTHDAY.split("T")[0].split("-");
  var formattedBday =
    monthNames[parseInt(bday[1]) - 1] + " " + bday[2] + ", " + bday[0];

  let navigate = useNavigate();

  async function updateEmail() {
    const emailRegExp =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    var newEmailAddr = document.getElementById("updatedEmail").value;
    console.log(newEmailAddr);
    if (!emailRegExp.test(newEmailAddr)) {
      alert("Please check your email format.");
    } else {
      const user = {
        USER_EMAIL: newEmailAddr,
      };
      const response = await axios.get(
        `${BackendConn}user/getUserByEmail/${newEmailAddr}`
      );
      if (response.data !== "") {
        alert("Email already exists!");
      } else {
        const response = await axios
          .patch(`${BackendConn}user/updateUser/${currUser._id}`, user)
          .then((res) => {
            console.log(res);
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/accsetting#");
          })
          .catch((error) => {
            alert("Email has not been updated!");
          });

        alert("Email has been updated!");
      }
    }
  }

  async function functionGender() {
    var newGender = document.getElementById("genders").value;
    console.log(newGender);
    const user = {
      USER_SEX: newGender,
    };
    const response = await axios
      .patch(`${BackendConn}user/updateUser/${currUser._id}`, user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/accsetting#");
      })
      .catch((error) => {
        alert("Gender has not been updated!");
      });
    alert("Gender has been updated!");
  }

  async function functionBirth() {
    var newBday = document.getElementById("birthday").value;
    console.log(newBday);
    const user = {
      USER_BIRTHDAY: newBday,
    };
    const response = await axios
      .patch(`${BackendConn}user/updateUser/${currUser._id}`, user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/accsetting#");
      })
      .catch((error) => {
        alert("Birthday has not been updated!");
      });
    alert("Birthday has been updated!");
  }

  async function deleteAccount() {
    var deleteMsg = document.getElementById("deleteMessage").value;
    console.log(deleteMsg);
    if (deleteMsg === "Delete My Account") {
      const response = await axios.delete(
        `${BackendConn}user/deleteUser/${currUser._id}`
      );
      localStorage.removeItem("currentUser");
      navigate("/login");
      alert("Account has been deleted");
    } else {
      alert("Confirmation Message is different!");
    }
  }

  return (
    <main className="accMain">
      <div className="itemFlex">
        <div className="backButton">
          <a href="/profile">
            <button className="backFromAS">&lt;Profile</button>
          </a>
        </div>
        <div className="center1">
          <div className="header">
            <div className="headerApp">
              <h2 className="titleWeb">Account Setting</h2>
            </div>
          </div>
          <div className="settingCard">
            <div className="settingContainer">
              <h3 className="accSett">Account Setting</h3>
              <h4 className="header4set">Account Preference</h4>
              <hr className="solid" />
              <h4 className="header4set">Email Address</h4>
              <div className="emailSet">
                <p id="userEmail">{currUser.USER_EMAIL}</p>
                <a href="?#divTwo" id="button" className="emailEdit">
                  Edit Email
                </a>
              </div>
              <h4 className="header4set">Gender</h4>
              <div className="genderSet">
                <p id="userGender">{currUser.USER_SEX}</p>
                <div>
                  <div>
                    <select className="customGender" id="genders">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Not Sure">Unidentify</option>
                    </select>
                  </div>
                  <br></br>
                  <button type="submitG" onClick={functionGender}>
                    Submit
                  </button>
                </div>
              </div>
              <h4 className="header4set">Birthday</h4>
              <div className="birthdaySet">
                <p id="userBday">{formattedBday}</p>
                <div className="rightBirth">
                  <input
                    className="customBday"
                    type="date"
                    id="birthday"
                    name="birthday"
                  ></input>
                  <button type="submitBirth" onClick={functionBirth}>
                    Submit
                  </button>
                </div>
              </div>
              <hr className="solid" />
              <div className="accountDelete">
                <h4 className="header4set">Account Deletion</h4>
                <a href="?#divThree" id="button" className="deleteBtn">
                  Delete
                </a>
              </div>
              <div className="overlay" id="divTwo">
                <div className="wrapperEmail">
                  <div className="forgetHeader">
                    <h2>Update Email Address</h2>
                    <a href="#" className="close">
                      &times;
                    </a>
                  </div>
                  <div className="content">
                    <div className="contentInside">
                      <form>
                        <label>User Email</label>
                        <input
                          type="textE"
                          placeholder={currUser.USER_EMAIL}
                          id="updatedEmail"
                        ></input>
                        <button type="submitE" onClick={updateEmail}>
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overlay" id="divThree">
                <div className="wrapperEmail">
                  <div className="forgetHeader">
                    <h2>Account Delete</h2>
                    <a href="#" className="close">
                      &times;
                    </a>
                  </div>
                  <h3>Please Type in "Delete My Account" to delete</h3>

                  <div className="content">
                    <div className="contentInside">
                      <form>
                        <label>Confirmation</label>
                        <input
                          type="textD"
                          placeholder="Delete My Account"
                          id="deleteMessage"
                        ></input>
                        <button type="submitD" onClick={deleteAccount}>
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountSetting;
