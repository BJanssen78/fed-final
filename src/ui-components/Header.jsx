import { Heading, Tag } from "@chakra-ui/react";

export const Header = ({ loginUserName }) => {
  return (
    <>
      <Heading
        textAlign={"center"}
        textTransform={"uppercase"}
        fontSize={"6xl"}
        padding={"15px"}
        textDecor={"underline"}
      >
        Winc Academy Events
      </Heading>
      {loginUserName ? (
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
          top={"35px"}
          right={"10px"}
        >
          {loginUserName.charAt(0).toUpperCase()}
        </Tag>
      ) : null}
    </>
  );
};
export default Header;
