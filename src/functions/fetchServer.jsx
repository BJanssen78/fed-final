import { useEffect } from "react";

export const FetchServer = ({ onDataFetched }) => {
  // Server information
  // const serverURL = "http://localhost:3010";
  const serverURL = "../src/database/database.json";

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
        fetch(serverURL, {
          method: "GET",
          headers: sendHeaders,
        }),
      ]);

      const [eventResponse] = responses;

      const eventList = await eventResponse.json();

      //Put all collected data in 1 variable to send onDataFetched
      const fetchedDataFromServer = {
        fetchedEventList: eventList.events,
        fetchedUserList: eventList.users,
        fetchedCatergory: eventList.catergories,
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
