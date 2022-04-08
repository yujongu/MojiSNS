import React from "react";
import { useState, useEffect } from "react";
import "./NewInterest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";

function NewInterest() {
  let navigate = useNavigate();

  const initUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setLoading] = useState(true);
  const [fetchedTopics, setFetchedTopics] = useState([]);

  const [topics, setTopics] = useState([]);

  React.useEffect(() => {
    getAvailableTopics();
    // setTopics(initUser.FOLLOWING_TOPICS);
    var tHolder = [];
    initUser.FOLLOWING_TOPICS_Obj.forEach((element) => {
      console.log(element);
      tHolder.push(element.TOPIC_NAME);
    });
    console.log(tHolder);
    setTopics(tHolder);

    var a = document.querySelectorAll(".interests_buttons");
    a.forEach((element) => {
      console.log(element);
      if (topics.indexOf(element.textContent) != -1) {
        element.style.backgroundColor = "#F4B183";
      }
    });
  }, []);

  //component did update
  React.useEffect(() => {
    var a = document.querySelectorAll(".interests_buttons");
    a.forEach((element) => {
      // if (topics.indexOf(element.textContent) != -1) {
      //   element.style.backgroundColor = "#F4B183";
      // } else {
      //   element.style.backgroundColor = "#FBE5D6";
      // }
    });
  }, [topics]);

  var getAvailableTopics = () => {
    const response = axios.get(`${BackendConn}topic/getTopics`);
    response.then((response) => {
      if (response.status === 200) {
        setFetchedTopics(response.data);
        setLoading(false);
      } else {
        alert("Something Went Wrong...");
      }
    });
  };

  var handleItemInsert = (element) => {
    console.log(element.target);
    if (topics.indexOf(element.target.textContent) == -1) {
      setTopics([...topics, element.target.textContent]);
    } else {
      var nTopics = topics;
      nTopics.splice(topics.indexOf(element.target.textContent), 1);
      setTopics([...nTopics]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var me = JSON.parse(localStorage.getItem("currentUser"));
    var myId = me._id;

    const response = await axios.patch(
      `${BackendConn}user/updateUser/${myId}`,
      {
        FOLLOWING_TOPICS: topics,
      }
    );
    if (response.status == 200 && response.data._id === myId) {
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      navigate("/profile");
    }
  };

  return (
    <main className="newinterestMain">
      <div className="newinterestContainer">
        <div className="topics" id="topic_title">
          <p>Change your interests!</p>
        </div>

        <div className="Interests">
          {isLoading ? (
            <div>Loading</div>
          ) : (
            fetchedTopics.map((element, index) => (
              <button
                key={index}
                type="submit"
                className="interests_buttons"
                onClick={handleItemInsert}
              >
                {element.TOPIC_NAME}
              </button>
            ))
          )}
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
