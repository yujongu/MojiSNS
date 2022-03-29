import React, { useState } from "react";
import "./UserInfoShort.css";
import { Navigate, useNavigate } from "react-router-dom";
import { BackendConn } from "../../../constants/backendConn";

import axios from "axios";
import { USERPROFILE } from "../../../constants/routes";
import datePretty from "../../../helperFunctions/datePretty";

function UserInfoShort({ ind, username, uid, showTime, time }) {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isFollowing, setFollowing] = useState(false);
  let navigate = useNavigate();
  var pTime = datePretty(time);
  React.useEffect(() => {
    if (showTime) {
      var followBtn = document.querySelector(
        `.uInfoShortContainer:nth-child(${ind + 1}) > button`
      );
      followBtn.style.display = "none";
    }
    currUser.FOLLOWING_USERS.forEach((following) => {
      if (following.USER_ID._id === uid) {
        setFollowing(true);
      }
    });
  }, []);

  React.useEffect(() => {}, isFollowing);

  var redirectToTargetUser = () => {
    navigate(USERPROFILE, { state: { username: username, uid: uid } });
  };

  var followTargetUser = (event) => {
    event.stopPropagation();
    axios
      .patch(`${BackendConn}user/followUser/${currUser._id}`, { USER_ID: uid })
      .then((response) => {
        if (response.status == 200) {
          console.log("Added!");
          updateCurrUserInfo(currUser.USER_USERNAME);
          setFollowing(true);
        } else {
          alert("Something Went Wrong...");
        }
      });
  };
  var unfollowTargetUser = (event) => {
    event.stopPropagation();
    axios
      .patch(`${BackendConn}user/unfollowUser/${currUser._id}`, {
        USER_ID: uid,
      })
      .then((response) => {
        if (response.status == 200) {
          updateCurrUserInfo(currUser.USER_USERNAME);
          setFollowing(false);
        } else {
          alert("Something Went Wrong...");
        }
      });
  };

  var updateCurrUserInfo = (username) => {
    axios
      .get(`${BackendConn}user/getUserByUsername/${username}`)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("currentUser", JSON.stringify(res.data));
        }
      })
      .catch((error) => {
        alert("Something Went Wrong...");
      });
  };

  return (
    <div className="uInfoShortContainer" onClick={redirectToTargetUser}>
      <p>{username}</p>
      {showTime ? <div>Since {pTime} ago</div> : <div></div>}
      {isFollowing ? (
        <button onClick={unfollowTargetUser}>FOLLOWING</button>
      ) : (
        <button onClick={followTargetUser}>FOLLOW</button>
      )}
    </div>
  );
}

export default UserInfoShort;
