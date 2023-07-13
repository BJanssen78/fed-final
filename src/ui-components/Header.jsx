import { Heading } from "@chakra-ui/react";

export const Header = () => {
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
    </>
  );
};
