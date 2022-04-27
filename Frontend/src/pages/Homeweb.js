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
  const [filteredTopics, setFilteredTopics] = useState([]);

  var postAnonymous = false;
  //window onload
  React.useEffect(() => {
    fetchTopics();
    populatePosts();
    eventListeners();
  }, []);

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

  //component did update
  React.useEffect(() => {}, [postData]);

  React.useEffect(() => {}, [interestList]);

  React.useEffect(() => {}, [filteredTopics]);

  var eventListeners = () => {
    var postingImg = document.getElementById("postingImg");
    var buttonForSelect = document.getElementById("buttonForSelect");

    var showWrite = document.getElementById("writePost");
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

  var populatePosts = () => {
    // const response = axios.get(`${BackendConn}post/getPosts`);
    const response = axios.get(`${BackendConn}post/getFeed/${currUser._id}`);
    response.then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setLoading(false);
        setPostData(response.data);
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var displaySelectedTopic = (e) => {
    if (e.target.style.backgroundColor !== "rgb(244, 177, 131)") {
      e.target.style.backgroundColor = "#F4B183";
      setFilteredTopics([...filteredTopics, e.target.textContent]);
    } else {
      e.target.style.backgroundColor = "#ffc368";
      var temp = filteredTopics;
      temp.splice(filteredTopics.indexOf(e.target.textContent), 1);
      setFilteredTopics([...temp]);
    }
  };
  
  var clearTopicFilters = () => {
    var a = document.querySelectorAll(".btnTopic")
    a.forEach((element) => {
      element.style.backgroundColor = ""
    })
    setFilteredTopics([]);
  }

  var fetchTopics = () => {
    const response = axios.get(`${BackendConn}topic/getTopics`);
    response.then((response) => {
      if (response.status === 200) {
        setInterestList(response.data);
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

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

  const handlePostText = (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 500) {
      alert("Posts are limited to 500 characters.");
      let str = String(e.target.value);
      e.target.value = str.slice(0, 500);
    }
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
          IS_ANONYMOUS: postAnonymous,
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

  var makeAnonymous = () => {
    console.log("Clicked");
    var a = document.querySelector(".writeCard");
    var b = document.querySelector("#btnAnonymous");
    if (postAnonymous) {
      postAnonymous = false;
      a.style.backgroundColor = "#ffffff";
      b.textContent = "Make post Anonymous";
    } else {
      postAnonymous = true;
      a.style.backgroundColor = "#adadad";
      b.textContent = "Make post Public";
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
                localStorage.removeItem("Trustworthy");
                localStorage.removeItem("SearchRes");
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
                onChange={handlePostText}
              ></textarea>
            </form>
            <div className="writeFooter">
              <button id="buttonForSelect" className="btnSelect">
                Select a topic
              </button>
              <button
                id="btnAnonymous"
                className="btnSelect"
                onClick={makeAnonymous}
              >
                Make post anonymous
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
                {interestList.map((interest, index) => (
                  <div
                    className="topicItems"
                    key={index}
                    onClick={() => {
                      itemSelectColorChange(index);
                    }}
                  >
                    <TopicItem topicName={interest.TOPIC_NAME} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="viewByTopic">
          <div className="Homeweb-topics_filter_reset_container">
            <h2 className="titleWeb2">View By Topic</h2>
            <button onClick={clearTopicFilters}>Clear Filter</button>
          </div>

          <div className="outer">
            {interestList.map((element, index) => (
              <div>
                <button
                  key={index}
                  className="btnTopic"
                  onClick={displaySelectedTopic}
                >
                  {element.TOPIC_NAME}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="timeline">
          <h2 className="titleWeb2">Timeline</h2>
          <div id="postHolder">
            {isLoading ? (
              <div>Loading</div>
            ) : (
              postData.map(
                (singlePost, index) =>
                  // console.log(singlePost.TOPIC_ID.TOPIC_NAME)
                  filteredTopics.length !== 0 ? (
                    filteredTopics.indexOf(singlePost.TOPIC_ID.TOPIC_NAME) !==
                    -1 ? (
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
                    ) : (
                      <div></div>
                    )
                  ) : (
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
                  )
                // <PostCard
                //   key={index}
                //   topic={singlePost.TOPIC_ID.TOPIC_NAME}
                //   userName={singlePost.USER_ID.USER_USERNAME}
                //   postId={singlePost._id}
                //   anonymous={singlePost.IS_ANONYMOUS}
                //   postTime={singlePost.updatedAt}
                //   likeCount={singlePost.LIKES_COUNT}
                //   commentCount={singlePost.COMMENTS_COUNT}
                //   postText={singlePost.BODY}
                // />
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Homeweb;
