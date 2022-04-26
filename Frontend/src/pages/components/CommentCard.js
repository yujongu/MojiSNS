import React, { useEffect } from "react";
import "./CommentCard.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../helperFunctions/datePretty";
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
    let navigate = useNavigate();

    var pastTime = datePretty(postTime);
    var showReply = document.getElementById(commentId);

    React.useEffect(() => {
        // Update the document title using the browser API
        showReply = document.getElementById(commentId);
    });

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
                </div>
            </div>
        </div>
    );
};
export default CommentCard