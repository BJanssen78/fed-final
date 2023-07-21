import React from "react";
import { useState } from "react";

export const LoginPage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userIdLoggedIn, setUserIdLoggedIn] = useState(0);

  const loginCheck = (username, password) => {
    const checkName = serverData.fetchedUserList.filter((usernameCheck) => {
      console.log(serverData.fetchedUserList);
      if (usernameCheck.toString().toLowerCase() === username) {
        setUserLoggedIn(true);
      }
    });
  };

  return (
    <React.Fragment>
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
                onClick={() => loginCheck(e.value.username, e.value.password)}
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
    </React.Fragment>
  );
};
