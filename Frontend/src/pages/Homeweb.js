import React from 'react'
import "./Homeweb.css"
import { useNavigate } from "react-router-dom";


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
      }
      else {
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
      }
      else {
        showWrite.style.display = "block";
        console.log("show");
      }
    });

    var showTopicList = document.getElementById("writeSelectTopic");
    
    buttonForSelect.addEventListener("click",function topicListShow(){
      if(showTopicList.style.display === "flex"){
        showTopicList.style.display = "none";
        console.log("hide");
      }
      else{
        showTopicList.style.display = "flex";
        console.log("show");
      }
    });
    

    document.querySelectorAll("textarea").forEach(function (a) {
      a.addEventListener("input", function () {
        var setHeight = window.getComputedStyle(this);
        this.style.height = "auto";
        this.style.height = (this.scrollHeight + parseInt(setHeight.getPropertyValue("border-top-width")) + parseInt(setHeight.getPropertyValue("border-bottom-width"))) + "px";
      });
    });
  }
  return (
    <main className="homewebMain">
      <div className="center1">
        <div className='header'>
          <div className="headerApp">
            <h2 class="titleWeb">
              Welcome to Moji!
            </h2>
          </div>
          <div className='bt1'>
            <button
              class='settings'
            >
              Settings
            </button>
          </div>
        </div>
        <div className="tabBar">
          <div class="grid-container">
            <div class="grid-item">
              <a href='/profile'>
                <img src="profile.png" alt="Sample profile" width="140" height="140"></img>
                <h3 className="tabText">
                  Profile
                </h3>
              </a>
            </div>
            <div class="grid-item">
              <a href='/follower'>
                <img src="follower.png" alt="Sample profile" width="140" height="140"></img>
                <h3 className="tabText">
                  Follower
                </h3>
              </a>
            </div>
            <div class="grid-item">
              <a href='/following'>
                <img src="following.png" alt="Sample profile" width="140" height="140"></img>
                <h3 className="tabText">
                  Following
                </h3>
              </a>
            </div>
            <div class="grid-item">
              <img src="posting.png" alt="Sample profile" width="140" height="140" id="postingImg"></img>
              <h3 className="tabText">
                Posting
              </h3>
            </div>
          </div>
        </div>
        <div id="writePost">
          <h2 class="writeTitle">
            Write a post!
          </h2>
          <div className='writeCard'>
            <form>
              <textarea id="postWriteID" placeholder='What do you want to share?'>
              </textarea>
            </form>
            <div className='writeFooter'>
              <button id="buttonForSelect" className='btnSelect'>
                Select a topic
              </button>
              <button className='btnUpload'>
                Upload
              </button>
              <button className='btnCancel'>
                Cancel
              </button>
            </div>
            <div id="writeSelectTopic">
              <div className="topicList">
                asdfasdfasdf
              </div>
            </div>
          </div>
        </div>
        <div className="viewByTopic">
          <h2 class="titleWeb2">
            View By Topic
          </h2>
          <div class="outer">
            <div>
              <button className='btnTopic'>
                Sports
              </button>
            </div>
            <div>
              <button className='btnTopic'>
                Games
              </button>
            </div>
            <div>
              <button className='btnTopic'>
                Beauty
              </button>
            </div>
            <div>
              <button className='btnTopic'>
                Movies
              </button>
            </div>
            <div>
              <button className='btnTopic'>
                Memes
              </button>
            </div>
          </div>
        </div>
        <div className='timeline'>
          <h2 class="titleWeb2">
            Timeline
          </h2>
          <div className='postingCard'>
            <div className='postingHeader'>
              <div className='postingProfile'>
                <img className="postPP" src="profile.png" alt="Sample profile"></img>
              </div>
              <div className='postingWriter'>
                <h3>
                  Hello Name
                </h3>
              </div>
              <div className='dateWritten'>
                <h4>
                  Posted 00 hrs ago
                </h4>
              </div>
              <div className='postSetting'>
                <i class="fa-solid fa-ellipsis fa-2xl" id="postSet"></i>
              </div>
            </div>
            <div className='postingBody'>
              <div className='postingSection'>
                <div className='postWords'>
                  <h3>
                    Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text Sample Text
                  </h3>
                </div>
              </div>
              <div className='iconSection'>
                <div className='likeSection'>
                  <i class="fa-regular fa-thumbs-up fa-2xl" id='like'></i>
                  <div className='likeCount' id='likeNum'>
                    100
                  </div>
                </div>
                <div className='commentSection'>
                  <i class="fa-regular fa-comment-dots fa-2xl"></i>
                  <h5 className='commentCount'>
                    23
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Homeweb