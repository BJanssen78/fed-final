import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventList from "./pages/EventsList.jsx";
import { EventDetailPage } from "./pages/EventDetailPage.jsx";
import { Home } from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/events",
        element: <EventList />,
        children: [
          {
            path: "/events/",
            element: <EventDetailPage />,
          },
        ],
      },
    ],
  },
]);

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "black",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
