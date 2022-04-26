import React, { useEffect, useState } from "react";
import "./PostDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";
import datePretty from "../helperFunctions/datePretty";
import CommentCard from "./components/CommentCard";
import profileP from "../images/profile.png";
import anonymousP from "../images/anonymous_Img.png"



const PostDetail = (props) => {
    let navigate = useNavigate();
    const { postId } = useParams();
    const [postData, setPostData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    var showComment = document.getElementById("writeComment")

    const currUser = JSON.parse(localStorage.getItem("currentUser"));


    let post_user;
    let anonymous;
    let postTime;
    let likeCount;
    let commentCount;
    let postText;


    function initPost() {
        const response = axios.get(`${BackendConn}post/getPost/${postId}`);
        response.then((response) => {
            if (response.status === 200) {
                setPostData(response.data);
            } else {
                alert("Something Went Wrong...");
            }
        });
    }



    useEffect(() => {
        let ignore = false;
        if (!ignore) initPost();
        return () => { ignore = true; }
    }, []);

    console.log(postData);
    if (postData.length !== 0) {
        post_user = postData.USER_ID.USER_USERNAME;
        console.log(post_user);
        anonymous = postData.IS_ANONYMOUS;
        postTime = postData.createdAt;
        var pastTime = datePretty(postTime);
        likeCount = postData.LIKES_COUNT;
        commentCount = postData.COMMENTS_COUNT;
        postText = postData.BODY;

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


    }

    React.useEffect(() => {
        populateComments();
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

    function activateComment() {
        if (showComment.style.display === "block") {
            showComment.style.display = "none";
            console.log("hide");
        } else {
            showComment.style.display = "block";
            console.log("show");
        }
    }

    var populateComments = () => {
        const response = axios.get(`${BackendConn}comment/getComments/${postId}`);
        response.then((response) => {
            if (response.status === 200) {
                console.log(response);
                setLoading(false);
                setCommentData(response.data);
            } else {
                alert("Something Went Wrong...");
            }
        });
    };

    var cancelComment = () => {
        var commentWriteID = document.getElementById("commentWriteID");
        commentWriteID.value = "";
    };

    var uploadComment = () => {
        var commentWriteID = document.getElementById("commentWriteID");
        if (commentWriteID.value === "") {
            alert("Please type what you want to share");
        }
        else {
            console.log("hello");
            axios
                .post(`${BackendConn}comment/addComment`, {
                    POST_ID: postId,
                    OWNER_ID: currUser._id,
                    CONTENT: commentWriteID.value,
                    PARENT_ID: null,
                })
                .then((response) => {
                    if (response.status == 200) {
                        //clear and hide
                        cancelComment();

                        populateComments();
                        commentWriteID.value = "";
                        //bring and repopulate posts in timeline
                    } else {
                        alert("Something Went Wrong...");
                    }
                });
        }
    };

    return (
        <main className="postContainer">
            <div className="itemFlex">
                <div className="backButton">
                    <a href="/home">
                        <button className="backFromProfile">
                            &lt;Home
                        </button>
                    </a>
                </div>
                <div className="postingCardDetail">
                    <div className="postingHeader">
                        <div className="postingProfile">
                            {anonymous ? (
                                <img
                                    className="postPP"
                                    src={anonymousP}
                                    alt="Sample profile"
                                ></img>
                            ) : (
                                <img
                                    className="postPP"
                                    src={profileP}
                                    alt="Sample profile"
                                ></img>
                            )}
                        </div>
                        <div className="postingWriter">
                            {anonymous ? (
                                post_user === currUser.USER_USERNAME ? (
                                    <h3>HIDDEN USER - me</h3>
                                ) : (
                                    <h3>HIDDEN USER</h3>
                                )
                            ) : (
                                <h3>{post_user}</h3>
                            )}
                        </div>
                        <div className="dateWritten">
                            <h4>Posted {pastTime} ago</h4>
                        </div>
                        {post_user === currUser.USER_USERNAME ? (
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
                            <div className="commentSection" onClick={activateComment}>
                                <i className="fa-regular fa-comment-dots fa-2xl"></i>
                                <h5 className="commentCount">{commentCount}</h5>
                            </div>
                        </div>
                    </div>
                    <div id="writeComment">
                        <hr class="solid" />
                        <h2 className="writeTitle">Comments</h2>
                        <div className="commentsTL">
                            {isLoading ? (
                                <div>Loading</div>
                            ) : (
                                commentData.map((singleComment, index) => (
                                    <CommentCard
                                        commentId={singleComment._id}
                                        postId={singleComment.POST_ID}
                                        childName={singleComment.OWNER_ID.USER_USERNAME}
                                        parentId={singleComment.PARENT_ID}
                                        postTime={singleComment.updatedAt}
                                        likeCount={singleComment.LIKES_COUNT}
                                        commentText={singleComment.CONTENT}
                                    />
                                ))
                            )}
                        </div>
                        <hr class="solid" />
                        <h2 className="writeTitle">Write a comment!</h2>
                        <div className="writeCard">
                            <form className="commentForm">
                                <textarea
                                    id="commentWriteID"
                                    placeholder="Write a comment here!"
                                ></textarea>
                            </form>
                            <div className="writeFooterC">
                                <button className="btnUploadC" onClick={uploadComment}>
                                    Upload
                                </button>
                                <button className="btnCancelC" onClick={cancelComment}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PostDetail