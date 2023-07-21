import { Header } from "./ui-components/Header";
import { Tag } from "@chakra-ui/react";
import { Navigation } from "./ui-components/Navigation";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userIdLoggedIn, setUserIdLoggedIn] = useState(0);

  const loginCheck = (username, password) => {
    const checkName = serverData.fetchedUserList.filter((usernameCheck) => {
      console.log(serverData.fetchedUserList);
      if (usernameCheck.toString().toLowerCase() === username) {
        setUserLoggedIn(true);
      }
    });
  };
  return (
    <>
      <Tag
        position={"absolute"}
        margin={"5px"}
        zIndex={"2"}
        bgColor={"whiteAlpha.500"}
        color={"#00FF00"}
      >
        Front-end Development Final ( Fase 2/7 completed )
      </Tag>
      <Header />
      <Navigation />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
