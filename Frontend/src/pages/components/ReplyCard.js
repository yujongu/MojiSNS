import React from "react";
import "./ReplyCard.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../helperFunctions/datePretty";
import Linkify from 'react-linkify';
import CommentCard from './CommentCard'
import axios from "axios";
import { BackendConn } from "../../constants/backendConn";
import profileP from "../../images/profile.png";

function ReplyCard({
    commentId,
    postId,
    childName,
    parentId,
    postTime,
    commentText,
}) {
    let navigate = useNavigate();
    var pastTime = datePretty(postTime);
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

    return (
        <div className="commentReply">
            <img
                src={profileP}
                width="30"
                height="30"
                alt="Sample profile">
            </img>
            <div className="commentContent">
                <div className="commentWriter">
                    {childName}
                    <div className="replyDate">
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
            </div>

        </div>
    );
}


export default ReplyCard