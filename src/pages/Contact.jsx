import React, { useState } from "react";
import { Switch } from "@chakra-ui/react";

export const Contact = () => {
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  return (
    <React.Fragment>
      <h1>Contact form</h1>
      <div className="contact-form-container">
        <form
          id="contact-form"
          name="contact-form"
          autoComplete="on"
          action="#"
          method="POST"
          encType="application/x-www-form-urlencoded"
          className="contact-form"
        >
          <input
            type="text"
            className="contact-form-item"
            name="first-name"
            placeholder="first name"
            required
          />
          <input
            type="text"
            className="contact-form-item"
            name="last-name"
            placeholder="last name"
          />
          <div id="mail-container">
            <input
              type="email"
              className="contact-form-item"
              name="email"
              placeholder="email"
            />
            <Switch>anonymous</Switch>
          </div>

          <textarea wrap="soft" className="text-message"></textarea>
          <div className="btn-container">
            <button
              className="contact-btn"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Submit
            </button>
            <button className="contact-btn" type="reset" form="contact-form">
              Reset
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Contact;
