// import React from "react";
import "./Following.css";
import React, { useState } from "react";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";
import UserInfoShort from "./components/UserInfo/UserInfoShort";

function Following() {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const [followingData, setFollowingData] = useState([]);

  //window onload
  React.useEffect(() => {
    retrieveFollowings();
  }, []);

  //component did update
  React.useEffect(() => {
      
  }, [followingData]);

  var retrieveFollowings = () => {
    axios
      .get(`${BackendConn}user/getMyFollowings/${currUser._id}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data === "") {
            alert("No user found under that username");
          } else {
            //first remove myself from search res if exists
            setFollowingData(res.data.FOLLOWING_USERS);
            localStorage.setItem("currentUser", JSON.stringify(res.data));
          }
        console.log(res)
        }
      });
  };
  return (
    <main className="followingMain">
      <div className="followingContainer">
        <h1>Following List</h1>
        <div className="followingInnerContainer">
          {followingData.map((singleUser, index) => (
            <UserInfoShort
              key={index}
              ind={index}
              username={singleUser.USER_ID.USER_USERNAME}
              uid={singleUser.USER_ID._id}
              showTime={true}
              time={singleUser.FOLLOW_DATE}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Following;
