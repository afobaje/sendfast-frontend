import {
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "../Context/SocketContext";
import { userContext } from "../Context/Users";
import Layout from "../Layout/Layout";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useContext(Socket);
  const [blob, setBlob] = useState(null);
  const [user, setUser] = useState("");
  const { usersList, setUsersList } = useContext(userContext);

  let handleUser = (e) => setUser(e.target.value);

  useEffect(() => {
    function addItem(res) {
      if (usersList.length > 0) {
        for (const iterator of usersList) {
          if (iterator.uid == res.uid) {
            return null;
          }
        }
        return setUsersList([...usersList, res]);
      } else if (usersList.length == 0) {
        return setUsersList([...usersList, res]);
      }
    }

    socket.on("info", addItem);
    localStorage.setItem("userList", JSON.stringify(usersList));
    return () => {
      socket.off("info", addItem);
    };
  }, [usersList]);

  /// maintaining this function to add to chat functionality of receiving and sending files
  function fileReader(e) {
    let files = e.target.files;
    let [file] = files;
    console.log(e.target.value, files);
    let i = 0,
      len = files.length;
    while (i < len) {
      console.log(`${files[i].name}(${files[i].type}),${files[i].size} bytes`);
      i++;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setBlob(reader.result);
  }

  function searchUser(mail) {
    socket.emit("mail", mail);
    setUser("");
  }

  function handleChatRoom(res) {
    socket.emit("room", res);
    navigate(`/chat/${res}`);
  }

  // function to check unique objects only in an array
  function uniqueArr(res) {
    return res.filter(
      (obj, index, self) =>
        index ===
        self.findIndex((t) => t.uid === obj.uid && t.email === obj.email)
    );
  }

  return (
    <Layout>
      <Flex flexDir="column" minH="60vh">
        <HStack w={{ md: "3xl" }} m="auto">
          <Input value={user} type="email" onChange={(e) => handleUser(e)} />
          <Button onClick={() => searchUser(user)}>Search User</Button>
        </HStack>
        <Flex w="80vw" m="auto" h="70vh" overflowY="auto" mt="10">
          <VStack
            w={{ base: "full", md: "350px" }}
            display="flex"
            flexShrink="0"
          >
            {usersList.length > 0 ? (
              usersList.map(({ photoURL, uid, displayName }, i) => {
                return (
                  <Flex
                    key={i}
                    w="full"
                    p="5"
                    border="2px"
                    borderStyle="none"
                    borderBottomStyle="solid"
                    mt="0"
                    justifyContent="flex-start"
                    borderBottomColor="blackAlpha.300"
                    _hover={{ cursor: "pointer", backgroundColor: "#ebeaea" }}
                    onClick={() => handleChatRoom(uid)}
                  >
                    <Circle size="40px" mr="3">
                      <img
                        src={photoURL}
                        className="w-full h-full rounded-full"
                        alt=""
                      />
                    </Circle>
                    <p className="font-bold text-lg mt-2">
                      {displayName.toUpperCase()}
                    </p>
                  </Flex>
                );
              })
            ) : (
              <p>no users found</p>
            )}
          </VStack>
          <VStack display={{ base: "none", md: "flex" }}>
            <Flex
              flexDir="column"
              h="full"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Flex flexDir="column" alignItems="center">
                <Heading ml="50px">
                  Start a chat with anyone in simple steps
                </Heading>
                <Text>Search for a user with their mail</Text>
                <Button background="blue.300" color="white" borderRadius="5px">
                  Send a message
                </Button>
              </Flex>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </Layout>
  );
}
