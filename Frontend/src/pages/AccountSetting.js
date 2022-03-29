import React from 'react'
import "./AccountSetting.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BackendConn } from "../constants/backendConn";

const AccountSetting = () => {
    const currUser = JSON.parse(localStorage.getItem("currentUser"));

    async function updateEmail() {
        var newEmailAddr = document.getElementById("updatedEmail").value;
        console.log(newEmailAddr);
        const user = {
            USER_EMAIL: newEmailAddr
        };
        const response = await axios.patch(
            `${BackendConn}user/updateUser/${currUser._id}`, user
        );
        alert("Email has been updated!");
    }

    async function functionGender() {
        alert("Gender has been updated!");
        console.log(document.getElementById("genders").value);
        var newGender = document.getElementById("genders").value;
        console.log(newGender);
        const user={
            USER_SEX: newGender
        };
        const response = await axios.patch(
            `${BackendConn}user/updateUser/${currUser._id}`, user
        );
        alert("Gender has been updated!");
    }

    return (
        <main className="accMain">
            <div className="center1">
                <div className="header">
                    <div className="headerApp">
                        <h2 className="titleWeb">Account Setting</h2>
                    </div>
                </div>
                <div className='settingCard'>
                    <div className='settingContainer'>
                        <h3 className='accSett'>
                            Account Setting
                        </h3>
                        <h4 className='header4set'>
                            Account Preference
                        </h4>
                        <hr class="solid" />
                        <h4 className='header4set'>
                            Email Address
                        </h4>
                        <div className='emailSet'>
                            <p id="userEmail">{currUser.USER_EMAIL}</p>
                            <a href="?#divTwo" id="button" class="emailEdit">Edit Email</a>
                        </div>
                        <h4 className='header4set'>
                            Gender
                        </h4>
                        <div className='genderSet'>
                            <p id="userGender">{currUser.USER_SEX}</p>
                            <div>
                                <div>
                                    <select class="customGender" id="genders">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="unidentify">Unidentify</option>
                                    </select>
                                </div>
                                <br>
                                </br>
                                <button type="submitG" onClick={functionGender}>Submit</button>
                            </div>
                        </div>
                        <hr class="solid" />
                        <div className='accountDelete'>
                            <h4 className='header4set'>
                                Account Deletion
                            </h4>
                            <a href="?#divThree" id="button" class="deleteBtn">Delete</a>
                        </div>
                        <div class="overlay" id="divTwo">
                            <div class="wrapperEmail">
                                <div class="forgetHeader">
                                    <h2>Update Email Address</h2>
                                    <a href="#" class="close">&times;</a>
                                </div>
                                <div class="content">
                                    <div class="contentInside">
                                        <form>
                                            <label>
                                                User Email
                                            </label>
                                            <input type="textE" placeholder={currUser.USER_EMAIL} id="updatedEmail">
                                            </input>
                                            <button type="submitE" onClick={updateEmail}>Update</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="overlay" id="divThree">
                            <div class="wrapperEmail">
                                <div class="forgetHeader">
                                    <h2>Account Delete</h2>
                                    <a href="#" class="close">&times;</a>
                                </div>
                                <h3>Please Type in "Delete My Account" to delete</h3>

                                <div class="content">
                                    <div class="contentInside">
                                        <form>
                                            <label>
                                                Confirmation
                                            </label>
                                            <input type="textD" placeholder="Delete My Account">
                                            </input>
                                            <button type="submitD">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AccountSetting