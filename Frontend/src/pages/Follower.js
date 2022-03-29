// import React from "react";
import "./Follower.css";
import React, { useState } from "react";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";
import UserInfoShort from "./components/UserInfo/UserInfoShort";

function Follower() {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const [followerData, setFollowerData] = useState([]);

  //window onload
  React.useEffect(() => {
    retrieveFollowers();
  }, []);

  //component did update
  React.useEffect(() => {}, [followerData]);

  var retrieveFollowers = () => {
    axios
      .get(`${BackendConn}user/getUserByUsername/${currUser.USER_USERNAME}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data === "") {
            alert("No user found under that username");
          } else {
            //first remove myself from search res if exists
            setFollowerData(res.data.FOLLOWER_USERS);
            localStorage.setItem("currentUser", JSON.stringify(res.data));
          }
        }
      });
  };
  return (
    <main className="followerMain">
      <div className="followerContainer">
        <h1>Follower List</h1>
        <div className="followerInnerContainer">
          {followerData.map((singleUser, index) => (
            <UserInfoShort
              key={index}
              ind={index}
              username={singleUser.USER_ID.USER_USERNAME}
              uid={singleUser._id}
              showTime={true}
              time={singleUser.FOLLOW_DATE}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Follower;
