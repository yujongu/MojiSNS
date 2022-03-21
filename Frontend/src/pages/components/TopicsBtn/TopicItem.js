
import React from "react";
import "./TopicItem.css";
import { useNavigate } from "react-router-dom";

function TopicItem({topicName, index}) {
    return (
    <button id={index} className="topicsItemContainer">
        <p>{topicName}</p>
    </button>
  );
}

export default TopicItem;
