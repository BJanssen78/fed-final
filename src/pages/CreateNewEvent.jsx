import React, { useState, useContext, useEffect } from "react";
import { FetchServer } from "../functions/fetchServer";
import AuthContext from "../functions/AuthContext";

export const CreateNewEvent = () => {
  const { loginStatus, loginUserId } = useContext(AuthContext);
  const [serverData, setServerData] = useState(null);
  const [serverEventList, setServerEventList] = useState([]);

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
  const [eventCreatedBy, setEventCreatedBy] = useState();
  const [eventImage, setEventImage] = useState(
    "https://placehold.co/600x700?text=No\nPicture+availble"
  );
  const [eventAttendedBy, setEventAttendedBy] = useState(loginUserId);
  const [eventCatergory, setEventCatergory] = useState("");
  const [catergoryId, setCatergoryId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  //fetching server data and setting minimum standards
  const fetchServerData = (data) => {
    setServerData(data);
    setServerEventList(data.fetchedEventList);
    const createNewEventID = serverEventList.length + 1;
    setCreateEventID(createNewEventID);
  };
  console.log(serverData.fetchedCatergory);
  //making sure the date is placed correctly and updated
  useEffect(() => {}, [createEventDate, eventCatergory, catergoryId]);

  //setting post methodes
  const serverURL = `http://localhost:3010`;
  const serverEvent = "/events/";
  const serverCatergory = "/catergories/";
  const sendHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const sendToServer = async () => {
    //create body
    const newEventCreation = {
      id: createEventID,
      eventName: eventName,
      eventShortDescr: eventShortDescr,
      eventLongtDescr: eventLongDescr,
      eventDate: createEventDate,
      eventStartTime: eventStartTime,
      eventEndTime: eventEndTime,
      eventLocation: eventLocation,
      eventCreatedBy: eventCreatedBy,
      eventImage: eventImage,
      attendedBy: eventAttendedBy,
      catergoriesIds: eventCatergory,
    };
    //set new catergory id
    const newCatergoryID = serverData.fetchedCatergory.length + 1;
    const newCatergoryCreation = {
      id: newCatergoryID,
      catergoryName: eventCatergory,
    };
    // find catergory id, if found, use it, else make new
    for (const catergory of serverData.fetchedCatergory) {
      if (catergory.name === eventCatergory) {
        setCatergoryId(catergory.id);
        break;
      }
    }
    if (catergoryId === null) {
      const response = await fetch(serverURL + serverCatergory, {
        method: "POST",
        headers: sendHeaders,
        body: JSON.stringify(newCatergoryCreation),
      });

      if (response.ok) {
        const newCatergoy = await response.json();
        setCatergoryId(newCatergoy.id);
      } else {
        setErrorMsg("failed to create new catergory");
      }
    }
    await fetch(serverURL + serverEvent, {
      method: "POST",
      headers: sendHeaders,
      body: JSON.stringify(newEventCreation),
    });
  };

  return (
    <>
      <FetchServer onDataFetched={fetchServerData} />
      <React.Fragment>
        <div id="new-event-form-container" className="new-event-form-container">
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
              <button className="create-event-btn">Submit</button>
              <button className="create-event-btn">Reset</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    </>
  );
};
export default CreateNewEvent;
