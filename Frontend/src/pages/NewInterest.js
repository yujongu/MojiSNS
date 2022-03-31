import React from "react";
import { useState, useEffect } from "react";
import "./Interest.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BackendConn } from "../constants/backendConn";
var intList = [];

function NewInterest() {
  let navigate = useNavigate();
  const [color1,setColor1]=useState('#FBE5D6');
  const [color2,setColor2]=useState('#FBE5D6');
  const [color3,setColor3]=useState('#FBE5D6');
  const [color4,setColor4]=useState('#FBE5D6');
  const [color5,setColor5]=useState('#FBE5D6');
  const [color6,setColor6]=useState('#FBE5D6');
  const [color7,setColor7]=useState('#FBE5D6');
  const [color8,setColor8]=useState('#FBE5D6');


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
      navigate("/login");
    }
  };

  var counter = 0;

  return (
    <main className="interestMain">
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

      <div className="interestContainer">
        <div class="logo"></div>

        <div class="topics">
          <p4>Tell us your interests!</p4>
        </div>

        <div class="Interest1">
          <button
            type="button"
            style={{background:color1}}
            class="sports"
            onClick={() => {
              if (intList.indexOf("sports") < 0) {
                intList.push("sports");
                setColor1("#F4B183");
                console.log(intList);
              } else {
                intList.pop("sports");
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
                intList.pop("game");
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
                intList.pop("news");
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
            class="sports"
            onClick={() => {
              if (intList.indexOf("literature") < 0) {
                intList.push("literature");
                setColor4("#F4B183");
                console.log(intList);
              } else {
                intList.pop("literature");
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
                intList.pop("memes");
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
                intList.pop("beauty");
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
                intList.pop("movies");
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
                intList.pop("anonymous");
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
