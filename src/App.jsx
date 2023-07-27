import { Header } from "./ui-components/Header";
import { Tag } from "@chakra-ui/react";
import { Navigation } from "./ui-components/Navigation";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../functions/AuthContext";

function App() {
  // const { userLoggedIn, handleLogoff } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userIdLoggedIn, setUserIdLoggedIn] = useState(0);
  const [userNameLoggedIn, setUserNameLoggedIn] = useState("");

  const handleLogoff = () => {
    setUserLoggedIn(false);
    setUserIdLoggedIn(0);
    setUserNameLoggedIn("");
    sessionStorage.removeItem("loginState");
  };

  useEffect(() => {
    const loginState = sessionStorage.getItem("loginState");
    console.log(loginState);
    if (loginState) {
      const { username, userID } = JSON.parse(loginState);
      setUserLoggedIn(true);
      setUserIdLoggedIn(userID);
      setUserNameLoggedIn(username);
    }
  }, []);

  const navigate = useNavigate();

  const appKey = userLoggedIn ? "loggedIn" : "loggedOut";

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
      <Navigation login={userLoggedIn} onLogoff={handleLogoff} />
      <Outlet key={appKey} />
      {/* <Footer /> */}
    </>
  );
}

export default App;
