import React from "react";
import { useState, useEffect } from "react";
import "./Interest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";

function Interest() {
  let navigate = useNavigate();

  const initUser = JSON.parse(localStorage.getItem("currentUser"));

  const [isLoading, setLoading] = useState(true);
  const [fetchedTopics, setFetchedTopics] = useState([]);

  const [topics, setTopics] = useState([]);

  React.useEffect(() => {
    getAvailableTopics();
    var a = document.querySelectorAll(".interests_buttons");
    a.forEach((element) => {
      if (topics.indexOf(element.textContent) != -1) {
        element.style.backgroundColor = "#F4B183";
      }
    });
    setTopics(initUser.FOLLOWING_TOPICS);
  }, []);

  React.useEffect(() => {}, [fetchedTopics]);

  //component did update
  React.useEffect(() => {
    var a = document.querySelectorAll(".interests_buttons");
    a.forEach((element) => {
      if (topics.indexOf(element.textContent) != -1) {
        element.style.backgroundColor = "#F4B183";
      } else {
        element.style.backgroundColor = "#FBE5D6";
      }
    });
    console.log(topics);
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
    var topicsId = [];
    fetchedTopics.forEach((element) => {
      if (topics.indexOf(element.TOPIC_NAME) != -1) {
        topicsId.push(element._id);
      }
    });
    console.log(topicsId);

    const response = await axios.patch(
      `${BackendConn}user/updateUser/${myId}`,
      {
        FOLLOWING_TOPICS_Obj: topicsId,
      }
    );
    console.log(response);
    if (response.status == 200 && response.data._id === myId) {
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      navigate("/login");
    }
  };

  return (
    <main className="interestMain">
      <div className="interestContainer">
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

export default Interest;
