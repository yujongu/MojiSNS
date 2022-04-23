import React from 'react'
import "./PostDetail.css";
import { useNavigate, useParams } from "react-router-dom";

const PostDetail = (props) => {
    let navigate = useNavigate();
    const { postId } = useParams();

    return (
        <div>{postId}</div>
    )
}

export default PostDetail