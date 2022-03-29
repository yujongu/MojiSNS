import React from "react";
import { useState, useEffect } from "react";
import "./Notification.css";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";
import NotifItem from "./components/NotifItem/NotifItem";

function Notification() {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const [notificationData, setNotificationData] = useState([]);

  React.useEffect(() => {
    retrieveNotifications();
  }, []);

  React.useEffect(() => {}, [notificationData]);

  var retrieveNotifications = () => {
    axios
      .get(`${BackendConn}notification/getNotifications/${currUser._id}`)
      .then((res) => {
        if (res.status === 200) {
          setNotificationData(res.data);
        }
      });
  };
  return (
    <main className="notifMainContainer">
      <div className="notifContainer">
        <h1>Notification Page</h1>
        {notificationData.length === 0 ? (
          <div className="zeroNotificationContainer">
            <p>Sorry, you do not have any notifications...</p>
          </div>
        ) : (
          <div></div>
        )}
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
