import React from "react";

export const LoginPage = () => {
  return (
    <React.Fragment>
      <div className="login-body">
        <div className="login-container">
          <p>enter your credentials</p>
          <input
            className="login-item"
            type="text"
            id="username"
            placeholder="username"
          />
          <input
            className="login-item"
            type="password"
            id="password"
            placeholder="password"
          />
          <div className="login-btn-container">
            <button className="login-btn">Submit</button>
            <button className="login-btn">Reset</button>
          </div>
          <p>create new account</p>
        </div>
      </div>
    </React.Fragment>
  );
};
