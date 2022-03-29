// import React from "react";
import "./UserSearchResult.css";
import { useNavigate } from "react-router-dom";
import UserInfoShort from "./components/UserInfo/UserInfoShort";
function UserSearchResult() {
  let navigate = useNavigate();
  var d = JSON.parse(localStorage.getItem("SearchRes"));
  console.log("This is SearchRes");
  console.log(d);
  return (
    <main className="searchResMain">
      <div className="searchResContainer">
        <h1>Search Result</h1>
        <div className="innerResContainer">
          {d.map((singleUser, index) => (
            <UserInfoShort
              key={index}
              ind={index}
              username={singleUser.USER_USERNAME}
              uid={singleUser._id}
              showTime={false}
              time={""}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default UserSearchResult;
