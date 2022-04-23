import React from 'react'
import "./PasswordReset.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BackendConn } from "../constants/backendConn";

const PasswordReset = (props) => {
    let navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { userId, token } = useParams();
    console.log(userId);
    console.log(token);
    const [user, setUser] = useState();
    // console.log(props.match.params.id);



    const handleTextChange = (e) => {
        console.log(e.target);
        switch (e.target.name) {
            case "newPassword":
                setNewPassword(e.target.value);
                break;
            case "confirmPassword":
                setConfirmPassword(e.target.value);
                break;
        }
        if (e.target.value !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword === "") {
            alert("Please enter your new password");
        } else {
            if (confirmPassword === "") {
                alert("Please enter your new confirm password");
            } else {
                if(newPassword !== confirmPassword)
                {
                    alert("Your passwords do not match!");
                }
                else
                {
                    const user = {
                        userid: userId,
                        token: token,
                        password: newPassword,
                      };
                      const response = await axios.post(
                        `${BackendConn}user/auth/resetPassword`,
                        user
                      );
                      alert("Password has changed!");
                      navigate("/login");
                }
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
                            type="password"
                            value={newPassword}
                            onChange={(e) => handleTextChange(e)}
                            name="newPassword"
                        ></input>
                        <label className={isActive ? "Active" : ""} htmlFor="password">
                            New Password
                        </label>
                    </div>

                    <div id="float-label2">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => handleTextChange(e)}
                            name="confirmPassword"
                        ></input>
                        <label className={isActive ? "Active" : ""} htmlFor="password">
                            Confirm Password
                        </label>
                    </div>

                    <div className="loginL">
                        <button type="submit" className="change" id="1">
                            Change Password
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default PasswordReset