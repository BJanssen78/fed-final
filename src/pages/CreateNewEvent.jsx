import React, { useState, useContext } from "react";
import { FetchServer } from "../functions/fetchServer";
import AuthContext from "../functions/AuthContext";
import { Text } from "@chakra-ui/react";

export const CreateNewEvent = () => {
  const { loginStatus } = useContext(AuthContext);
  const [serverData, setServerData] = useState(null);

  const fetchServerData = (data) => {
    setServerData(data);
  };
  console.log(serverData);
  return (
    <>
      <FetchServer onDataFetched={fetchServerData} />
      <React.Fragment>
        <Text>Hier staat wat text</Text>
      </React.Fragment>
    </>
  );
};
export default CreateNewEvent;
