import React from "react";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";

function PostCard({userName, postTime, likeCount, commentCount, postText}) {
    var pastTime = Date.now() - postTime;

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
          <h4>Posted {pastTime} hrs ago</h4>
        </div>
        <div className="postSetting">
          <i className="fa-solid fa-ellipsis fa-2xl" id="postSet"></i>
        </div>
      </div>
      <div className="postingBody">
        <div className="postingSection">
          <div className="postWords">
            <h3>
              {postText}
            </h3>
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
