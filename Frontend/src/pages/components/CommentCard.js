import React, { useEffect, useRef, useState } from "react";
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

    const colorLike = useRef();
    const refLikeCount = useRef();
    const updateCommenting = useRef();
    const updateTextC = useRef();

    let navigate = useNavigate();

    var pastTime = datePretty(postTime);
    var showReply = document.getElementById(commentId);

    var divElement = null;
    var divLikeCount = null;
    var divUpdateComment = null;
    var divUpdateTextC = null;


    React.useEffect(() => {
        // Update the document title using the browser API
        showReply = document.getElementById(commentId);
        axios.post(`${BackendConn}comment/isLiked/${commentId}/${currUser._id}`).then(response => {
            divElement = colorLike.current;
            divLikeCount = refLikeCount.current;
            if (response.data === "Yes") {
                console.log("change color");
                divElement.style.color = "#E26714";
                divLikeCount = likeCount;
            }
            else {
                divElement.style.color = "#000000";
                divLikeCount = likeCount;
            }
        });
    });

    React.useEffect(() => { }, [replyData]);

    const currUser = JSON.parse(localStorage.getItem("currentUser"));

    var populateReplies = () => {
        const response = axios.get(`${BackendConn}comment/getReplies/${commentId}`);
        response.then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setLoading(false);
                setReplyData(response.data);
            } else {
                alert("Something Went Wrong...");
            }
        });
    };

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
        activateUpdateC();
    };

    var likeCommentFunc = (e) => {
        divElement = colorLike.current;
        divLikeCount = refLikeCount.current;
        if (divElement.style.color === "rgb(0, 0, 0)") {
            divElement.style.color = "#E26714";
            divLikeCount.textContent = parseInt(divLikeCount.textContent) + 1;
            axios.post(`${BackendConn}comment/likeComment/${commentId}/${currUser._id}`).then((res) => {
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
            axios.post(`${BackendConn}comment/unlikeComment/${commentId}/${currUser._id}`).then((res) => {
                console.log(res)
                if (res.status === 200) {
                }
                else {
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
            populateReplies();
        }
    }

    var cancelReply = () => {
        var replyWriteID = document.getElementById(commentId + "ta");
        replyWriteID.value = "";
    };

    var uploadReply = () => {
        var replyWriteID = document.getElementById(commentId + "ta");
        console.log(replyWriteID.value);
        if (replyWriteID.value === "") {
            alert("Please type what you want to share");
        }
        else {
            console.log("hello");
            axios
                .post(`${BackendConn}comment/addComment`, {
                    POST_ID: postId._id,
                    OWNER_ID: currUser._id,
                    CONTENT: replyWriteID.value,
                    PARENT_ID: commentId,
                })
                .then((response) => {
                    if (response.status == 200) {
                        //clear and hide
                        cancelReply();
                        populateReplies();
                        replyWriteID.value = "";
                        //bring and repopulate posts in timeline
                    } else {
                        alert("Something Went Wrong...");
                    }
                });
        }
    };

    var activateUpdateC = (el) => {
        divUpdateComment = updateCommenting.current;
        if (divUpdateComment.style.display === "block") {
            divUpdateComment.style.display = "none";
            console.log("hide");
        } else {
            divUpdateComment.style.display = "block";
            console.log("show");
        }
    }

    var updateComment = () => {
        divUpdateTextC = updateTextC.current;
    
      }
    
      var cancelComment = () => {
        divUpdateTextC = updateTextC.current;
        divUpdateTextC.value = "";
        activateUpdateC();
      }

    return (
        <div>
            {parentId === null ? (
                <div>
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
                                <div className="likeCommentSec" ref={colorLike}
                                >
                                    <i
                                        className="fa-regular fa-thumbs-up fa-xl"
                                        id="likeComment"
                                        onClick={likeCommentFunc}
                                    ></i>
                                    <div className="likeCountComment" id="likeNum" ref={refLikeCount}>
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
                                                commentId={singleReply._id}
                                                postId={singleReply.POST_ID}
                                                childName={singleReply.OWNER_ID.USER_USERNAME}
                                                parentId={singleReply.PARENT_ID}
                                                postTime={singleReply.updatedAt}
                                                commentText={singleReply.CONTENT}
                                            />
                                        ))
                                    )}
                                </div>
                                <hr class="solid" />
                                <div className="writeTitleC">Write a reply!</div>
                                <div className="writeCardC">
                                    <form className="commentForm">
                                        <textarea
                                            className="replyWrite"
                                            id={commentId + "ta"}
                                            placeholder="Write a reply here!"
                                        ></textarea>
                                    </form>
                                    <div className="writeFooterC">
                                        <button className="btnUploadC" onClick={uploadReply}>
                                            Upload
                                        </button>
                                        <button className="btnCancelC" onClick={cancelReply}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={updateCommenting} className="updateComment">
                        <div className="writeTitleC">Update the post!</div>
                        <div className="writeCardC">
                            <form className="commentForm">
                                <textarea
                                    className="replyWrite"
                                    ref={updateTextC}
                                    placeholder="Update the post here!"
                                ></textarea>
                            </form>
                            <div className="writeFooterC">
                                <button className="btnUploadC" onClick={updateComment}>
                                    Update
                                </button>
                                <button className="btnCancelC" onClick={cancelComment}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};
export default CommentCard