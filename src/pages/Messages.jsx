import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Stack,
  Text,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";

export const VisitorMessages = () => {
  const [messageBoard, setMessageBoard] = useState([]);
  const serverURL = "../src/database/database.json";
  // const serverURL = "http://localhost:3010/userMessages";

  const sendHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getMessageFromServer = async () => {
      try {
        const response = await fetch(serverURL, {
          method: "GET",
          headers: sendHeaders,
        });

        if (response.ok) {
          const responseData = await response.json();
          const messages = Object.values(responseData);
          setMessageBoard(messages[4]);
        } else {
          console.error("Failed to fetch messages:", response.statusText);
        }
      } catch (error) {
        console.error("Messageboard errors: ", error);
      }
    };

    getMessageFromServer();
  }, []);

  const sortingMessages = messageBoard
    .slice()
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  console.log(messageBoard);

  return (
    <>
      <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={"25px"} marginTop={"15px"}>
          {sortingMessages.map((item) => (
            <React.Fragment key={item.id}>
              <Card
                width={"70vw"}
                bg={"whiteAlpha.600"}
                border={"2px solid #00FF00"}
              >
                <CardHeader padding={"10px"} width={"100%"} display={"flex"}>
                  <Text fontWeight={"bold"} width={"min-content"}>
                    From:
                  </Text>
                  &nbsp;
                  {item.messageBy}
                </CardHeader>
                <Text position={"absolute"} right={"10px"}>
                  {item.dateTime.split(" ")[0].split("-").reverse().join("-")}{" "}
                  {item.dateTime.split(" ")[1]}
                </Text>
                <Divider
                  orientation="horizontal"
                  variant={"solid"}
                  width={"65vw"}
                  margin={"0 auto"}
                />
                <AbsoluteCenter fontWeight={"bold"}>Message:</AbsoluteCenter>
                <CardBody padding={"5px 0 10px 15px"} margin={"0"}>
                  {item.message}
                </CardBody>
              </Card>
            </React.Fragment>
          ))}
        </Stack>
      </Flex>
    </>
  );
};
export default VisitorMessages;
