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

function UserProfile() {
  const location = useLocation();
  let navigate = useNavigate();

  var targetUsername = location.state.username;
  var targetUserId = location.state.uid;

  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  var formattedBday = "";
  var topics = "";

  React.useEffect(() => {
    populatePosts();
    getTargetUser();
  }, []);

  //component did update
  React.useEffect(() => {
    if (postData.length != 0) {
      postEventListeners();
    }
  }, [postData]);

  React.useEffect(() => {
    if (userData.length != 0) {
      userEventListeners();
    }
  }, [userData]);

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

  var postEventListeners = () => {
    var like = document.getElementById("like");
    var likeNum = document.getElementById("likeNum");
    var postSet = document.getElementById("postSet");
    var stateLike = 0;
    like.addEventListener("click", function () {
      if (stateLike === 1) {
        like.style.color = "#000000";
        likeNum.style.color = "#000000";
        stateLike = 0;
      } else {
        like.style.color = "#E26714";
        likeNum.style.color = "#E26714";
        stateLike = 1;
      }
    });
    postSet.addEventListener("click", function () {
      console.log("postSetting clicked");
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

    userData.FOLLOWING_TOPICS.forEach((t) => {
      topics += `${t} `;
    });

    var bdayContainer = document.querySelector(".birthday > p");
    bdayContainer.textContent = formattedBday;

    var interestList = document.querySelector(".interestList");
    interestList.textContent = topics;
  };

  return (
    <main className="profileContainer">
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
                <p id="prof_username">{userData.USER_EMAIL}</p>
              </div>
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
                userName={singlePost.USER_ID.USER_USERNAME}
                postTime={singlePost.updatedAt}
                likeCount={singlePost.LIKES_COUNT}
                commentCount={singlePost.COMMENTS_COUNT}
                postText={singlePost.BODY}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
