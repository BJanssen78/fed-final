import { Header } from "./ui-components/Header";
import { Tag } from "@chakra-ui/react";
import { Navigation } from "./ui-components/Navigation";
import { Outlet } from "react-router-dom";

function App() {
  return (
    // Fase 1 - connectie met server
    // Fase 2 - navigatie/router
    // Fase 3 - User login page and options
    // Fase 4 - edit page - server update
    // Fase 5 - new event page - post to server
    // Fase 6 - errorboundries
    // Fase 7 - contact form
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
