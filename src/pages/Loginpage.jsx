import React from "react";
import { useContext } from "react";
import { AuthContext } from "../functions/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const navigateBack = useNavigate();

  const handleSubmit = () => {
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value;

    handleLogin(username, password);
    navigateBack(-1);
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
                onClick={(e) => {
                  e.preventDefault();
                  const username = document
                    .getElementById("username")
                    .value.toLowerCase();
                  const password = document.getElementById("password").value;
                  handleSubmit(username, password);
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
          <Link to="/CreateNewUser">Create new account</Link>
        </div>
      </div>
    </React.Fragment>
  );
};
export default LoginPage;
