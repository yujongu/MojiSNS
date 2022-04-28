// import React from "react";
import "./UserProfile.css";
import { useNavigate, useLocation } from "react-router-dom";
import TopSettingBar from "./components/Header/TopSettingBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/fontawesome-free-solid";
import PostCard from "./components/PostCard";
import React, { useState } from "react";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";
import { DIRECTMESSAGE, HOMEWEB } from "../constants/routes";

function UserProfile() {
  const location = useLocation();
  let navigate = useNavigate();
  var me = JSON.parse(localStorage.getItem("currentUser"));

  var targetUsername = location.state.username;
  var targetUserId = location.state.uid;

  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  var formattedBday = "";
  var topics = "";

  const userBlockedList = [];
  (me.USER_BLOCKLIST).forEach((element) => {
    userBlockedList.push(element.USER_ID);
  })

  React.useEffect(() => {
    var a = document.querySelector(".blockUserBtn");
   
    if (userBlockedList.indexOf(targetUserId) === -1) {
      a.style.backgroundColor = "#ffc368";
      a.style.color = "#e26714";
      a.textContent = "Block User";
    } else {
      a.style.backgroundColor = "#fc5c5c";
      a.style.color = "white";
      a.textContent = "Unblock User";
    }

    incVisitorCount();
    populatePosts();
    getTargetUser();
  }, []);

  //component did update
  React.useEffect(() => {}, [postData]);

  React.useEffect(() => {
    if (userData.length != 0) {
      userEventListeners();
    }
  }, [userData]);

  var incVisitorCount = () => {
    const response = axios.patch(
      `${BackendConn}user/increaseVisitorCount/${targetUsername}`
    );
    response.then((response) => {
      if (response.status === 200) {
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var populatePosts = () => {
    const response = axios.get(`${BackendConn}post/getPosts/${targetUserId}`);
    response.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setPostData(response.data);
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var getTargetUser = () => {
    const response = axios.get(
      `${BackendConn}user/getUserByUsername/${targetUsername}`
    );
    response.then((response) => {
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var redirectToDmUser = () => {
    console.log(userData);
    navigate(DIRECTMESSAGE, {
      state: {
        username: targetUsername,
        uid: targetUserId,
        useremail: userData.USER_EMAIL,
      },
    });
  };

  var userEventListeners = () => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const bday = userData.USER_BIRTHDAY.split("T")[0].split("-");
    formattedBday =
      monthNames[parseInt(bday[1]) - 1] + " " + bday[2] + ", " + bday[0];

    userData.FOLLOWING_TOPICS_Obj.forEach((t) => {
      topics += `${t.TOPIC_NAME} `;
    });

    var bdayContainer = document.querySelector(".birthday > p");
    bdayContainer.textContent = formattedBday;

    var interestList = document.querySelector(".interestList");
    interestList.textContent = topics;
  };

  var blockUser = () => {
    var a = document.querySelector(".blockUserBtn");
    console.log(a);
    a.style.backgroundColor = "#fc5c5c";
    a.style.color = "white";
    a.textContent = "Unblock User";
    const response = axios.patch(`${BackendConn}user/blockUser/${me._id}`, {
      USER_ID: targetUserId,
    });
    response.then((response) => {
      if (response.status === 200) {
        if (response.data === "already blocked") {
          alert("The user's already blocked!");
        } else {
          alert("User has been blocked!");
          console.log(response.data);
          localStorage.setItem("currentUser", JSON.stringify(response.data));
        }
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var unblockUser = () => {
    var a = document.querySelector(".blockUserBtn");
    console.log(a);
    a.style.backgroundColor = "#ffc368";
    a.style.color = "#e26714";
    a.textContent = "Block User";
    const response = axios.patch(`${BackendConn}user/unblockUser/${me._id}`, {
      USER_ID: targetUserId,
    });
    response.then((response) => {
      if (response.status === 200) {
        alert("User has been unblocked!");
        console.log(response.data);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var userBlockHandler = () => {
    var a = document.querySelector(".blockUserBtn");
    console.log(a.style.backgroundColor);
    if (a.style.backgroundColor === "rgb(252, 92, 92)") {
      unblockUser();
    } else {
      blockUser();
    }
  };

  return (
    <main className="profileContainer">
      <div className="itemFlex">
        <div className="backButton">
          <a href={HOMEWEB}>
            <button className="backFromProfile">&lt;Home</button>
          </a>
        </div>
        <div className="profileMainContainer">
          <TopSettingBar text={"Profile Page"} />
          <div className="myProfileInfoContainer">
            <div className="myProfUpperHalf">
              <div id="lh">
                <div className="imageContainer">
                  <img src={require("../images/steveRogersProfile.jpg")} />
                </div>

                <div className="nameInfos">
                  <p id="prof_name">{userData.USER_USERNAME}</p>
                  <p id="prof_email">{userData.USER_EMAIL}</p>
                  <p id="prof_visitorCount">
                    {userData.DAILY_VISITOR_COUNT} visitors visited your profile
                  </p>
                </div>
              </div>

              <div>
                <button className="blockUserBtn" onClick={userBlockHandler}>
                  Block user
                </button>
              </div>
            </div>

            <div className="infosContainer">
              <div className="birthday">
                <FontAwesomeIcon icon={faBirthdayCake} size="lg" />
                <p>{formattedBday}</p>
              </div>
              <div className="interests">
                <p>
                  <i className="fa-solid fa-face-grin-tongue-squint fa-lg"></i>
                </p>
                <div className="interestList">{topics}</div>
              </div>
            </div>
          </div>

          <p id="myPostTitle">{targetUsername}'s Posts</p>

          <div id="postHolder">
            {isLoading ? (
              <div>Loading</div>
            ) : (
              postData.map((singlePost, index) => (
                <PostCard
                  key={index}
                  topic={singlePost.TOPIC_ID.TOPIC_NAME}
                  userName={singlePost.USER_ID.USER_USERNAME}
                  postId={singlePost._id}
                  anonymous={singlePost.IS_ANONYMOUS}
                  postTime={singlePost.updatedAt}
                  likeCount={singlePost.LIKES_COUNT}
                  commentCount={singlePost.COMMENTS_COUNT}
                  postText={singlePost.BODY}
                />
              ))
            )}
          </div>
        </div>
        <div className="dmBtnContainer">
          {/* <a href={DIRECTMESSAGE}>
          </a> */}
          <button className="dmBtn" onClick={redirectToDmUser}>
            Message&gt;
          </button>
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
