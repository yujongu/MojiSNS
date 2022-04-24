// import React from "react";
import "./Profile.css";
import { useNavigate, useLocation } from "react-router-dom";
import TopSettingBar from "./components/Header/TopSettingBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/fontawesome-free-solid";
import { faDoorOpen } from "@fortawesome/fontawesome-free-solid";
import PostCard from "./components/PostCard";
import React, { useState } from "react";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";

function Profile() {
  console.log("This is user");
  let navigate = useNavigate();
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  //todo get curr user posts.
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
  const bday = currUser.USER_BIRTHDAY.split("T")[0].split("-");
  var formattedBday =
    monthNames[parseInt(bday[1]) - 1] + " " + bday[2] + ", " + bday[0];
  var topics = "";
  console.log(currUser.FOLLOWING_TOPICS);
  currUser.FOLLOWING_TOPICS.forEach((t) => {
    topics += `${t} `;
  });

  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);

  const countEl = document.getElementById('count');
  function updateVisitCount() {
    fetch('https://api.countapi.xyz/update/florin-pop/kimchi/?amount=1')
    .then(res => res.json())
    .then(res => {
      countEl.innerHTML = res.value;
      console.log("COUNTEL:"+countEl.innerHTML);

    })
  }


  React.useEffect(() => {
    populatePosts();
  }, []);

  //component did update
  React.useEffect(() => {
    if (postData.length != 0) {
      postEventListeners();
      
    }
    updateVisitCount();

    
  }, [postData]);

  var populatePosts = () => {
    const response = axios.get(`${BackendConn}post/getPosts/${currUser._id}`);
    response.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setPostData(response.data);
        console.log(response);
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
                <p id="prof_name">{currUser.USER_USERNAME}</p>
                <p id="prof_username">{currUser.USER_EMAIL}</p>
              </div>
            </div>

            <div className="profileEditBtns">
              <button className="profile_editButton">Edit Profile</button>
              <button
                className="profile_settingButton"
                onClick={() => {
                  navigate("/accsetting");
                }}
              >
                Settings
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
              <div className="interestEditBtns">
                <button
                  className="interestModify"
                  onClick={() => navigate('/newinterest')}
                >
                  +/-
                </button>
              </div>
            </div>
            <div classname="visitCounts">
              <FontAwesomeIcon icon={faDoorOpen} size="lg" />
              <p>Visited: </p>
              <p id="count">0</p>
            </div>
          </div>
        </div>

        <p id="myPostTitle">My Posts</p>

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

export default Profile;
