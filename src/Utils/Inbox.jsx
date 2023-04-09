import {
  Box,
  Button,
  Circle,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Socket } from "../Context/SocketContext";
import { userContext } from "../Context/Users";

export default function Inbox() {
  const socket = useContext(Socket);
  const { usersList } = useContext(userContext);
  const { id } = socket;
  const { room } = useParams();

  let [chat, setChat] = useState({
    room,
    msg: "",
    id,
  });

  let [msg, setMsg] = useState([]);

  let handleMsg = (e) => setChat({ ...chat, msg: e.target.value });
  let [userName] = usersList.filter((val) => val.uid == room);

  
  function sendMsg(e, params) {
    e.preventDefault();
    socket.emit("sendMsg", params);
    setChat({ ...chat, msg: "" });
    setMsg([...msg, chat]);
  }

  useEffect(() => {
    socket.on("joined", (res) => {
      setMsg([...msg, res]);
    });
  }, [msg]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  

  return (
    <>
      {/* <div>
        <div className="chat-body-wrapper h-screen flex flex-col ">
          <div className="flex flex-1 w-full flex-col overflow-y-auto justify-end ">
            <div className=" flex overflow-auto flex-col ">
              {msg.map((val, i) => (
                <div
                  key={i}
                  className={`flex ${
                    val.id == socket.id
                      ? "justify-end mr-4"
                      : "justify-start ml-4"
                  }  mr-4`}
                >
                  <p
                    className={`${
                      val.id == socket.id ? "bg-blue-400" : "bg-red-300"
                    } ml-3 relative my-3 text-white w-fit p-3  rounded-3xl `}
                  >
                    {val.msg}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className=" w-11/12 m-auto">
            <div className="w-11/12 m-auto  ">
              <div className="flex ">
                <div className="flex w-11/12">
                  <textarea
                    className="w-full pt-2 px-2 border-black h-12 border-2 border-solid resize-none   rounded-2xl"
                    value={chat.msg}
                    onChange={(e) => handleMsg(e)}
                  />
                </div>
                <Button onClick={() => sendMsg(chat)}>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </div>  */}
      <Flex h="100vh">
        <Box w="250px" display={{ base: "none", md: "flex" }}>
          <Flex
            flexDir="column"
            h="full"
            ml="5"
            justifyContent="space-evenly"
            w="150px"
          >
            <Heading>
              <Link to="/">Tims</Link>
            </Heading>
            <Link to="/home">Feed</Link>
            <Link to='/chat'>Chat</Link>
            <Text>Projects</Text>
            <Link to="/Profile">Profile</Link>
          </Flex>
        </Box>
        <Flex flex="1">
        
          <Flex flex="1" flexDir="column" px="2">
            <Flex>
              <Circle
                _hover={{ cursor: "pointer" }}
                mt="4"
                display={{ base: "block", md: "none" }}
                ref={btnRef}
                onClick={onOpen}
                size="40px"
                mr="3"
              >
                <img
                  src={userName.photoURL}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </Circle>

              <Drawer
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>
                    <Link to="/">Tims</Link>
                  </DrawerHeader>
                  <DrawerBody>
                    <Flex
                      flexDir="column"
                      h="full"
                      ml="5"
                      justifyContent="space-evenly"
                      w="150px"
                    >
                      <Link to='/home'> Feed</Link>
                      <Link to='/chat'>Chat</Link>
                      <Text>Projects</Text>
                      <Text>Bookmark</Text>
                      {/* <Text>Profile</Text> */}
                      <Link to="/Profile">Profile</Link>
                    </Flex>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button onClick={onClose}>Cancel</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Flex
                alignItems="center"
                mx="auto"
                py="6"
                justifyContent="center"
              >
                <Circle
                  display={{ base: "none", md: "flex" }}
                  size="40px"
                  mr="3"
                >
                  <img
                    src={userName.photoURL}
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </Circle>
                <Text>{userName && userName.displayName.toUpperCase()}</Text>
              </Flex>
            </Flex>

            <Flex
              flexDir="column"
              flex="1"
              overflowY="auto"
              scrollBehavior="smooth"
              scrollSnapAlign="end"
              bg="gray.100"
              borderRadius="5px"
            >
              <Flex
                flexDir="column"
                overflowY="auto"
                scrollSnapType="x"
                scrollSnapAlign="start"
              >
                {msg.map((val, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      val.id == socket.id
                        ? "justify-end mr-4"
                        : "justify-start ml-4"
                    }  `}
                  >
                    <p
                      className={`${
                        val.id == socket.id ? "bg-blue-400" : "bg-red-300"
                      } ml-3 relative my-2 text-white w-fit p-3  rounded-3xl `}
                    >
                      {val.msg}
                    </p>
                  </div>
                ))}
              </Flex>
            </Flex>
            <Flex className="text-form" my="2" pr="2" w="full" flexShrink="0">
              <form
                className="flex w-full justify-center"
                onSubmit={(e) => sendMsg(e, chat)}
              >
                <textarea
                  placeholder="Type message here..."
                  value={chat.msg}
                  onChange={(e) => handleMsg(e)}
                  className=" p-2 h-12 w-full resize-none border-solid border-2 border-slate-200 rounded-3xl outline-none "
                />
                {/* <button className=" bg-teal-500 rounded-3xl py-2 px-4 text-white relative  ">
                  Send
                </button> */}
                <Button
                  type="submit"
                  color="white"
                  pos="relative"
                  borderRadius="3xl"
                  py="2"
                  px="4"
                  bgGradient="linear(to-r,purple,orange)"
                  _hover={{ color: "white", backgroundColor: "grey" }}
                >
                  send
                </Button>
              </form>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
