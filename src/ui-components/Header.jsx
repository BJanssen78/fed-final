import React from "react";
import { useEffect, useState } from "react";
import { Heading, Tag } from "@chakra-ui/react";

export const Header = ({ username }) => {
  const [firstLetterCapitalized, setFirstLetterCapitalized] = useState("");
  // const firstLetterCapitalized = username.charAt(0).toUpperCase();

  useEffect(() => {
    // This will run whenever the `username` prop changes
    console.log("Header component received a new username:", username);
    if (username) {
      setFirstLetterCapitalized(username.charAt(0).toUpperCase());
    }
  }, [username]);

  return (
    <>
      <Heading
        textAlign={"center"}
        color={"#00FF00"}
        textShadow={"0px 0px 20px rgba(0, 255, 0, 0.9)"}
        textTransform={"uppercase"}
        fontSize={"6xl"}
        padding={"15px"}
        textDecor={"underline"}
      >
        Winc Academy Events
      </Heading>
      {firstLetterCapitalized ? (
        <Tag
          boxSizing={"border-box"}
          padding={"0"}
          bg={"#00FF00"}
          width={"40px"}
          height={"40px"}
          justifyContent={"center"}
          alignItems={"flex-end"}
          border={"2px solid white"}
          borderRadius={"50%"}
          fontSize={"2em"}
          position={"absolute"}
          top={"5"}
          right={"5"}
        >
          {firstLetterCapitalized}
        </Tag>
      ) : null}
    </>
  );
};
