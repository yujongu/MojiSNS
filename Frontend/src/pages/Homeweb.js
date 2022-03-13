import React from "react";
import "./Homeweb.css";
import { useNavigate } from "react-router-dom";
import PostCard from "./components/PostCard";
import TopicView from "./components/TopicView/TopicView";
import TopicItem from "./components/TopicsBtn/TopicItem";
import { interestList } from "../constants/interests";
const Homeweb = () => {
  let navigate = useNavigate();
  window.onload = function () {
    var like = document.getElementById("like");
    var likeNum = document.getElementById("likeNum");
    var postSet = document.getElementById("postSet");
    var postingImg = document.getElementById("postingImg");
    var buttonForSelect = document.getElementById("buttonForSelect");

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

    var showWrite = document.getElementById("writePost");
    console.log(showWrite.style.display);
    postingImg.addEventListener("click", function () {
      if (showWrite.style.display === "block") {
        showWrite.style.display = "none";
        console.log("hide");
      } else {
        showWrite.style.display = "block";
        console.log("show");
      }
    });

    var showTopicList = document.getElementById("writeSelectTopic");

    buttonForSelect.addEventListener("click", function topicListShow() {
      if (showTopicList.style.display === "flex") {
        showTopicList.style.display = "none";
        console.log("hide");
      } else {
        showTopicList.style.display = "flex";
        console.log("show");
      }
    });

    document.querySelectorAll("textarea").forEach(function (a) {
      a.addEventListener("input", function () {
        var setHeight = window.getComputedStyle(this);
        this.style.height = "auto";
        this.style.height =
          this.scrollHeight +
          parseInt(setHeight.getPropertyValue("border-top-width")) +
          parseInt(setHeight.getPropertyValue("border-bottom-width")) +
          "px";
      });
    });
  };


  var selectedItem = -1;
  var sayHello = (index) => {
    selectedItem = index;
    var list = document.querySelectorAll(".topicItems")
    list.forEach((item) => {
      var itm = item.querySelector("button")
      if(itm.id == selectedItem) {
        itm.style.backgroundColor = "#F4B183"
      } else {
        itm.style.backgroundColor = "#FBE5D6"
      }
    })
  }

  var cancelPost = () => {
    console.log("post canceled")
    var a = document.getElementById("postWriteID")
    a.value = ""
    selectedItem = -1
    var itemList = document.querySelectorAll(".topicItems")
    itemList.forEach((item) => {
      item.querySelector("button").style.backgroundColor = "#FBE5D6"
    })
  }

  var uploadPost = () => {
    console.log("post upload")
    var a = document.getElementById("postWriteID")
    console.log(a.value)
    console.log(selectedItem)
    if(a.value === "") {
      alert("Please type what you want to share")
    } else if(selectedItem === -1) {
      alert("Please select a topic")
    } else {
      
    }
  }


  return (
    <main className="homewebMain">
      <div className="center1">
        <div className="header">
          <div className="headerApp">
            <h2 className="titleWeb">Welcome to Moji!</h2>
          </div>
          <div className="bt1">
            <button className="settings">Settings</button>
          </div>
        </div>
        <div className="tabBar">
          <div className="grid-container">
            <div className="grid-item">
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
            <div className="grid-item">
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
            <div className="grid-item">
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
            <div className="grid-item">
              <img
                src="posting.png"
                alt="Sample profile"
                width="140"
                height="140"
                id="postingImg"
              ></img>
              <h3 className="tabText">Posting</h3>
            </div>
          </div>
        </div>
        <div id="writePost">
          <h2 className="writeTitle">Write a post!</h2>
          <div className="writeCard">
            <form>
              <textarea
                id="postWriteID"
                placeholder="What do you want to share?"
              ></textarea>
            </form>
            <div className="writeFooter">
              <button id="buttonForSelect" className="btnSelect">
                Select a topic
              </button>
              <button className="btnUpload" onClick={uploadPost}>Upload</button>
              <button className="btnCancel" onClick={cancelPost}>Cancel</button>
            </div>
            <div id="writeSelectTopic">
              <div className="topicList">
                {interestList.map((interest, index) => (
                  <div className="topicItems" key={index} onClick={() => {sayHello(index)}}>
                    <TopicItem
                      topicName={interest}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="viewByTopic">
          <h2 className="titleWeb2">View By Topic</h2>
          <div className="outer">
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
          <h2 className="titleWeb2">Timeline</h2>

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
