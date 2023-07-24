import { Header } from "./ui-components/Header";
import { Tag } from "@chakra-ui/react";
import { Navigation } from "./ui-components/Navigation";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userIdLoggedIn, setUserIdLoggedIn] = useState(0);
  const [userNameLoggedIn, setUserNameLoggedIn] = useState("");

  useEffect(() => {
    const loginState = sessionStorage.getItem("loginState");
    if (loginState) {
      const { username, userID } = JSON.parse(loginState);
      setUserLoggedIn(true);
      setUserIdLoggedIn(userID);
      setUserNameLoggedIn(username);
    }
  }, []);
  useEffect(() => {}, [userLoggedIn, userNameLoggedIn, userIdLoggedIn]);

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
      <Header username={userNameLoggedIn} />
      <Navigation />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
