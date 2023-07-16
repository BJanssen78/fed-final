import { EventList } from "./pages/EventsList";
import { Header } from "./ui-components/Header";
import { Tag } from "@chakra-ui/react";

function App() {
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

      <EventList />
    </>
  );
}

export default App;
