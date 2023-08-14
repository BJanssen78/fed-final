import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router";
import AuthContext from "../functions/AuthContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Stack,
  Text,
  Tag,
  HStack,
} from "@chakra-ui/react";

export const EventDetailPage = ({ eventData, eventCat, users, reset }) => {
  const { loginStatus, loginUserId, loginUserRole } = useContext(AuthContext);
  // const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [editedLocation, setEditedLocation] = useState(
    eventData[0].eventLocation
  );
  const [editedWhen, setEditedWhen] = useState(eventData[0].eventDate);
  const [editedTimeFrom, setEditedTimeFrom] = useState(
    eventData[0].eventStartTime
  );
  const [editedTimeTill, setEditedTimeTill] = useState(
    eventData[0].eventEndTime
  );
  const [editedLongDesc, setEditedLongDesc] = useState(
    eventData[0].eventLongtDescr
  );

  useEffect(() => {}, [editMode]);

  // console.log(loginStatus);
  // console.log(loginUserId);
  // console.log(loginUserRole);

  const saveEdit = async () => {
    const updateID = eventData[0].id;
    // console.log(updateID);

    const updateBody = {
      id: updateID,
      eventName: eventData[0].eventName,
      eventShortDescr: eventData[0].eventShortDescr,
      eventLongtDescr: editedLongDesc,
      eventDate: editedWhen,
      eventStartTime: editedTimeFrom,
      eventEndTime: editedTimeTill,
      eventLocation: editedLocation,
      eventCreatedBy: eventData[0].eventCreatedBy,
      eventImage: eventData[0].eventImage,
      attendedBy: eventData[0].attendedBy,
      catergoriesIds: eventData[0].catergoriesIds,
    };
    const serverURL = `http://localhost:3010/events/${updateID}`;
    const sendHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    await fetch(serverURL, {
      id: updateID,
      method: "PUT",
      headers: sendHeaders,
      body: JSON.stringify(updateBody),
    })
      .then((response) => response.json())
      .then((json) => console.log(JSON.stringify(json)))
      .catch((error) => {
        console.log(error);
      });
    setEditMode(false);
  };

  const handleEditMode = () => {
    if (loginStatus) {
      if (loginUserRole >= 1 && createdById === loginUserId) {
        setEditMode(true);
      } else {
        console.log("You are not authorized to edit this page");
      }
    } else {
      console.log("userrole to low");
    }
  };

  const createdBy = users.filter((id) => id.id === eventData[0].eventCreatedBy);
  console.log(createdBy);
  const createdById = createdBy[0].id;
  // console.log(createdBy[0].id);
  const currentCat = eventCat.filter(
    (catergory) => catergory.id === eventData[0].catergoriesIds[0]
  );

  return loginStatus && loginUserId === createdById ? (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
      <Stack>
        <HStack>
          <Button
            maxWidth={"100px"}
            bgColor={"#00FF00"}
            onClick={handleEditMode}
          >
            Edit
          </Button>
          <Button maxWidth={"100px"} bgColor={"#00FF00"} onClick={saveEdit}>
            Save
          </Button>
        </HStack>
        <React.Fragment key={eventData[0].id}>
          <Card
            width={"80vw"}
            minHeight={"25em"}
            bg={"whiteAlpha.500"}
            padding={"0"}
            shadow={"2px 2px black"}
            borderRadius={"25px"}
          >
            <Button
              maxWidth={"100px"}
              onClick={reset}
              position={"absolute"}
              right={"10px"}
              top={"10px"}
              margin={"5px"}
              bg={"#00FF00"}
              zIndex={"1"}
            >
              Back
            </Button>
            <CardBody
              padding={"10px"}
              height={"10em"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
              borderRadius={"25px"}
            >
              <Tag
                textAlign={"center"}
                width={"75%"}
                margin={"0 auto"}
                justifyContent={"center"}
                alignContent={"center"}
                padding={"5px"}
                bg={"whiteAlpha.600"}
              >
                <CardHeader
                  textDecoration={"underline"}
                  textTransform={"uppercase"}
                  padding={"0"}
                  fontSize={"3em"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  {eventData[0].eventName}
                </CardHeader>
              </Tag>

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${eventData[0].eventImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "25px",
                  opacity: 0.8,
                  zIndex: -1,
                }}
              ></div>
              <Text fontWeight={"bold"}>Event details:</Text>
              <Text fontWeight={"bold"}>
                Location:{" "}
                {editMode ? (
                  <Tag bg={"#00FF00"}>
                    <input
                      type="text"
                      id="edit-location"
                      name="location"
                      onChange={(e) => setEditedLocation(e.target.value)}
                      placeholder={eventData[0].eventLocation}
                    />
                  </Tag>
                ) : (
                  <Tag bg={"#00FF00"}>{eventData[0].eventLocation}</Tag>
                )}{" "}
                When:{" "}
                {editMode ? (
                  <Tag bg={"#00FF00"}>
                    <input
                      type="date"
                      id="date-when"
                      name="date-when"
                      onChange={(e) => setEditedWhen(e.target.value)}
                      defaultValue={eventData[0].eventDate}
                    />
                  </Tag>
                ) : (
                  <Tag bg={"#00FF00"}>
                    {eventData[0].eventDate.split("-").reverse().join("-")}
                  </Tag>
                )}{" "}
                From:{" "}
                {editMode ? (
                  <Tag bg={"#00FF00"}>
                    <input
                      type="time"
                      id="time-from"
                      name="time-from"
                      defaultValue={eventData[0].eventStartTime}
                      onChange={(e) => setEditedTimeFrom(e.target.value)}
                      placeholder={eventData[0].eventStartTime}
                    />
                  </Tag>
                ) : (
                  <Tag bg={"#00FF00"}>
                    <Tag bg={"#00FF00"}>{eventData[0].eventStartTime}</Tag>
                  </Tag>
                )}{" "}
                Till :{" "}
                {editMode ? (
                  <Tag bg={"#00FF00"}>
                    <input
                      type="time"
                      id="time-till"
                      name="time-till"
                      defaultValue={eventData[0].eventEndTime}
                      onChange={(e) => setEditedTimeTill(e.target.value)}
                      placeholder={eventData[0].eventEndTime}
                    />
                  </Tag>
                ) : (
                  <Tag bg={"#00FF00"}>
                    <Tag bg={"#00FF00"}>{eventData[0].eventEndTime}</Tag>
                  </Tag>
                )}
              </Text>

              <Text fontWeight={"bold"}>Description/Agenda/Line-up:</Text>
              {editMode ? (
                <textarea
                  id="long-desciption"
                  name="long-discription"
                  wrap="soft"
                  onChange={(e) => setEditedLongDesc(e.target.value)}
                  placeholder={eventData[0].eventLongtDescr}
                ></textarea>
              ) : (
                <Tag
                  margin={"0 auto"}
                  padding={"10px"}
                  justifyContent={"center"}
                  width={"75%"}
                  bg={"whiteAlpha.600"}
                >
                  {eventData[0].eventLongtDescr}
                </Tag>
              )}

              <Flex justifyContent={"space-between"}>
                <Text>
                  Attendees:{" "}
                  <Tag bg={"#00FF00"}>{eventData[0].attendedBy.length}</Tag>
                </Text>
                <Text>
                  Event created by:{" "}
                  <Tag bg={"#00FF00"}>{createdBy[0].userName}</Tag>
                </Text>
                <Text>
                  Catergory:{" "}
                  <Tag bg={"#00FF00"}>{currentCat[0].catergoryName}</Tag>
                </Text>
              </Flex>
            </CardBody>
          </Card>
        </React.Fragment>
      </Stack>
    </Flex>
  ) : (
    <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
      <Stack>
        <React.Fragment key={eventData[0].id}>
          <Card
            width={"80vw"}
            minHeight={"25em"}
            bg={"whiteAlpha.500"}
            padding={"0"}
            shadow={"2px 2px black"}
            borderRadius={"25px"}
          >
            <Button
              maxWidth={"100px"}
              onClick={reset}
              position={"absolute"}
              right={"10px"}
              top={"10px"}
              margin={"5px"}
              bg={"#00FF00"}
              zIndex={"1"}
            >
              Back
            </Button>
            <CardBody
              padding={"10px"}
              height={"10em"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
              borderRadius={"25px"}
            >
              <Tag
                textAlign={"center"}
                width={"75%"}
                margin={"0 auto"}
                justifyContent={"center"}
                alignContent={"center"}
                padding={"5px"}
                bg={"whiteAlpha.600"}
              >
                <CardHeader
                  textDecoration={"underline"}
                  textTransform={"uppercase"}
                  padding={"0"}
                  fontSize={"3em"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  {eventData[0].eventName}
                </CardHeader>
              </Tag>

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${eventData[0].eventImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "25px",
                  opacity: 0.8,
                  zIndex: -1,
                }}
              ></div>
              <Text fontWeight={"bold"}>Event details:</Text>
              <Text fontWeight={"bold"}>
                Location: <Tag bg={"#00FF00"}>{eventData[0].eventLocation}</Tag>{" "}
                When:{" "}
                <Tag bg={"#00FF00"}>
                  {eventData[0].eventDate.split("-").reverse().join("-")}
                </Tag>{" "}
                From: <Tag bg={"#00FF00"}>{eventData[0].eventStartTime}</Tag>{" "}
                Till : <Tag bg={"#00FF00"}>{eventData[0].eventEndTime}</Tag>
              </Text>

              <Text fontWeight={"bold"}>Description/Agenda/Line-up:</Text>
              <Tag
                margin={"0 auto"}
                padding={"10px"}
                justifyContent={"center"}
                width={"75%"}
                bg={"whiteAlpha.600"}
              >
                {eventData[0].eventLongtDescr}
              </Tag>

              <Flex justifyContent={"space-between"}>
                <Text>
                  Attendees:{" "}
                  <Tag bg={"#00FF00"}>{eventData[0].attendedBy.length}</Tag>
                </Text>
                <Text>
                  Event created by:{" "}
                  <Tag bg={"#00FF00"}>{createdBy[0].userName}</Tag>
                </Text>
                <Text>
                  Catergory:{" "}
                  <Tag bg={"#00FF00"}>{currentCat[0].catergoryName}</Tag>
                </Text>
              </Flex>
            </CardBody>
          </Card>
        </React.Fragment>
      </Stack>
    </Flex>
  );
};
export default EventDetailPage;
