import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import TopSettingBar from "./components/Header/TopSettingBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/fontawesome-free-solid";
import PostCard from "./components/PostCard";
function Profile() {

  const currUser = JSON.parse(localStorage.getItem("currentUser"))
  console.log(currUser)
  console.log(currUser.USER_BIRTHDAY)
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
              <button className="profile_settingButton">Settings</button>
            </div>
          </div>

          <div className="infosContainer">
            <div className="birthday">
              <FontAwesomeIcon icon={faBirthdayCake} size="lg" />
              <p>July 4, 1918</p>
            </div>
            <div className="interests">
              <p>
                <i className="fa-solid fa-face-grin-tongue-squint fa-lg"></i>
              </p>
              <div className="interestList">sports</div>
            </div>
          </div>
        </div>

        <p id="myPostTitle">My Posts</p>

        <PostCard
            userName={"Steve Rogers"}
            postTime={Date.now()}
            likeCount={13}
            commentCount={2}
            postText={"Hello world"}
          />
        

      </div>
    </main>
  );
}

export default Profile;
