import React, { useEffect, useRef, useState } from "react";
import "./PostCard.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../helperFunctions/datePretty";
import Linkify from "react-linkify";
import axios from "axios";
import { BackendConn } from "../../constants/backendConn";
import Homeweb from "../Homeweb";

function PostCard({
  topic,
  userName,
  postId,
  anonymous,
  postTime,
  likeCount,
  commentCount,
  postText,
}) {
  let navigate = useNavigate();

  var pastTime = datePretty(postTime);
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const postLink = `/postDetail/${postId}`;
  const [isLoading, setLoading] = useState(true);

  const colorLike = useRef();
  const refLikeCount = useRef();
  const updatePosting = useRef();
  const updateText = useRef();


  var divElement = null;
  var divLikeCount = null;
  var divUpdatePost = null;
  var divUpdateText = null;



  useEffect(() => {
    axios.post(`${BackendConn}post/isLiked/${postId}/${currUser._id}`).then(response => {
      setLoading(false);
      divElement = colorLike.current;
      divLikeCount = refLikeCount.current;
      divUpdatePost = updatePosting.current;
      if (response.data === "Yes") {
        console.log("change color");
        divElement.style.color = "#E26714";
        divLikeCount = likeCount;
        divUpdatePost = updatePosting.current;
      }
      else {
        divElement.style.color = "#000000";
        divLikeCount = likeCount;
        divUpdatePost = updatePosting.current;
      }
    });
    divUpdatePost = updatePosting.current;
  }, []);



  if (isLoading) {
    return <div>Loading...</div>;
  }




  var likePostFunc = (e) => {
    divElement = colorLike.current;
    divLikeCount = refLikeCount.current;
    if (divElement.style.color === "rgb(0, 0, 0)") {
      divElement.style.color = "#E26714";
      divLikeCount.textContent = parseInt(divLikeCount.textContent) + 1;
      axios.post(`${BackendConn}post/likePost/${postId}/${currUser._id}`).then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log("success liked");
        }
        else {
          alert("Liked failed");
        }
      })
    } else {
      divElement.style.color = "#000000";
      divLikeCount.textContent = parseInt(divLikeCount.textContent) - 1;
      axios.post(`${BackendConn}post/unlikePost/${postId}/${currUser._id}`).then((res) => {
        console.log(res)
        if (res.status === 200) {
          console.log("success unliked");
        }
        else {
          alert("Liked failed");
        }
      })
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
    activateUpdate();
  };

  var activateUpdate = () => {
    divUpdatePost = updatePosting.current;
    if (divUpdatePost.style.display === "block") {
      divUpdatePost.style.display = "none";
      console.log("hide");
    } else {
      divUpdatePost.style.display = "block";
      console.log("show");
    }
  }

  var updatePost = (e) => {
    divUpdateText = updateText.current;
    axios.patch(`${BackendConn}post/updatePost/${postId}`, {
      BODY: divUpdateText.value,
    })
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        console.log("success update");
        cancelPost();
        window.location.reload();
      }
      else {
        alert("update failed");
      }
    })
  }

  var cancelPost = () => {
    divUpdateText = updateText.current;
    divUpdateText.value = "";
    activateUpdate();
  }

  return (
    <div>
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
            <h4>Updated {pastTime} ago</h4>
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
            <div className="postSetting">
              
            </div>
          )}
        </div>
        <div className="postCard_topic_section">
          Topic: <span>{topic}</span>
        </div>
        <div className="postingBody">
          <div className="postingSection">
            <div className="postWords">
              <Linkify
                componentDecorator={(decoratedHref, postText, key) => (
                  <a target="blank" href={decoratedHref} key={key}>
                    {postText}
                  </a>
                )}
              >{postText}</Linkify>
            </div>
          </div>
          <div className="iconSection">
            <div className="likeSection" ref={colorLike}>
              <i
                className="fa-regular fa-thumbs-up fa-2xl"
                id="like"
                onClick={likePostFunc}
              ></i>
              <div className="likeCount" id="likeNum" ref={refLikeCount}>
                {likeCount}
              </div>
            </div>
            <div
              className="commentSection"
              onClick={() => {
                navigate(postLink);
              }}
            >
              <i className="fa-regular fa-comment-dots fa-2xl"></i>
              <h5 className="commentCount">{commentCount}</h5>
            </div>
          </div>
        </div>
      </div>
      <div ref={updatePosting} className="updatePost">
        <div className="writeTitleC">Update the post!</div>
        <div className="writeCardC">
          <form className="commentForm">
            <textarea
              className="replyWrite"
              ref={updateText}
              placeholder="Update the post here!"
            ></textarea>
          </form>
          <div className="writeFooterC">
            <button className="btnUploadC" onClick={updatePost}>
              Update
            </button>
            <button className="btnCancelC" onClick={cancelPost}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
