import "./SavedPosts.css";
import { useNavigate, useLocation } from "react-router-dom";
import TopSettingBar from "./components/Header/TopSettingBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/fontawesome-free-solid";
import { faDoorOpen } from "@fortawesome/fontawesome-free-solid";
import PostCard from "./components/PostCard";
import React, { useState } from "react";
import { HOMEWEB, PROFILE } from "../constants/routes";
import { BackendConn } from "../constants/backendConn";
import axios from "axios";

function SavedPosts() {

    let navigate = useNavigate();
    const currUser = JSON.parse(localStorage.getItem("currentUser"));
    const [isLoading, setLoading] = useState(true);
    const [postSave, setPostSave] = useState([]);

    React.useEffect(() => {
        populatePosts();
    }, []);

    React.useEffect(() => { }, [postSave]);
    var populatePosts = () => {
        const response = axios.get(`${BackendConn}post/getSavedPosts/${currUser._id}`);
        response.then((response) => {
            if (response.status === 200) {
                setLoading(false);
                setPostSave(response.data);
            } else {
                alert("Something Went Wrong...");
            }
        });
    };

    return (
        <main className="profileContainer">
            <div className="itemFlex">
                <div className="backButton">
                    <a href={PROFILE}>
                        <button className="backFromProfile">&lt;Profile</button>
                    </a>
                </div>
                <div className="profileMainContainer">
                    <p id="myPostTitle">Saved Posts</p>
                    <div id="postHolder">
                        {isLoading ? (
                            <div>Loading</div>
                        ) : (
                            postSave.map((singlePost, index) => (
                                <PostCard
                                    key={index}
                                    topic={singlePost.TOPIC_ID.TOPIC_NAME}
                                    userName={singlePost.USER_ID.USER_USERNAME}
                                    postId={singlePost._id}
                                    anonymous={singlePost.IS_ANONYMOUS}
                                    postTime={singlePost.updatedAt}
                                    likeCount={singlePost.LIKES_COUNT}
                                    commentCount={singlePost.COMMENTS_COUNT}
                                    postText={singlePost.BODY}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SavedPosts;
