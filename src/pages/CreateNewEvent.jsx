import React, { useState, useContext, useEffect } from "react";
import { FetchServer } from "../functions/fetchServer";
import AuthContext from "../functions/AuthContext";

export const CreateNewEvent = () => {
  const { loginStatus } = useContext(AuthContext);
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
  const [createEventDate, setCreateEventDate] = useState(minDateAdjusted);

  const fetchServerData = (data) => {
    setServerData(data);
    setServerEventList(data.fetchedEventList);
    const createNewEventID = serverEventList.length + 1;
    setCreateEventID(createNewEventID);
  };

  useEffect(() => {}, [createEventDate]);

  return (
    <>
      <FetchServer onDataFetched={fetchServerData} />
      <React.Fragment>
        <h1>Create new event</h1>
        <div id="new-event-form-container" className="new-event-form-container">
          <form id="create-new-event" className="form-create-new-event">
            <input
              type="texst"
              id="event-name"
              placeholder="event name/title"
              required
            />
            <input
              type="texst"
              id="event-short"
              placeholder="short description"
            />
            <textarea
              id="event-long-description"
              wrap="soft"
              placeholder="place a more detailed description of the event"
              required
            ></textarea>
            <input type="date" id="event-date" min={createEventDate} required />
            <input type="time" id="event-start" required />
            <input type="time" id="event-end" required />
            <input
              type="text"
              id="event-location"
              placeholder="Location"
              required
            />
            <input type="text" id="event-image" placeholder="link to image" />
            <button className="create-event-btn">Submit</button>
            <button className="create-event-btn">Reset</button>
          </form>
        </div>
      </React.Fragment>
    </>
  );
};
export default CreateNewEvent;
