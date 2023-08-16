import React, { useState, useContext, useEffect } from "react";
import { FetchServer } from "../functions/fetchServer";
import AuthContext from "../functions/AuthContext";
import { useNavigate } from "react-router-dom";

export const CreateNewEvent = () => {
  const { loginStatus, loginUserId } = useContext(AuthContext);
  const [serverData, setServerData] = useState(null);
  const navigateBack = useNavigate();

  // form handlers
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + 30);
  const minYear = minDate.getFullYear();
  const minMonth = minDate.getMonth() + 1;
  const minDay = minDate.getDate();
  const minMonthadded = minMonth.toString().padStart(2, "0");
  const minDayadded = minDay.toString().padStart(2, "0");
  const minDateAdjusted = minYear + "-" + minMonthadded + "-" + minDayadded;

  const [createEventID, setCreateEventID] = useState();
  const [eventName, setEventName] = useState();
  const [eventShortDescr, setEventShortDescr] = useState();
  const [eventLongDescr, setEventLongDescr] = useState();
  const [createEventDate, setCreateEventDate] = useState(minDateAdjusted);
  const [eventStartTime, setEventStartTime] = useState();
  const [eventEndTime, setEventEndTime] = useState();
  const [eventLocation, setEventlocation] = useState();
  const [eventImage, setEventImage] = useState(
    "https://placehold.co/600x700?text=No\nPicture+availble"
  );
  const [eventCatergory, setEventCatergory] = useState("");
  // errorMsg is also used for succes messages
  const [errorMsg, setErrorMsg] = useState("hallo this is a test");

  //fetching server data and setting minimum standards
  const fetchServerData = (data) => {
    setServerData(data);
    const createNewEventID = data.fetchedEventList.reduce(
      (max, event) => (event.id > max ? event.id : max),
      0
    );
    setCreateEventID(createNewEventID + 1);
  };

  useEffect(() => {
    return () => {
      setErrorMsg("");
    };
  }, [errorMsg]);

  //setting post methodes
  const serverURL = `http://localhost:3010`;
  const serverEvent = "/events/";
  const serverCatergory = "/catergories/";
  const sendHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const sendToServer = async () => {
    // Create body for new event
    const newEventCreation = {
      id: createEventID,
      eventName: eventName,
      eventShortDescr: eventShortDescr,
      eventLongtDescr: eventLongDescr,
      eventDate: createEventDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventLocation: eventLocation,
      eventCreatedBy: loginUserId,
      eventImage: eventImage,
      attendedBy: [loginUserId],
      catergoriesIds: [eventCatergory],
    };

    // Check if the category already exists
    let categoryId = null;

    for (const catergory of serverData.fetchedCatergory) {
      if (catergory.catergoryName === eventCatergory) {
        categoryId = catergory.id;
        break;
      }
    }

    if (categoryId === null) {
      // If category does not exist, create it
      const response = await fetch(serverURL + serverCatergory, {
        method: "POST",
        headers: sendHeaders,
        body: JSON.stringify({
          catergoryName: eventCatergory,
        }),
      });

      if (response.ok) {
        const newCatergory = await response.json();
        categoryId = newCatergory.id;
      } else {
        setErrorMsg("Failed to create new catergory");
        return;
      }
    }

    // Set the category ID in the new event creation
    newEventCreation.catergoriesIds = categoryId;

    // Create the event
    const sendEvent = await fetch(serverURL + serverEvent, {
      method: "POST",
      headers: sendHeaders,
      body: JSON.stringify(newEventCreation),
    });
    console.log("Event Creation Response:", sendEvent);
    if (sendEvent.ok) {
      setErrorMsg("Event created successfully");
    } else {
      setErrorMsg(
        "Failed to create event. Check your entries, and if the problem persists, contact the webmaster."
      );
    }
    navigateBack.push("/events");
  };

  return (
    <>
      <FetchServer onDataFetched={fetchServerData} />
      <React.Fragment>
        {errorMsg === "" ? null : (
          <div className="message-user">
            <p>{errorMsg}</p>
          </div>
        )}
        {loginStatus ? (
          <div
            id="new-event-form-container"
            className="new-event-form-container"
          >
            <h1>Create new event</h1>
            <form id="create-new-event" className="form-create-new-event">
              <input
                type="texst"
                id="event-name"
                onChange={(eventname) => setEventName(eventname.target.value)}
                placeholder="event name/title"
                required
              />
              <input
                type="texst"
                id="event-short"
                onChange={(shortDescr) =>
                  setEventShortDescr(shortDescr.target.value)
                }
                placeholder="short description"
              />
              <textarea
                id="event-long-description"
                wrap="soft"
                placeholder="place a more detailed description of the event"
                onChange={(longdescr) =>
                  setEventLongDescr(longdescr.target.value)
                }
                required
              ></textarea>
              <input
                type="date"
                id="event-date"
                value={createEventDate}
                min={createEventDate}
                onChange={(date) => setCreateEventDate(date.target.value)}
                required
              />
              <input
                type="time"
                onChange={(time) => setEventStartTime(time.target.value)}
                id="event-start"
                required
              />
              <input
                type="time"
                onChange={(time) => setEventEndTime(time.target.value)}
                id="event-end"
                required
              />
              <input
                type="text"
                id="event-location"
                placeholder="Location"
                onChange={(location) => setEventlocation(location.target.value)}
                required
              />
              <input
                type="text"
                onChange={(image) => setEventImage(image.target.value)}
                id="event-image"
                placeholder="link to image"
              />
              <input
                type="text"
                onChange={(cat) =>
                  setEventCatergory(cat.target.value.toLowerCase())
                }
                id="event-image"
                placeholder="Catergory"
              />
              <div className="btn-container">
                <button className="create-event-btn" onClick={sendToServer}>
                  Submit
                </button>
                <button className="create-event-btn">Reset</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="no-auth">
            <p>you are not authorized to create a new event</p>
          </div>
        )}
      </React.Fragment>
    </>
  );
};
export default CreateNewEvent;
