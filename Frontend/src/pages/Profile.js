// import React from "react";
import "./Profile.css";
import { useNavigate, useLocation } from "react-router-dom";
import TopSettingBar from "./components/Header/TopSettingBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/fontawesome-free-solid";
import { faDoorOpen } from "@fortawesome/fontawesome-free-solid";
import PostCard from "./components/PostCard";
import React, { useState } from "react";
import { HOMEWEB } from "../constants/routes";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";

function Profile() {
  let navigate = useNavigate();
  var currUser = JSON.parse(localStorage.getItem("currentUser"));
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
  currUser.FOLLOWING_TOPICS_Obj.forEach((t) => {
    topics += `${t.TOPIC_NAME} `;
  });

  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);

  window.onclick = function (event) {
    if (!event.target.matches("#postSet")) {
      var dropdowns = document.getElementsByClassName("postSetting_content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  React.useEffect(() => {
    getMyInfo();
    populatePosts();
  }, []);

  //component did update
  React.useEffect(() => {}, [postData]);

  var getMyInfo = () => {
    const response = axios.get(`${BackendConn}user/getUserByUsername/${currUser.USER_USERNAME}`);
    response.then((response) => {
      if(response.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(response.data))
        currUser = JSON.parse(localStorage.getItem("currentUser"));
      }
    })
  }

  var populatePosts = () => {
    const response = axios.get(`${BackendConn}post/getMyPosts/${currUser._id}`);
    response.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setPostData(response.data);
      } else {
        alert("Something Went Wrong...");
      }
    });
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
                  <p id="prof_name">{currUser.USER_USERNAME}</p>
                  <p id="prof_email">{currUser.USER_EMAIL}</p>
                  <p id="prof_visitorCount">{currUser.DAILY_VISITOR_COUNT} visitors visited your profile</p>
                  
                </div>
              </div>

              <div className="profileEditBtns">
                <button
                  className="profile_editButton"
                  onClick={() => {
                    navigate("/accsetting");
                  }}
                >
                  Edit Profile
                </button>
                {/* <button
                  className="interestModify"
                  onClick={() => navigate("/newinterest")}
                >
                  Settings
                </button> */}
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
                    onClick={() => navigate("/newinterest")}
                  >
                    +/-
                  </button>
                </div>
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
      </div>
    </main>
  );
}

export default Profile;
