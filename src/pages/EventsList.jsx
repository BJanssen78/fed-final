import React, { useState } from "react";
import { FetchServer } from "../functions/fetchServer";
import { EventDetailPage } from "../pages/EventDetailPage";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  Stack,
  Switch,
  extendTheme,
} from "@chakra-ui/react";

export const EventList = () => {
  const theme = extendTheme({
    colors: {
      brand: {
        50: "#FF0000",
        100: "#00FF00",
      },
    },
  });
  const [serverData, setServerData] = useState(null);
  const [userSelectEvent, setUserSelectEvent] = useState();
  const [showAllEvents, setShowAllEvents] = useState(false); // New state for the switch button

  const fetchServerData = (data) => {
    setServerData(data);
  };

  const userSelect = (id) => {
    const selectEvent = serverData.fetchedEventList.find(
      (event) => event.id === id
    );
    setUserSelectEvent(selectEvent);
  };

  const resetUserSelectEvent = () => {
    setUserSelectEvent();
  };

  const toggleShowAllEvents = () => {
    setShowAllEvents(!showAllEvents);
  };

  const filteredEventList = serverData
    ? showAllEvents
      ? serverData.fetchedEventList
      : serverData.fetchedEventList.filter((event) => {
          const eventDate = new Date(event.eventDate.split("-").join("-"));
          const today = new Date();
          return eventDate >= today;
        })
    : [];

  return (
    <>
      <div className="container">
        <FetchServer onDataFetched={fetchServerData} />

        <Switch
          marginLeft={"10px"}
          colorScheme={showAllEvents ? "brand" : "brand.100"}
          isChecked={showAllEvents}
          onChange={toggleShowAllEvents}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          {showAllEvents ? "new events only" : "show older events"}
        </Switch>

        {userSelectEvent ? (
          <EventDetailPage
            eventData={userSelectEvent}
            eventCat={serverData.fetchedCatergory}
            users={serverData.fetchedUserList}
            reset={resetUserSelectEvent}
          />
        ) : (
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack spacing={"25px"}>
              {filteredEventList.length > 0 ? (
                filteredEventList
                  .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
                  .map((item) => (
                    <React.Fragment key={item.id}>
                      <Card
                        width={"60vw"}
                        height={"10em"}
                        bg={"whiteAlpha.600"}
                        padding={"0"}
                        cursor={"pointer"}
                        border={"2px solid #00FF00"}
                        _hover={{
                          shadow: "4px 4px #00FF00",
                          translate: "0 0 -15px",
                          color: "#00FF00",
                          fontWeight: "bold",
                        }}
                        onClick={() => userSelect(item.id)}
                      >
                        <Flex>
                          <CardBody
                            padding={"10px"}
                            height={"10em"}
                            display={"flex"}
                            flexDir={"column"}
                            justifyContent={"space-between"}
                            borderRadius={"15px"}
                            position={"relative"}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${item.eventImage})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                borderRadius: "15px",
                                opacity: 0.8,
                                zIndex: -1,
                              }}
                            ></div>
                            <CardHeader
                              textDecoration={"underline"}
                              textTransform={"uppercase"}
                              padding={"0"}
                              fontSize={"1.5em"}
                              fontWeight={"bold"}
                            >
                              {item.eventName}
                            </CardHeader>
                            <Text
                              width={"100%"}
                              borderRadius={"15px"}
                              height={"50%"}
                              padding={"5px 5px"}
                            >
                              {item.eventShortDescr}
                            </Text>
                            <Flex
                              flexDir={"row"}
                              justifyContent={"space-between"}
                            >
                              <Text fontSize={"0.9em"}>
                                Date :{" "}
                                {item.eventDate.split("-").reverse().join("-")}{" "}
                                from {item.eventStartTime} till{" "}
                                {item.eventEndTime}
                              </Text>
                              <Text>Attendees : {item.attendedBy.length}</Text>
                            </Flex>
                          </CardBody>
                        </Flex>
                      </Card>
                    </React.Fragment>
                  ))
              ) : (
                <Text color={"#00FF00"}>No events found</Text>
              )}
            </Stack>
          </Flex>
        )}
      </div>
    </>
  );
};
export default EventList;
