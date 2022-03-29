// import React from "react";
import "./Follower.css";
import React, { useState } from "react";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";
import UserInfoShort from "./components/UserInfo/UserInfoShort";
import datePretty from "../helperFunctions/datePretty";

function Follower() {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const [followerData, setFollowerData] = useState([]);
  const [todayCount, setTodayCount] = useState(0);

  //window onload
  React.useEffect(() => {
    retrieveFollowers();
  }, []);

  //component did update
  React.useEffect(() => {
    if (followerData.length != 0) {
      var count = followerData.length;
      followerData.forEach((element) => {
        if (
          datePretty(element.FOLLOW_DATE).includes("days") ||
          datePretty(element.FOLLOW_DATE).includes("years")
        ) {
          count--;
        }
      });
      setTodayCount(count);
    }
  }, [followerData]);

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
        <div className="followingToolbox">
          <p>Followed today: {todayCount}</p>
        </div>
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
