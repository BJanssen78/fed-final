import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FetchServer } from "../functions/fetchServer";

export const CreateNewUser = () => {
  const [serverData, setServerData] = useState(null);
  const serverURL = "http://localhost:3010/users";
  //   const serverURL = "../src/database/database.json";
  //   const serverURL = "../src/database/users";
  const sendHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const fetchServerData = (data) => {
    setServerData(data);
  };
  const navigateBack = useNavigate();

  const handleCreateUser = () => {
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const userId = serverData.fetchedUserList.length + 1;
    if (password === confirmPassword) {
      const newUser = {
        userID: userId,
        userName: username,
        userPass: password,
        userEmail: "user@server.nl",
        userRole: 1,
      };
      fetch(serverURL, {
        method: "POST",
        headers: sendHeaders,
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((json) =>
          console.log("This is the json response " + JSON.stringify(json))
        )
        .catch((error) => console.error("something went wrong ", error));
      navigateBack(-1);
    } else {
      console.log("creating failed, or password did not match");
    }
  };

  return (
    <React.Fragment>
      <FetchServer onDataFetched={fetchServerData} />
      <div className="login-body">
        <div className="login-container">
          <p>enter your credentials</p>
          <form id="login-form">
            <input
              className="login-item"
              type="text"
              id="username"
              placeholder="username"
              autoComplete="username"
              name="username"
              required
            />
            <input
              className="login-item"
              type="password"
              id="password"
              placeholder="password"
              name="password"
              autoComplete="new-password"
              required
            />
            <input
              className="login-item"
              type="password"
              id="confirm-password"
              placeholder="confirm password"
              name="confirm-password"
              required
            />
            <div className="login-btn-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleCreateUser();
                }}
                className="login-btn"
              >
                Submit
              </button>
              <button type="reset" form="login-form" className="login-btn">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default CreateNewUser;
