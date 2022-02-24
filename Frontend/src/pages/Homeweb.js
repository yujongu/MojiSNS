import React from "react";
import "./Homeweb.css";
import { useNavigate } from "react-router-dom";
import PostCard from "./components/PostCard";

const Homeweb = () => {
  let navigate = useNavigate();
  window.onload = function () {
    var like = document.getElementById("like");
    var likeNum = document.getElementById("likeNum");
    var postSet = document.getElementById("postSet");

    var stateLike = 0;
    like.addEventListener("click", function () {
      if (stateLike == 1) {
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
    <main className="homewebMain">
      <div className="center1">
        <div className="header">
          <div className="headerApp">
            <h2 class="titleWeb">Welcome to Moji!</h2>
          </div>
          <div className="bt1">
            <button class="settings">Settings</button>
          </div>
        </div>
        <div className="tabBar">
          <div class="grid-container">
            <div class="grid-item">
              <a href="/profile">
                <img
                  src="profile.png"
                  alt="Sample profile"
                  width="140"
                  height="140"
                ></img>
                <h3 className="tabText">Profile</h3>
              </a>
            </div>
            <div class="grid-item">
              <a href="/follower">
                <img
                  src="follower.png"
                  alt="Sample profile"
                  width="140"
                  height="140"
                ></img>
                <h3 className="tabText">Follower</h3>
              </a>
            </div>
            <div class="grid-item">
              <a href="/following">
                <img
                  src="following.png"
                  alt="Sample profile"
                  width="140"
                  height="140"
                ></img>
                <h3 className="tabText">Following</h3>
              </a>
            </div>
            <div class="grid-item">
              <a href="/posting">
                <img
                  src="posting.png"
                  alt="Sample profile"
                  width="140"
                  height="140"
                ></img>
                <h3 className="tabText">Posting</h3>
              </a>
            </div>
          </div>
        </div>
        <div className="viewByTopic">
          <h2 class="titleWeb2">View By Topic</h2>
          <div class="outer">
            <div>
              <button className="btnTopic">Sports</button>
            </div>
            <div>
              <button className="btnTopic">Games</button>
            </div>
            <div>
              <button className="btnTopic">Beauty</button>
            </div>
            <div>
              <button className="btnTopic">Movies</button>
            </div>
            <div>
              <button className="btnTopic">Memes</button>
            </div>
          </div>
        </div>
        <div className="timeline">
          <h2 class="titleWeb2">Timeline</h2>

          <PostCard
            userName={"Steve Rogers"}
            postTime={Date.now()}
            likeCount={13}
            commentCount={2}
            postText={"Hello world"}
          />

          <PostCard
            userName={"Tony Stark"}
            postTime={Date.now()}
            likeCount={37}
            commentCount={102}
            postText={"OMG "}
          />
        </div>
      </div>
    </main>
  );
};

export default Homeweb;
