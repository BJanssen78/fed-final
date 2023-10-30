import React, { useEffect, useState } from "react";
import { Switch } from "@chakra-ui/react";

export const Contact = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [userAnonymous, setUserAnonymous] = useState(false);
  const [newMessageID, setNewMessageID] = useState(null);

  useEffect(() => {}, [newMessageID]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const addedZeroToMonth = currentMonth.toString().padStart(2, "0");
  const currentDay = currentDate.getDate();
  const addedZeroToDay = currentDay.toString().padStart(2, "0");
  const currentHours = currentDate.getHours();
  const addedZeroToHours = currentHours.toString().padStart(2, "0");
  const currentMinutes = currentDate.getMinutes();
  const addedZeroToMinutes = currentMinutes.toString().padStart(2, "0");

  const newDate =
    currentYear +
    "-" +
    addedZeroToMonth +
    "-" +
    addedZeroToDay +
    " " +
    addedZeroToHours +
    ":" +
    addedZeroToMinutes;

  // const serverURL = "../src/database/database.json";
  const serverURL = "http://localhost:3010/userMessages";

  const sendHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const getServerMessages = async () => {
    try {
      const messagesFromServer = await fetch(serverURL, {
        method: "GET",
        headers: sendHeaders,
      })
        .then((response) => response.json())
        .then((response) => {
          setNewMessageID(response.length + 1);
        });
    } catch (error) {
      console.log("contact form errors: ", error);
      throw error;
    }
  };

  getServerMessages();

  //setting annymous values
  const anonymousName = "John Doe";
  const anonymousEmail = "noreply@wincacademyevents.nl";

  const toggleAnonymous = () => {
    setUserAnonymous((prev) => !prev);
  };

  const sendContactForm = async (formData) => {
    try {
      const response = await fetch(serverURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: sendHeaders,
      });

      if (response.ok) {
        console.log("react Form submitted successfully!");
      } else {
        console.error("react Form submission failed.");
      }
    } catch (error) {
      console.error("react An error occurred:", error);
    }
  };

  const createContactForm = (e) => {
    e.preventDefault();
    getServerMessages();
    if (userAnonymous) {
      const formData = {
        id: newMessageID,
        dateTime: newDate,
        message: userMessage,
        messageBy: anonymousName,
        messageByEmail: anonymousEmail,
      };
      sendContactForm(formData);
      console.log(formData);
    } else {
      const formData = {
        id: newMessageID,
        dateTime: newDate,
        message: userMessage,
        messageBy: userFirstName + " " + userLastName,
        messageByEmail: userEmail,
      };
      sendContactForm(formData);
      console.log(formData);
    }
  };

  return (
    <React.Fragment>
      <div className="contact-form-container">
        <form
          id="contact-form"
          name="contact-form"
          autoComplete="on"
          action="#"
          className="contact-form"
        >
          <input
            type="text"
            className="contact-form-item"
            name="first-name"
            placeholder="first name"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value.toLowerCase())}
            required
          />
          <input
            type="text"
            className="contact-form-item"
            name="last-name"
            placeholder="last name"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value.toLowerCase())}
          />
          <div id="mail-container">
            <input
              type="email"
              className="contact-form-item"
              name="email"
              onChange={(e) => setUserEmail(e.target.value.toLowerCase())}
              placeholder="email"
            />
            <Switch onChange={toggleAnonymous} isChecked={userAnonymous}>
              anonymous
            </Switch>
          </div>

          <textarea
            wrap="soft"
            className="text-message"
            onChange={(e) => setUserMessage(e.target.value.toLowerCase())}
            placeholder="type your message here"
          ></textarea>
          <div className="btn-container">
            <button className="contact-btn" onClick={createContactForm}>
              Submit
            </button>
            <button
              className="contact-btn"
              type="reset"
              form="contact-form"
              onClick={() => {
                setUserFirstName("");
                setUserLastName("");
                setUserEmail("");
                setUserMessage("");
                setUserAnonymous(false);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Contact;
