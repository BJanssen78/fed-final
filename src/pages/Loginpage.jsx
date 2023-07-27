import React from "react";
import { useState, useEffect } from "react";
import { FetchServer } from "../../functions/fetchServer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../functions/AuthContext";

export const LoginPage = ({ onLogoff }) => {
  const [serverData, setServerData] = useState(null);
  // const [userLoggedIn, handleLogoff] = useAuth();
  const fetchServerData = (data) => {
    setServerData(data);
  };
  const history = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userIdLoggedIn, setUserIdLoggedIn] = useState(0);
  const [userNameLoggedIn, setUserNameLoggedIn] = useState("");
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const loginCheck = async (username, password) => {
    const loggedInUser = serverData.fetchedUserList.find((user) => {
      const lowerCaseUsername = username.toLowerCase();
      return user.userName.toString().toLowerCase() === lowerCaseUsername;
    });

    if (loggedInUser) {
      if (password === loggedInUser.userPass) {
        const loginStateUserName = loggedInUser.userName;
        const loginStateUserId = loggedInUser.userID;
        setUserLoggedIn(true);
        // Update userIdLoggedIn with the user ID of the logged-in user
        setUserIdLoggedIn(loggedInUser.userID);
        console.log("User logged in:", username);
        console.log("User ID:", loggedInUser.userID);
        console.log("password matches");

        sessionStorage.setItem(
          "loginState",
          JSON.stringify({
            username: loginStateUserName,
            userID: loginStateUserId,
          })
        );

        history(-1);
      } else {
        console.log("Invalid credentials");
      }
    } else {
      console.log("Invalid credentials");
      setLoginErrorMsg("Invalid credentials");
    }
  };

  useEffect(() => {
    const loginState = sessionStorage.getItem("loginState");
    if (loginState) {
      const { username, userID } = JSON.parse(loginState);
      setUserLoggedIn(true);
      setUserIdLoggedIn(userID);
      setUserNameLoggedIn(username);
    }
  }, []);

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
                    handleLogoff();
                  }}
                  className="login-btn"
                >
                  yes
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history(-1);
                  }}
                  type="reset"
                  form="login-form"
                  className="login-btn"
                >
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
