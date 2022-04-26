import React, { useEffect, useState } from "react";
import "./CommentCard.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../helperFunctions/datePretty";
import ReplyCard from "./ReplyCard";
import axios from "axios";
import { BackendConn } from "../../constants/backendConn";
import profileP from "../../images/profile.png";


function CommentCard({
    commentId,
    postId,
    childName,
    parentId,
    postTime,
    likeCount,
    commentText,
}) {

    const [isLoading, setLoading] = useState(true);
    const [replyData, setReplyData] = useState([]);

    let navigate = useNavigate();

    var pastTime = datePretty(postTime);
    var showReply = document.getElementById(commentId);


    React.useEffect(() => {
        // Update the document title using the browser API
        showReply = document.getElementById(commentId);
    });

    React.useEffect(() => { }, [replyData]);

    const currUser = JSON.parse(localStorage.getItem("currentUser"));

    var openCommentSetting = (el) => {
        el.target.nextSibling.classList.toggle("show");
    };

    var deleteTargetComment = (el) => {
        console.log(`delete post clicked ${el.target}, ${postId}`);
        if (window.confirm("Would you really like to delete this comment?")) {
            axios.delete(`${BackendConn}comment/deleteComment/${commentId}`).then((res) => {
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

    var editTargetComment = (el) => {
        console.log(`edit post clicked, ${el.target}`);
    };

    var likeCommentFunc = (e) => {
        console.log(e.target.style.color);
        if (e.target.style.color === "rgb(0, 0, 0)") {
            console.log("add like");
            e.target.style.color = "#E26714";
            e.target.nextSibling.style.color = "#E26714";
            e.target.nextSibling.textContent = parseInt(e.target.nextSibling.textContent) + 1;
              axios.post(`${BackendConn}post/likeComment/${commentId}/${currUser._id}`).then((res) =>{
                console.log(res)
                if(res.status === 200)
                {
                  console.log("success liked");
                }
                else{
                  alert("Liked failed");
                }
              })
        } else {
            console.log("delete like");
            e.target.style.color = "#000000";
            e.target.nextSibling.style.color = "#000000";
            e.target.nextSibling.textContent = parseInt(e.target.nextSibling.textContent) - 1;
            axios.post(`${BackendConn}post/unlikeComment/${commentId}/${currUser._id}`).then((res) =>{
              console.log(res)
              if(res.status === 200)
              {
              }
              else{
                alert("Liked failed");
              }
            })
        }
    }

    var activateReply = (el) => {
        if (showReply.style.display === "block") {
            showReply.style.display = "none";
            console.log("hide");
        } else {
            showReply.style.display = "block";
            console.log("show");
        }
    }

    return (
        <div className="commentCard" >
            <img
                src={profileP}
                width="30"
                height="30"
                alt="Sample profile">
            </img>
            <div className="commentContent">
                <div className="commentWriter">
                    {childName}
                    <div className="commentDate">
                        Commented {pastTime} ago
                    </div>
                    {childName === currUser.USER_USERNAME ? (
                        <div className="commentSetting">
                            <i
                                className="fa-solid fa-ellipsis fa-2xl"
                                id="postSet"
                                onClick={openCommentSetting}

                            ></i>
                            <div id="mDropdown" className="postSetting_content">
                                <div onClick={deleteTargetComment}>Delete</div>
                                <div onClick={editTargetComment}>Edit</div>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="commentContentText">
                    {commentText}
                </div>
                <div className="commentFooter">
                    <div className="likeCommentSec">
                        <i
                            className="fa-regular fa-thumbs-up fa-xl"
                            id="likeComment"
                            onClick={likeCommentFunc}
                        ></i>
                        <div className="likeCountComment" id="likeNum">
                            {likeCount}
                        </div>
                    </div>
                    <div className="commentReplySec" onClick={activateReply}>
                        <i className="fa-regular fa-comment-dots fa-2xl"
                            id="commentReply"
                        ></i>
                    </div>
                </div>
                <div id={commentId} className="writeReply">
                    <hr class="solid" />
                    <div>
                        {isLoading ? (
                            <div>Loading</div>
                        ) : (
                            replyData.map((singleReply, index) => (
                                <ReplyCard
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CommentCard