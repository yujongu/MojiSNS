import React from "react";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../helperFunctions/datePretty";

function PostCard({
  userName,
  anonymous,
  postTime,
  likeCount,
  commentCount,
  postText,
}) {
  var pastTime = datePretty(postTime);
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="postingCard">
      <div className="postingHeader">
        <div className="postingProfile">
          {anonymous ? (
            <img
              className="postPP"
              src="anonymous_Img.png"
              alt="Sample profile"
            ></img>
          ) : (
            <img
              className="postPP"
              src="profile.png"
              alt="Sample profile"
            ></img>
          )}
        </div>
        <div className="postingWriter">
          {anonymous ? (
            userName === currUser.USER_USERNAME ? (
              <h3>HIDDEN USER - me</h3>
            ) : (
              <h3>HIDDEN USER</h3>
            )
          ) : (
            <h3>{userName}</h3>
          )}
        </div>
        <div className="dateWritten">
          <h4>Posted {pastTime} ago</h4>
        </div>
        <div className="postSetting">
          <i className="fa-solid fa-ellipsis fa-2xl" id="postSet"></i>
          <div className="postSetting_content">
            <button>Delete</button>
            <button>Edit</button>
          </div>
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
