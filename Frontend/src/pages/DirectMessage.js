import { USERPROFILE } from "../constants/routes";
import { useNavigate, useLocation } from "react-router-dom";
import "./DirectMessage.css";
import io from "socket.io-client";
import getRoomName from "../helperFunctions/roomName";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";
import MessageUI from "./components/MessageUI";
import { element } from "prop-types";

const socket = io.connect("http://localhost:5000");

function DirectMessage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  var targetUsername = location.state.username;
  var targetUserId = location.state.uid;
  var targetUserEmail = location.state.useremail;

  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [messageRec, setMessageRec] = useState("");
  const [nMessages, setnMessages] = useState([]);

  const userBlockedList = [];
  (currUser.USER_BLOCKLIST).forEach((element) => {
    userBlockedList.push(element.USER_ID);
  })

  useEffect(() => {
    if(
      userBlockedList.indexOf(targetUserId)
       !== -1) {
      alert("This user is blocked!")
      var a = document.getElementById("sendMsgBtn")
      a.disabled = true
      return;
    }
    joinRoom();
    getPrevMessages();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRec(data.message);
    });
  }, [socket]);

  useEffect(() => {}, [history]);

  useEffect(() => {
    if(messageRec !== "") {
      var nChat = {
        CHAT_OWNER_ID: targetUserId,
        CHAT_MESSAGE: messageRec,
        createdAt: Date.now(),
      };
      var arr = [nChat ,...nMessages]
      setnMessages(arr);
    }
    
  }, [messageRec])

  const room = getRoomName(currUser.USER_USERNAME, targetUsername);

  var joinRoom = () => {
    socket.emit("join_room", room);
  };

  var getPrevMessages = async () => {
    const response = await axios.get(`${BackendConn}chat/getMessages/${room}`);

    if (response.status === 200) {
      setHistory(response.data);
    }
  };

  var updateChat = () => {
    var nChat = {
      CHAT_OWNER_ID: currUser._id,
      CHAT_MESSAGE: message,
      createdAt: Date.now(),
    };
    var arr = [nChat ,...nMessages]
    setnMessages(arr);
  }

  var sendMsg = async () => {
    if(message !== "") {
      document.getElementById("messageContent").value = "";
      setMessage("")
      updateChat();
  
      socket.emit("send_message", { message, room });
  
      const response = await axios.post(`${BackendConn}chat/addMessage`, {
        ROOM_NAME: room,
        CHAT_OWNER_ID: currUser._id,
        CHAT_MESSAGE: message,
      });
      if (response.status !== 200) {
        alert("Something's wrong..");
      }
    }
    
  };

  return (
    <main className="dmContainer">
      <div className="dmMainContainer">
        <div className="prevPageBtn">
          <button className="backFromProfile" onClick={() => navigate(-1)}>
            &lt;Back
          </button>
        </div>

        <div className="dm_receiverNametag">
          <h1>Message with user "{targetUsername}"</h1>
        </div>

        <div className="dm_container">
          {nMessages.map((element, index) => (
            <MessageUI
              key={index}
              username={element.CHAT_OWNER_ID}
              content={element.CHAT_MESSAGE}
              time={element.createdAt}
            />
          ))}
          {history.length === 0 ? (
            <div>Start chatting!!</div>
          ) : (
            history.map((element, index) => (
              <MessageUI
                key={index}
                username={element.CHAT_OWNER_ID}
                content={element.CHAT_MESSAGE}
                time={element.createdAt}
              />
            ))
          )}
        </div>
        <div className="sendMessageBox">
          <div className="messageContentContainer">
            <input
              type="text"
              id="messageContent"
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
          <button id="sendMsgBtn" onClick={sendMsg}>
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

export default DirectMessage;
