// AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginUserId, setLoginUserId] = useState(0);
  const [loginUserName, setLoginUserName] = useState("");
  const [loginUserRole, setLoginUserRole] = useState(0);
  const [serverData, setServerData] = useState(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  // const [navigateBack, setNavigateBack] = useState(null);

  const serverURL = "../src/database/database.json";
  // const pathSlash = "/";
  // const eventsPath = "events";
  // const userPath = "users";
  // const catergoryPath = "catergories";
  const localLinkEvent = serverURL;

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
      ]);

      const [eventResponse] = responses;

      const eventList = await eventResponse.json();

      const fetchedDataFromServer = {
        fetchedEventList: eventList.events,
        fetchedUserList: eventList.users,
        fetchedCatergory: eventList.catergories,
      };
      setServerData(fetchedDataFromServer);
      // console.log(fetchedDataFromServer);
    } catch (error) {
      console.error("Error:", error);
      throw error; // Throw the error if needed
    }
  };

  const handleLogin = async (username, password) => {
    const loggedInUser = serverData.fetchedUserList.find((user) => {
      const lowerCaseUsername = username.toLowerCase();
      return user.userName.toString().toLowerCase() === lowerCaseUsername;
    });
    if (loggedInUser) {
      if (password === loggedInUser.userPass) {
        const loginStateUserName = loggedInUser.userName;
        const loginStateUserId = loggedInUser.id;
        const loginStateUserRole = loggedInUser.userRole;
        setLoginStatus(true);
        setLoginUserId(loginStateUserId);
        setLoginUserName(loginStateUserName);
        setLoginUserRole(loginStateUserRole);
        console.log("User logged in:", loginStateUserName);
        console.log("User ID:", loginStateUserId);
        console.log(loginStateUserRole);
        console.log("password matches");

        sessionStorage.setItem(
          "loginState",
          JSON.stringify({
            username: loginStateUserName,
            id: loginStateUserId,
            userRole: loginStateUserRole,
          })
        );
      } else {
        console.log("Invalid credentials");
      }
    } else {
      console.log("Invalid credentials");
      setLoginErrorMsg("Invalid credentials");
    }
  };

  const handleLogoff = () => {
    setLoginStatus(false);
    setLoginUserName("");
    setLoginUserId(0);
    setLoginUserRole(0);
  };

  return (
    <AuthContext.Provider
      value={{
        serverData,
        loginStatus,
        loginUserId,
        loginUserRole,
        loginUserName,
        loginErrorMsg,
        handleLogin,
        handleLogoff,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
