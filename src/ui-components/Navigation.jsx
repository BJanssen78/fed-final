import React from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ loginStatus }) => {
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
          {loginStatus ? (
            <li>
              <Link to="/events/createNewEvent">New event</Link>
            </li>
          ) : null}

          <li className="split">
            {loginStatus ? (
              <Link to="/logoff">Logoff</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
export default Navigation;
