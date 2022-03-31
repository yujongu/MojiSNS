import React from "react";
import { useState, useEffect } from "react";
import "./NewInterest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";



//var intList =[];

function NewInterest() {
  const initUser = JSON.parse(localStorage.getItem("currentUser"));
var inittopics = "";
console.log(initUser.FOLLOWING_TOPICS);
  let navigate = useNavigate();
  initUser.FOLLOWING_TOPICS.forEach((x) => {
    inittopics += `${x} `;
  });
   console.log("첫"+intList);
   var intList = inittopics.split(" ");
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  var topics = "";
  console.log(currUser.FOLLOWING_TOPICS);
  currUser.FOLLOWING_TOPICS.forEach((t) => {
    topics += `${t} `;
  });
  console.log("그냥: "+topics);

  var initsports = "";
  if (topics.indexOf("sports") != -1) {
    initsports = "#F4B183";
  } else {
    initsports = "#FBE5D6";
  }
  var initgame = "";
  if (topics.indexOf("game") != -1) {
    initgame = "#F4B183";
  } else {
    initgame = "#FBE5D6";
  }
  var initnews = "";
  if (topics.indexOf("news") != -1) {
    initnews = "#F4B183";
  } else {
    initnews = "#FBE5D6";
  }
  var initliterature = "";
  if (topics.indexOf("literature") != -1) {
    initliterature = "#F4B183";
  } else {
    initliterature = "#FBE5D6";
  }
  var initmemes = "";
  if (topics.indexOf("memes") != -1) {
    initmemes = "#F4B183";
  } else {
    initmemes = "#FBE5D6";
  }
  var initbeauty = "";
  if (topics.indexOf("beauty") != -1) {
    initbeauty = "#F4B183";
  } else {
    initbeauty = "#FBE5D6";
  }
  var initmovies = "";
  if (topics.indexOf("movies") != -1) {
    initmovies = "#F4B183";
  } else {
    initmovies = "#FBE5D6";
  }
  var initanonymous = "";
  if (topics.indexOf("anonymous") != -1) {
    initanonymous = "#F4B183";
  } else {
    initanonymous = "#FBE5D6";
  }

  const [color1,setColor1]=useState(initsports);
  const [color2,setColor2]=useState(initgame);
  const [color3,setColor3]=useState(initnews);
  const [color4,setColor4]=useState(initliterature);
  const [color5,setColor5]=useState(initmemes);
  const [color6,setColor6]=useState(initbeauty);
  const [color7,setColor7]=useState(initmovies);
  const [color8,setColor8]=useState(initanonymous);


  const handleSubmit = async (e) => {
    e.preventDefault();

    var me = JSON.parse(localStorage.getItem("currentUser"));
    var myId = me._id;

    const response = await axios.patch(
      `${BackendConn}user/updateUser/${myId}`,
      {
        FOLLOWING_TOPICS: intList,
      }
    );
    console.log(response);
    if (response.status == 200 && response.data._id === myId) {
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      navigate("/profile");
    }
  };

  var counter = 0;

  return (
    <main className="newinterestMain">
      {/* <form onSubmit={handleSubmit}> */}

      {/* <div className="Sex">
      <button style={{background:color,color:textColor}} className='btn btn-primary' 
      onClick={()=>{
          console.log("before add"+counter);
          counter++;
        if(counter%2 !=0 ) {
        setColor("FBE5D6");
        setTextColor('red');
        }else {
          setColor("red");
          setTextColor('black');
        }
        }}>
        Click here</button>
    </div> */}

      <div className="newinterestContainer">

        <div class="topics">
          <p4>Change your interests!</p4>
        </div>

        <div class="Interest1">
          <button
            type="button"
            style={{background:color1}}
            class="sports"
            onClick={() => {
              if (!intList.includes("sports")) {
                intList.push("sports");
                setColor1("#F4B183");
                console.log(intList);
              } else {
                var index1 = intList.indexOf("sports");
                intList.splice(index1, 1)
                setColor1("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            Sports
          </button>
          <button
            type="button"
            style={{background:color2}}
            class="game"
            onClick={() => {
              if (intList.indexOf("game") < 0) {
                intList.push("game");
                setColor2("#F4B183");
                console.log(intList);
              } else {
                var index2 = intList.indexOf("game");
                intList.splice(index2, 1)
                setColor2("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            Game
          </button>
          <button
            type="button"
            style={{background:color3}}
            class="news"
            onClick={() => {
              if (intList.indexOf("news") < 0) {
                intList.push("news");
                setColor3("#F4B183");
                console.log(intList);
              } else {
                var index3 = intList.indexOf("news");
                intList.splice(index3, 1)
                setColor3("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            News
          </button>
        </div>

        <div class="Interest2">
          <button
            type="button"
            style={{background:color4}}
            class="literature"
            onClick={() => {
              if (intList.indexOf("literature") < 0) {
                intList.push("literature");
                setColor4("#F4B183");
                console.log(intList);
              } else {
                var index4 = intList.indexOf("literature");
                intList.splice(index4, 1)
                setColor4("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            Literature
          </button>
          <button
            type="button"
            style={{background:color5}}
            class="sports"
            onClick={() => {
              if (intList.indexOf("memes") < 0) {
                intList.push("memes");
                setColor5("#F4B183");
                console.log(intList);
              } else {
                var index5 = intList.indexOf("memes");
                intList.splice(index5, 1)
                setColor5("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            Memes
          </button>
          <button
            type="button"
            style={{background:color6}}
            class="beauty"
            onClick={() => {
              if (intList.indexOf("beauty") < 0) {
                intList.push("beauty");
                setColor6("#F4B183");
                console.log(intList);
              } else {
                var index6 = intList.indexOf("beauty");
                intList.splice(index6, 1)
                setColor6("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            Beauty
          </button>
        </div>

        <div class="Interest3">
          <button
            type="button"
            style={{background:color7}}
            class="movies"
            onClick={() => {
              if (intList.indexOf("movies") < 0) {
                intList.push("movies");
                setColor7("#F4B183");
                console.log(intList);
              } else {
                var index7 = intList.indexOf("movies");
                intList.splice(index7, 1)
                setColor7("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            Movies
          </button>
          <button
            type="button"
            style={{background:color8}}
            class="anonymous"
            onClick={() => {
              if (intList.indexOf("anonymous") < 0) {
                intList.push("anonymous");
                setColor8("#F4B183");
                console.log(intList);
              } else {
                var index8 = intList.indexOf("anonymous");
                intList.splice(index8, 1)
                setColor8("#FBE5D6");
                console.log(intList);
              }
            }}
          >
            Anonymous
          </button>
        </div>

        <div class="Finish">
          <button type="submit" class="finished" onClick={handleSubmit}>
            Finish
          </button>
        </div>
      </div>
      {/* </form> */}
    </main>
  );
}

export default NewInterest;
