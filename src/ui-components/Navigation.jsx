import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
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
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};
