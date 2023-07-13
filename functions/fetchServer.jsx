import { useEffect } from "react";

export const FetchServer = ({ onDataFetched }) => {
  // Server information
  const serverURL = "http://localhost:";
  const serverPort = "3010";
  const pathSlash = "/";
  const eventsPath = "events";
  const userPath = "users";
  const catergoryPath = "catergories";

  // Local link assembly
  const localLinkEvent = serverURL + serverPort + pathSlash + eventsPath;
  const localLinkUsers = serverURL + serverPort + pathSlash + userPath;
  const localLinkCatergory = serverURL + serverPort + pathSlash + catergoryPath;

  const sendHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async function () {
    try {
      const responses = await Promise.all([
        fetch(localLinkEvent, {
          method: "GET",
          headers: sendHeaders,
        }),
        fetch(localLinkUsers, {
          method: "GET",
          headers: sendHeaders,
        }),
        fetch(localLinkCatergory, {
          method: "GET",
          headers: sendHeaders,
        }),
      ]);

      const [eventResponse, usersResponse, categoryResponse] = responses;

      const eventList = await eventResponse.json();
      const userList = await usersResponse.json();
      const categoryList = await categoryResponse.json();

      //Put all collected data in 1 variable to send onDataFetched
      const fetchedDataFromServer = {
        fetchedEventList: eventList,
        fetchedUserList: userList,
        fetchedCatergory: categoryList,
      };

      onDataFetched(fetchedDataFromServer);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
      throw error; // Throw the error if needed
    }
  };

  return null;
};
