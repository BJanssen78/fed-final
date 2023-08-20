import React, { useState } from "react";
import { Switch } from "@chakra-ui/react";

export const Contact = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [userAnonymous, setUserAnonymous] = useState(false);

  // const serverAdressLocalHost = "http://localhost:3001/sendcontact.php";
  const serverAdressLocalHost = "../src/functions/sendcontact.php";

  //setting annymous values
  const anonymousName = "John Doe";
  const anonymousEmail = "noreply@wincacademyevents.nl";

  const toggleAnonymous = () => {
    setUserAnonymous((prev) => !prev);
  };

  const sendContactForm = async (formData) => {
    const userNamePhp = formData.userName.toString();
    const userEmailPhp = formData.userEmail.toString();
    const userMessagePhp = formData.userMessage.toString();

    try {
      const response = await fetch(serverAdressLocalHost, {
        method: "POST",
        body: {
          userName: userNamePhp,
          userEmail: userEmailPhp,
          userMessage: userMessagePhp,
        },
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/plain",
          // "Access-Control-Request-Method": "POST",
        },
      });

      const responseData = await response.text();
      console.log(" react Server Response:", responseData);

      if (response.ok) {
        // Handle success, e.g., show a success message to the user
        console.log("react Form submitted successfully!");
      } else {
        // Handle error, e.g., show an error message to the user
        console.error("react Form submission failed.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("react An error occurred:", error);
    }
  };

  const createContactForm = (e) => {
    e.preventDefault();
    if (userAnonymous) {
      const formData = {
        userName: anonymousName,
        userEmail: anonymousEmail,
        userMessage: userMessage,
      };
      sendContactForm(formData);
      console.log(formData);
    } else {
      const formData = {
        userName: userFirstName + " " + userLastName,
        userEmail: userEmail,
        userMessage: userMessage,
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
          // method="POST"
          // encType="application/x-www-form-urlencoded"
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
