// import React from "react";
import "./Following.css";
import React, { useState } from "react";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";
import UserInfoShort from "./components/UserInfo/UserInfoShort";
import datePretty from "../helperFunctions/datePretty";

function Following() {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const [followingData, setFollowingData] = useState([]);
  const [todayCount, setTodayCount] = useState(0);
  //window onload
  React.useEffect(() => {
    retrieveFollowings();
  }, []);

  //component did update
  React.useEffect(() => {
    if (followingData.length != 0) {
      var count = followingData.length;
      followingData.forEach((element) => {
        if (
          datePretty(element.FOLLOW_DATE).includes("days") ||
          datePretty(element.FOLLOW_DATE).includes("years")
        ) {
          count--;
        }
      });
      setTodayCount(count);
    }
  }, [followingData]);

  var retrieveFollowings = () => {
    axios
      .get(`${BackendConn}user/getMyFollowings/${currUser._id}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data === "") {
            alert("No user found under that username");
          } else {
            setFollowingData(res.data.FOLLOWING_USERS);
          }
        }
      });
  };
  return (
    <main className="followingMain">
      <div className="followingContainer">
        <h1>Following List</h1>
        <div className="followingToolbox">
          {followingData.length === 1 ? (
            <p>You follow {followingData.length} user</p>
          ) : (
            <p>You follow {followingData.length} users</p>
          )}
          <p>Followed today: {todayCount}</p>
        </div>

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
