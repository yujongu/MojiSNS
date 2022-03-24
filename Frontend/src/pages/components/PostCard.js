import React from "react";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";

function PostCard({ userName, postTime, likeCount, commentCount, postText }) {
  
  //Make time pretty
  var pTime = new Date(postTime);
  var pastTime;
  var timeDiff = Date.now() - pTime.getTime();
  timeDiff = Math.floor(timeDiff / 1000);
  if (timeDiff >= 0 && timeDiff < 60) {
    //seconds
    if (timeDiff === 0 || timeDiff === 1) {
      pastTime = `${timeDiff} sec`;
    } else {
      pastTime = `${timeDiff} secs`;
    }
  } else {
    //minutes
    timeDiff = Math.floor(timeDiff / 60);
    if (timeDiff >= 0 && timeDiff < 60) {
      pastTime = `${timeDiff} mins`;
    } else {
      //hours
      timeDiff = Math.floor(timeDiff / 60);
      if (timeDiff >= 0 && timeDiff < 60) {
        pastTime = `${timeDiff} hrs`;
      } else {
        //days
        timeDiff = Math.floor(timeDiff / 24);
        if (timeDiff >= 0 && timeDiff < 60) {
          pastTime = `${timeDiff} days`;
        } else {
          //years
          timeDiff = Math.floor(timeDiff / 365);
          pastTime = `${timeDiff} years`;
        }
      }
    }
  }

  return (
    <div className="postingCard">
      <div className="postingHeader">
        <div className="postingProfile">
          <img className="postPP" src="profile.png" alt="Sample profile"></img>
        </div>
        <div className="postingWriter">
          <h3>{userName}</h3>
        </div>
        <div className="dateWritten">
          <h4>Posted {pastTime} ago</h4>
        </div>
        <div className="postSetting">
          <i className="fa-solid fa-ellipsis fa-2xl" id="postSet"></i>
        </div>
      </div>
      <div className="postingBody">
        <div className="postingSection">
          <div className="postWords">
            <h3>{postText}</h3>
          </div>
        </div>
        <div className="iconSection">
          <div className="likeSection">
            <i className="fa-regular fa-thumbs-up fa-2xl" id="like"></i>
            <div className="likeCount" id="likeNum">
              {likeCount}
            </div>
          </div>
          <div className="commentSection">
            <i className="fa-regular fa-comment-dots fa-2xl"></i>
            <h5 className="commentCount">{commentCount}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
