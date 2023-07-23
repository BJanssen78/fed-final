import React from "react";
import { useState } from "react";
import { FetchServer } from "../../functions/fetchServer";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [serverData, setServerData] = useState(null);
  const fetchServerData = (data) => {
    setServerData(data);
  };
  const history = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userIdLoggedIn, setUserIdLoggedIn] = useState(0);
  // console.log(serverData.fetchedUserList);

  const loginCheck = async (username, password) => {
    const loggedInUser = serverData.fetchedUserList.find((user) => {
      const lowerCaseUsername = username.toLowerCase();
      return user.userName.toString().toLowerCase() === lowerCaseUsername;
    });

    if (loggedInUser) {
      if (password === loggedInUser.userPass) {
        setUserLoggedIn(true);
        // Update userIdLoggedIn with the user ID of the logged-in user
        setUserIdLoggedIn(loggedInUser.userID);
        console.log("User logged in:", username);
        console.log("User ID:", loggedInUser.userID);
        console.log("password matches");

        history(-1);
      } else {
        console.log("Invalid credentials");
      }
    } else {
      console.log("Invalid credentials");
    }
  };

  return (
    <React.Fragment>
      <FetchServer onDataFetched={fetchServerData} />

      {userLoggedIn ? (
        <div className="login-body">
          <div className="login-container">
            <p>Are you sure you want to logoff?</p>
            <form id="login-form">
              <div className="login-btn-container">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setUserLoggedIn(false);
                    setUserIdLoggedIn(0);
                  }}
                  className="login-btn"
                >
                  yes
                </button>
                <button type="reset" form="login-form" className="login-btn">
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
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
                autoComplete="current-password"
                required
              />
              <div className="login-btn-container">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const username = document
                      .getElementById("username")
                      .value.toLowerCase();
                    const password = document.getElementById("password").value;
                    loginCheck(username, password);
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
            <p>create new account</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
