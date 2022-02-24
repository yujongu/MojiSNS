import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import TopSettingBar from "./components/Header/TopSettingBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/fontawesome-free-solid";
import { fas } from "@fortawesome/free-solid-svg-icons";
function Profile() {
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
                <p id="prof_name">Steve Rogers</p>
                <p id="prof_username">Iceman</p>
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
                <i class="fa-solid fa-face-grin-tongue-squint fa-lg"></i>
              </p>
              <div className="interestList">sports</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
