import React, { useContext } from "react";
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
} from "@chakra-ui/react";

export const EventDetailPage = ({ eventData, eventCat, users, reset }) => {
  const { loginStatus, loginUserId, loginUserRole } = useContext(AuthContext);

  console.log(loginStatus);
  console.log(loginUserId);
  console.log(loginUserRole);

  const createdBy = users.filter((id) => id.id === eventData[0].eventCreatedBy);

  const currentCat = eventCat.filter(
    (catergory) => catergory.id === eventData[0].catergoriesIds[0]
  );

  return loginStatus ? (
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
                Location:{" "}
                <Tag bg={"#00FF00"}>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder={eventData[0].eventLocation}
                  />
                </Tag>{" "}
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
