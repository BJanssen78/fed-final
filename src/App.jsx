import { Outlet } from "react-router";
import { useState } from "react";
import { FetchServer } from "./functions/fetchServer";
import { Header, Navigation } from "./ui-components/UiIndex";
import { Tag } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./functions/AuthContext";

function App() {
  const [serverData, setServerData] = useState(null);

  const fetchServerData = (data) => {
    setServerData(data);
  };
  const { loginStatus, loginUserName } = useContext(AuthContext);

  return (
    <>
      <FetchServer onDataFetched={fetchServerData} />
      <Tag position={"absolute"} margin={"5px"} zIndex={"2"}>
        Front-end Development Final ( Fase 4/8 completed ) Version 2.05.40
      </Tag>
      <Header loginUserName={loginUserName} />
      <Navigation loginStatus={loginStatus} />

      <Outlet />
    </>
  );
}

export default App;
