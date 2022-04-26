import React, { useState } from "react";
import "./MessageUI.css";
import axios from "axios";

function MessageUI({ username, content, time }) {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  var senderReceiverFlag;
  if (username === currUser._id) {
    senderReceiverFlag = "sender";
  } else {
    senderReceiverFlag = "receiver";
  }
  return (
    <div>
      {username === currUser._id ? (
        <div className="messageItemContainer_sender">
          <div>{content}</div>
        </div>
      ) : (
        <div className="messageItemContainer_receiver">
          <div>{content}</div>
        </div>
      )}
    </div>
  );
}

export default MessageUI;
