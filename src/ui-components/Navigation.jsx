import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../functions/AuthContext";
import { LoginPage } from "../pages/Loginpage";

export const Navigation = ({ login, onLogoff }) => {
  const { userLoggedIn, handleLogoff } = useAuth();
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/fase/">Fase</Link>
          </li>
          <li>
            <Link to="/events/">Events</Link>
          </li>
          <li>
            <Link to="/">contact</Link>
          </li>
          <li className="split">
            {login ? (
              <Link to="/login" onLogoff={handleLogoff}>
                Logoff
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
