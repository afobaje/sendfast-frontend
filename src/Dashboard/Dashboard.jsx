import {
  Button,
  Box,
  VStack,
  Text,
  Grid,
  GridItem,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Input,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import TeamsItemCard from "./TeamsItemCard";
import { getFirestore } from "firebase/firestore";
import { app } from "../Authconfig/Auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Socket } from "../Context/SocketContext";
import { Store } from "../Context/StoreContext";
import { useEffect } from "react";
import { Comment } from "../Context/CommentContext";
import { RoomcontextId } from "../Context/roomContext";

const db = getFirestore(app);
let teams = [
  "blockchain development",
  "business development",
  "photography",
  "web development",
  "UI/UX",
  "crypto mining",
  "copywriting",
  "Architecture",
  "Law tech",
  "data mining",
];

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [project, setProject] = useState({
    projectName: "",
    projectCategory: "",
    projectDesc: "",
  });

  let socket = useContext(Socket);

  
  const {room,setRoom}=useContext(RoomcontextId)
  const {comment,setComment}=useContext(Comment)

  let [roomMsg, setroomMsg] = useState({
    projectMsg: "",
    projectName: "Borderline poverty in makoko",
  });

  let handleroomMsg = (e) =>
    setroomMsg({ ...roomMsg, projectMsg: e.target.value });

  useEffect(() => {
    socket.on("joinedroom", (res) => {
      setRoom([...room, res]);
    });
    socket.on("msgToRoom", (res) => {
      setComment([...comment, res]);
    });
  }, [room, comment]);
  
  


  function sendMessages(val) {
    socket.emit("roomMsg", val);
    console.log("from val", val);
   
  }

  let dashboardStore = useContext(Store);
  let handleProjname = (e) =>
    setProject({ ...project, projectName: e.target.value });
  let handleTextarea = (e) =>
    setProject({ ...project, projectDesc: e.target.value });
  let handleProjDesc = (e) =>
    setProject({ ...project, projectCategory: e.target.value });


  return (
    <Grid templateColumns={`12rem 1fr 20rem`} gap="1" minH="80vh">
      <GridItem px="10">
        <VStack justifyContent="space-evenly" position="fixed" h="full">
          <VStack className="hello" h="full" justifyContent="space-evenly">
            <Box
              w="full"
              padding="4"
              _hover={{
                bg: "gray.100",
                borderRadius: "full",
              }}
            >
              <Link to="/">Feed</Link>
            </Box>
            <Box
              w="full"
              justifyContent="flex-start"
              padding="4"
              _hover={{
                bg: "gray.100",
                borderRadius: "full",
              }}
            >
              <Link to="/chat">Chat</Link>
            </Box>
            <Box
              justifyContent="flex-start"
              padding="4"
              w="full"
              _hover={{
                bg: "gray.100",
                borderRadius: "full",
              }}
            >
              <Text>Projects</Text>
            </Box>
            <Box
              w="full"
              justifyContent="flex-start"
              padding="4"
              _hover={{
                bg: "gray.100",
                borderRadius: "full",
              }}
            >
              <Text>Bookmark</Text>
            </Box>
            <Box
              justifyContent="flex-start"
              padding="4"
              w="full"
              _hover={{
                bg: "gray.100",
                borderRadius: "full",
              }}
            >
              <Text>Profile</Text>
            </Box>
            <Box>
              <Button
                bg="#b906b9a3"
                onClick={onOpen}
                color="white"
                borderRadius="3xl"
                padding="4"
              >
                Create Team
              </Button>
              <Modal
                scrollBehavior="inside"
                size="xl"
                closeOnOverlayClick={false}
                motionPreset="scale"
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create a project</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form>
                      <FormControl mt="2" isRequired>
                        <FormLabel>Project name</FormLabel>
                        <Input
                          type="text"
                          value={project.projectName}
                          onChange={(e) => handleProjname(e)}
                          placeholder="Project name"
                        />
                      </FormControl>
                      <FormControl mt="2" isRequired>
                        <FormLabel>Project Description</FormLabel>
                        <Textarea
                          onChange={(e) => handleTextarea(e)}
                          value={project.projectDesc}
                          resize="none"
                          h="32"
                          placeholder="Project description"
                        ></Textarea>
                      </FormControl>
                      <FormControl mt="4" isRequired>
                        <Select
                          placeholder="Select project Category"
                          onChange={(e) => handleProjDesc(e)}
                          mb="4"
                          value={project.projectCategory}
                        >
                          {teams.map((val, i) => (
                            <option key={i}>{val}</option>
                          ))}
                        </Select>
                        <Button
                          onClick={async () => {
                            try {
                              await addDoc(collection(db, "projects"), project);
                            } catch (error) {
                              console.error("error adding document:", error);
                            }
                            setProject({
                              projectName: "",
                              projectCategory: "",
                              projectDesc: "",
                            });
                            onClose();
                          }}
                          colorScheme="blue"
                        >
                          Create Project
                        </Button>
                      </FormControl>
                    </form>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem px="10" py="5">
        {dashboardStore.length > 0 ? (
          dashboardStore.map(
            ({ projectName, projectCategory, projectDesc, id }, i) => (
              <TeamsItemCard
                key={i}
                name={projectName}
                projCategory={projectCategory}
                projDesc={projectDesc}
                id={id}
              />
            )
          )
        ) : (
          <Grid h="100vh" placeContent="center">
            <div>loading..</div>
          </Grid>
        )}
      </GridItem>
      <GridItem>
        <Box bg="blackAlpha.200" p="2" borderRadius="2xl" m="2">
          <input
            type="text"
            onChange={(e) => handleroomMsg(e)}
            value={roomMsg.projectMsg}
          />
          <Button onClick={() => sendMessages(roomMsg)}>send</Button>
        </Box>
        <Box>
          <ul>
            {room.map((val, i) => {
              return <li key={i}>{val}a</li>;
            })}
          </ul>
          <ul>
            {comment.map((val, i) => (
              <li key={i}>{val.projectMsg}</li>
            ))}
          </ul>
        </Box>
      </GridItem>
    </Grid>
  );
}
