import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../functions/AuthContext";

export const Logoff = () => {
  const { handleLogoff } = useContext(AuthContext);
  const history = useNavigate();

  return (
    <React.Fragment>
      <div className="login-body">
        <div className="login-container">
          <p>Are you sure you want to logoff?</p>
          <form id="login-form">
            <div className="login-btn-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogoff();
                  history(-1);
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
    </React.Fragment>
  );
};
export default Logoff;
