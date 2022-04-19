import React from "react";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../helperFunctions/datePretty";
import axios from "axios";
import { BackendConn } from "../../constants/backendConn";

function PostCard({
  userName,
  postId,
  anonymous,
  postTime,
  likeCount,
  commentCount,
  postText,
}) {
  var pastTime = datePretty(postTime);
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  var likePostFunc = (e) => {
    if (e.target.style.color === "rgb(0, 0, 0)") {
      e.target.style.color = "#E26714";
      e.target.nextSibling.style.color = "#E26714";
      e.target.nextSibling.textContent =
        parseInt(e.target.nextSibling.textContent) + 1;
    } else {
      e.target.style.color = "#000000";
      e.target.nextSibling.style.color = "#000000";
      e.target.nextSibling.textContent =
        parseInt(e.target.nextSibling.textContent) - 1;
    }
  };

  var openPostSetting = (e) => {
    e.target.nextSibling.classList.toggle("show");
  };

  var deleteTargetPost = (e) => {
    console.log(`delete post clicked ${e.target}, ${postId}`);
    if (window.confirm("Would you really like to delete this post?")) {
      axios.delete(`${BackendConn}post/deletePost/${postId}`).then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Deleted");
          window.location.reload();
        } else {
          alert("Something went wrong...");
        }
      });
    } else {
      alert("Canceled");
    }
  };

  var editTargetPost = (e) => {
    console.log(`edit post clicked, ${e.target}`);
  };

  React.useEffect(() => {
    document.querySelectorAll("#like").forEach((item, index) => {
      //check if I liked the post
      if (false) {
        console.log(item.style.color);
        console.log(index);
        item.style.color = "#E26714";
      } else {
        item.style.color = "#000000";
      }
    });
  }, []);

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
        {userName === currUser.USER_USERNAME ? (
          <div className="postSetting">
            <i
              className="fa-solid fa-ellipsis fa-2xl"
              id="postSet"
              onClick={openPostSetting}
            ></i>
            <div id="mDropdown" className="postSetting_content">
              <div onClick={deleteTargetPost}>Delete</div>
              <div onClick={editTargetPost}>Edit</div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="postingBody">
        <div className="postingSection">
          <div className="postWords">
            <h3>{postText}</h3>
          </div>
        </div>
        <div className="iconSection">
          <div className="likeSection">
            <i
              className="fa-regular fa-thumbs-up fa-2xl"
              id="like"
              onClick={likePostFunc}
            ></i>
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
