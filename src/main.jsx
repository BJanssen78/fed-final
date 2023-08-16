import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { ChakraProvider, extendTheme, Switch, VStack } from "@chakra-ui/react";
import {
  Home,
  EventList,
  Fase,
  EventDetailPage,
  LoginPage,
  CreateNewUser,
  Logoff,
  CreateNewEvent,
  Contact,
} from "./pages/PageIndex.js";
import { AuthProvider } from "./functions/AuthContext.jsx";

const darkTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#000000",
        color: "#00ff00",
      },
    }),
  },
  colors: {
    brand: {
      500: "#00FF00", // Custom color for the Switch track in dark mode
    },
  },
});

const lightTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "#c8c8c8",
        color: "#000000",
      },
    }),
  },
  colors: {
    brand: {
      500: "#00FF00", // Custom color for the Switch track in light mode
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/fase/", element: <Fase /> },
      {
        path: "/events",
        element: <EventList />,
      },
      {
        path: "events/:eventID",
        element: <EventDetailPage />,
      },
      {
        path: "events/createNewEvent",
        element: <CreateNewEvent />,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/logoff", element: <Logoff /> },
      { path: "/CreateNewUser", element: <CreateNewUser /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
const Main = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <React.StrictMode>
      <ChakraProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <VStack
          spacing={4}
          position={"absolute"}
          top={"10px"}
          right={"10px"}
          zIndex={"100"}
        >
          <Switch
            isChecked={isDarkMode}
            onChange={toggleTheme}
            size="md"
            colorScheme="brand" // Use the custom color scheme
          />
        </VStack>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
