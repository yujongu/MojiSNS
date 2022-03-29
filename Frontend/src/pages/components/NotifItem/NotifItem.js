import React from "react";
import axios from "axios";

import "./NotifItem.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../../helperFunctions/datePretty";
import {
  NOTIFTYPE_COMMENT,
  NOTIFTYPE_FOLLOW,
  NOTIFTYPE_LIKE,
} from "../../../constants/notificationTypes";
import { USERPROFILE } from "../../../constants/routes";
import { BackendConn } from "../../../constants/backendConn";

function NotifItem({ notifId, userName, uid, type, content, time, read }) {
  let navigate = useNavigate();

  var pTime = datePretty(time);
  var typeText = "";
  switch (type) {
    case NOTIFTYPE_FOLLOW:
      typeText = "followed you!";
      content = `Go checkout ${userName}'s profile!`;
      break;
    case NOTIFTYPE_COMMENT:
      typeText = "commented on your post!";
      break;
    case NOTIFTYPE_LIKE:
      typeText = "liked your post!";
      break;
  }

  var handleNotificationClick = () => {
    switch (type) {
      case NOTIFTYPE_FOLLOW:
        navigate(USERPROFILE, { state: { username: userName, uid: uid } });
        break;
      case NOTIFTYPE_COMMENT:
        alert("This is comment notif");
        break;
      case NOTIFTYPE_LIKE:
        alert("This is like notif");
        break;
    }
    axios.patch(`${BackendConn}notification/makeNotificationRead/${notifId}`);
  };

  return (
    <div className="notifItem">
      {read ? (
        <div className="notifHaveRead"></div>
      ) : (
        <div className="notifHaveNotRead"></div>
      )}

      <div className="notifGoodStuff" onClick={handleNotificationClick}>
        <div className="notification_title">
          <div>{userName}</div>
          &nbsp;
          <div>{typeText}</div>
        </div>
        <p>{content}</p>
        <div className="notifTime">{pTime} ago</div>
      </div>
    </div>
  );
}

export default NotifItem;
