import React from "react";
import { useState, useEffect } from "react";
import "./NewInterest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";

function NewInterest() {
    let navigate = useNavigate();

    const initUser = JSON.parse(localStorage.getItem("currentUser"));
    const [topics, setTopics] = useState(initUser.FOLLOWING_TOPICS);

    var totalTopics = ["sports", "game", "movies", "news", "memes", "literature", "beauty", "anonymous"]

    React.useEffect(() => {
        var a = document.querySelectorAll(".interests_buttons")
        a.forEach(( element) => {
            if(topics.indexOf(element.textContent) != -1) {
                element.style.backgroundColor = "#F4B183"
            }
        })
        setTopics(initUser.FOLLOWING_TOPICS)
    }, []);
    
      //component did update
      React.useEffect(() => {
        var a = document.querySelectorAll(".interests_buttons")
        a.forEach(( element) => {
            if(topics.indexOf(element.textContent) != -1) {
                element.style.backgroundColor = "#F4B183"
            } else {
                element.style.backgroundColor = "#FBE5D6"
            }
        })
      }, [topics]);
  
    var handleItemInsert = (element) => {
        if(topics.indexOf(element.target.textContent) == -1) {
            setTopics([...topics, element.target.textContent]);
        } else {
            var nTopics = topics
            nTopics.splice(topics.indexOf(element.target.textContent), 1)
            setTopics([...nTopics])
        }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    var me = JSON.parse(localStorage.getItem("currentUser"));
    var myId = me._id;


    const response = await axios.patch(
      `${BackendConn}user/updateUser/${myId}`,
      {
        FOLLOWING_TOPICS: topics,
      }
    )
    if (response.status == 200 && response.data._id === myId) {
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      navigate("/profile");
      alert("Success!")
    }
  };

  return (
    <main className="newinterestMain">
      <div className="newinterestContainer">
        <div className="topics" id="topic_title">
          <p>Change your interests!</p>
        </div>

        <div className="Interests">
        {
          totalTopics.map((element, index) => (

        <button key={index} type="submit" className="interests_buttons" onClick={handleItemInsert}>
          {element}
        </button>
          ))
          
        }
        </div>
        
        <div className="Finish">
          <button type="submit" className="finished" onClick={handleSubmit}>
            Finish
          </button>
        </div>
      </div>
    </main>
  );
}

export default NewInterest;
