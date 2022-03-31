// import React from "react";
// import { useState, useEffect, setState } from "react";
// import "./NewInterest.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BackendConn } from "../constants/backendConn";
// var intList = [];

// function NewInterest() {
//   let navigate = useNavigate();
//   const currUser = JSON.parse(localStorage.getItem("currentUser"));
//   var topics = ""
//   console.log(currUser.FOLLOWING_TOPICS)
//   currUser.FOLLOWING_TOPICS.forEach(t => {
//     topics += `${t} `
//   });

//   const [color1,setColor1]=useState('#FBE5D6');
//   const [color2,setColor2]=useState('#FBE5D6');
//   const [color3,setColor3]=useState('#FBE5D6');
//   const [color4,setColor4]=useState('#FBE5D6');
//   const [color5,setColor5]=useState('#FBE5D6');
//   const [color6,setColor6]=useState('#FBE5D6');
//   const [color7,setColor7]=useState('#FBE5D6');
//   const [color8,setColor8]=useState('#FBE5D6');

//   if (topics.indexOf("sports") < 0) {
//     setColor1('#F4B183');
//   }
//   if (topics.indexOf("game") < 0) {
//     setColor2('#F4B183');
//   }
//   if (topics.indexOf("news") < 0) {
//     setColor3('#F4B183');
//   }
//   if (topics.indexOf("literature") < 0) {
//     setColor4('#F4B183');
//   }
//   if (topics.indexOf("memes") < 0) {
//     setColor5('#F4B183');
//   }
//   if (topics.indexOf("beauty") < 0) {
//     setColor6('#F4B183');
//   }
//   if (topics.indexOf("movies") < 0) {
//     setColor7('#F4B183');
//   }
//   if (topics.indexOf("anonoymous") < 0) {
//     setColor8('#F4B183');
//   }


//   return (
//     <main className="newinterestMain">

//       <div className="interestContainer">
//         <div class="logo"></div>

//         <div class="topics">
//           <p4>Tell us your interests!</p4>
//         </div>

//         <div class="Interest1">
//           <button
//             type="button"
//             style={{background:color1}}
//             class="sports"
//             onClick={() => {
//               if (topics.indexOf("sports") < 0) {
//                 topics.push("sports");
//                 setColor1("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("sports");
//                 setColor1("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             Sports
//           </button>
//           <button
//             type="button"
//             style={{background:color2}}
//             class="game"
//             onClick={() => {
//               if (topics.indexOf("game") < 0) {
//                 topics.push("game");
//                 setColor2("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("game");
//                 setColor2("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             Game
//           </button>
//           <button
//             type="button"
//             style={{background:color3}}
//             class="news"
//             onClick={() => {
//               if (topics.indexOf("news") < 0) {
//                 topics.push("news");
//                 setColor3("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("news");
//                 setColor3("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             News
//           </button>
//         </div>

//         <div class="Interest2">
//           <button
//             type="button"
//             style={{background:color4}}
//             class="literature"
//             onClick={() => {
//               if (topics.indexOf("literature") < 0) {
//                 topics.push("literature");
//                 setColor4("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("literature");
//                 setColor4("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             Literature
//           </button>
//           <button
//             type="button"
//             style={{background:color5}}
//             class="memes"
//             onClick={() => {
//               if (topics.indexOf("memes") < 0) {
//                 topics.push("memes");
//                 setColor5("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("memes");
//                 setColor5("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             Memes
//           </button>
//           <button
//             type="button"
//             style={{background:color6}}
//             class="beauty"
//             onClick={() => {
//               if (topics.indexOf("beauty") < 0) {
//                 topics.push("beauty");
//                 setColor6("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("beauty");
//                 setColor6("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             Beauty
//           </button>
//         </div>

//         <div class="Interest3">
//           <button
//             type="button"
//             style={{background:color7}}
//             class="movies"
//             onClick={() => {
//               if (topics.indexOf("movies") < 0) {
//                 topics.push("movies");
//                 setColor7("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("movies");
//                 setColor7("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             Movies
//           </button>
//           <button
//             type="button"
//             style={{background:color8}}
//             class="anonymous"
//             onClick={() => {
//               if (topics.indexOf("anonymous") < 0) {
//                 topics.push("anonymous");
//                 setColor8("#F4B183");
//                 console.log(topics);
//               } else {
//                 topics.pop("anonymous");
//                 setColor8("#FBE5D6");
//                 console.log(topics);
//               }
//             }}
//           >
//             Anonymous
//           </button>
//         </div>

//         <div class="Finish">
//           <button type="submit" class="finished" 
//         //   onClick={handleSubmit}
//           >
//             Finish
//           </button>
//         </div>
//       </div>
//       {/* </form> */}
//     </main>
//   );
// }

// export default NewInterest;
