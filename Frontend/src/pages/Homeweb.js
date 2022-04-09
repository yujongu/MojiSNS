import React, { useEffect, useState } from "react";
import "./Homeweb.css";
import { useNavigate } from "react-router-dom";
import PostCard from "./components/PostCard";
import TopicItem from "./components/TopicsBtn/TopicItem";
import { BackendConn } from "../constants/backendConn";
import { NOTIFICATION, SEARCHRES } from "../constants/routes";
import {
  LOGIN,
  PROFILE,
  SETTING,
  FOLLOWER,
  FOLLOWING,
} from "../constants/routes";
import axios from "axios";

const Homeweb = () => {
  let navigate = useNavigate();
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const [isLoading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [interestList, setInterestList] = useState([]);
  //window onload
  React.useEffect(() => {
    fetchTopics();
    populatePosts();
    eventListeners();
  }, []);

  //component did update
  React.useEffect(() => {
    if (postData.length != 0) {
      postEventListeners();
    }
  }, [postData]);

  React.useEffect(() => {
  }, [interestList])

  var eventListeners = () => {
    var postingImg = document.getElementById("postingImg");
    var buttonForSelect = document.getElementById("buttonForSelect");

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

  var populatePosts = () => {
    // const response = axios.get(`${BackendConn}post/getPosts`);
    const response = axios.get(`${BackendConn}post/getFeed/${currUser._id}`);
    response.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setPostData(response.data);
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var fetchTopics = () => {
    const response = axios.get(`${BackendConn}topic/getTopics`);
    response.then((response) => {
      if (response.status === 200) {
        setInterestList(response.data);
      } else {
        alert("Something Went Wrong...");
      }
    });
  }

  var selectedItem = -1;
  var itemSelectColorChange = (index) => {
    selectedItem = index;
    var list = document.querySelectorAll(".topicItems");
    list.forEach((item) => {
      var itm = item.querySelector("button");
      if (itm.id == selectedItem) {
        itm.style.backgroundColor = "#F4B183";
      } else {
        itm.style.backgroundColor = "#FBE5D6";
      }
    });
  };

  var cancelPost = () => {
    var a = document.getElementById("postWriteID");
    a.value = "";
    selectedItem = -1;
    var itemList = document.querySelectorAll(".topicItems");
    itemList.forEach((item) => {
      item.querySelector("button").style.backgroundColor = "#FBE5D6";
    });
    document.getElementById("writePost").style.display = "none";
    document.getElementById("writeSelectTopic").style.display = "none";
  };

  var uploadPost = () => {
    var postWriteID = document.getElementById("postWriteID");

    if (postWriteID.value === "") {
      alert("Please type what you want to share");
    } else if (selectedItem === -1) {
      alert("Please select a topic");
    } else {
      axios
        .post(`${BackendConn}post/addPost`, {
          USER_ID: currUser._id,
          TOPIC_ID: interestList[selectedItem]._id,
          BODY: postWriteID.value,
        })
        .then((response) => {
          if (response.status == 200) {
            //clear and hide
            cancelPost();

            //bring and repopulate posts in timeline
            populatePosts();
          } else {
            alert("Something Went Wrong...");
          }
        });
    }
  };

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  var searchUser = () => {
    var searchUser = document.querySelector(".searchBox-homeweb > input").value;
    const $regex = escapeRegExp(searchUser);
    console.log(searchUser);
    console.log($regex);

    axios.get(`${BackendConn}user/findUserByUsername/${$regex}`).then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (res.data === "") {
          alert("No user found under that username");
        } else {
          //first remove myself from search res if exists
          var myDataInd = -1;
          res.data.forEach((item, index) => {
            if (item._id === currUser._id) {
              myDataInd = index;
              res.data.splice(myDataInd, 1);
            }
          });

          //store in local storage
          localStorage.setItem("SearchRes", JSON.stringify(res.data));
          navigate(SEARCHRES);
        }
      }
    });
  };

  return (
    <main className="homewebMain">
      <div className="center1">
        <div className="header">
          <div className="headerApp">
            <h2 className="titleWeb">Welcome to Moji!</h2>
          </div>
          <div className="hdrBtnContainer">
            
            <button
              className="notification"
              onClick={() => {
                navigate(NOTIFICATION);
              }}
            >
              Notifications
            </button>

            <button
              className="settings"
              onClick={() => {
                navigate(SETTING);
              }}
            >
              Settings
            </button>

            <button
              className="logout"
              onClick={() => {
                localStorage.removeItem("currentUser");
                navigate(LOGIN);
              }}
            >
              Log out
            </button>
          </div>
        </div>

        <div className="searchBox-homeweb">
          <input type="text" placeholder="Search user" />
          <button onClick={searchUser}>Search</button>
        </div>
        <div className="tabBar">
          <div className="grid-container">
            <div className="grid-item">
              <a href={PROFILE}>
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
              <a href={FOLLOWER}>
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
              <a href={FOLLOWING}>
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
              <button className="btnUpload" onClick={uploadPost}>
                Upload
              </button>
              <button className="btnCancel" onClick={cancelPost}>
                Cancel
              </button>
            </div>
            <div id="writeSelectTopic">
              <div className="topicList">
                {
                interestList.map((interest, index) => (
                  <div
                    className="topicItems"
                    key={index}
                    onClick={() => {
                      itemSelectColorChange(index);
                    }}
                  >
                    <TopicItem topicName={interest.TOPIC_NAME} index={index} />
                  </div>
                ))
                }
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
      </div>
    </main>
  );
};

export default Homeweb;
