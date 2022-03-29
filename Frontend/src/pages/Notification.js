import React from "react";
import { useState, useEffect } from "react";
import "./Notification.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";
import NotifItem from "./components/NotifItem/NotifItem";

function Notification() {
  var username = "steve";
  var type = "Follow";
  var content = "";
  var time = "";
  var read = false;
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const [notificationData, setNotificationData] = useState([]);

  React.useEffect(() => {
    retrieveNotifications();
  }, []);

  React.useEffect(() => {
    if (notificationData.length != 0) {
      // var count = followerData.length;
      // followerData.forEach((element) => {
      //   if (
      //     datePretty(element.FOLLOW_DATE).includes("days") ||
      //     datePretty(element.FOLLOW_DATE).includes("years")
      //   ) {
      //     count--;
      //   }
      // });
      // setTodayCount(count);
      
    }
  }, [notificationData]);

  var retrieveNotifications = () => {
    axios
      .get(`${BackendConn}notification/getNotifications/${currUser._id}`)
      .then((res) => {
        if (res.status === 200) {
          // if (res.data === "") {
          //   alert("No user found under that username");
          // } else {
          //   //first remove myself from search res if exists
          //   setFollowerData(res.data.FOLLOWER_USERS);
          //   localStorage.setItem("currentUser", JSON.stringify(res.data));
          // }
          setNotificationData(res.data)
        }
      });
  };
  return (
    <main className="notifMainContainer">
      <div className="notifContainer">
      {notificationData.map((notification, index) => (
            <NotifItem
            key={index}
            notifId={notification._id}
            userName={notification.SENDER_USER_ID.USER_USERNAME}
            uid={notification.SENDER_USER_ID._id}
            type={notification.NOTIF_TYPE}
            content={notification.BODY}
            time={notification.createdAt}
            read={notification.VIEWED}
          />
          // console.log(notification)
          ))}
        
      </div>
    </main>
  );
}

export default Notification;
