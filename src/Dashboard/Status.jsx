import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Context/StoreContext";
import DashboardLayout from "./DashboardLayout";
import { MdKeyboardBackspace } from "react-icons/md";
import { TfiComment } from "react-icons/tfi";
import { BsBookmark } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { BsShare } from "react-icons/bs";
import { useEffect } from "react";
import { Socket } from "../Context/SocketContext";
import { RoomcontextId } from "../Context/roomContext";
import { Authorized } from "../Context/AuthContext";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../Authconfig/Auth";
import CommentCard from "./CommentCard";

export default function Status() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { projectId } = useParams();
  const [item] = useContext(Store).filter((val) => val.id === projectId);
  const navigate = useNavigate();
  const [comment, setComment] = useState(() => {
    return item?.projectComment ? item.projectComment : [];
  });
  const socket = useContext(Socket);
  const { room } = useContext(RoomcontextId);
  const { authenticated } = useContext(Authorized);
  const [roomMsg, setroomMsg] = useState({
    projectMsg: "",
    projectName: projectId,
    userId: {
      name: authenticated?.displayName,
      photo: authenticated?.photoURL,
      id: authenticated?.uid,
    },
  });

  const [joined, setJoined] = useState(false);

  const [progress, setProgress] = useState(0);
  const [stateOfRoom, setStateOfRoom] = useState([]);
  const db = getFirestore(app);
  useEffect(() => {
    async function roomMsg(res) {
      setComment([...comment, res]);
      const docRef = doc(db, "projects", item.id);
      const data = { projectComment: comment };

      await updateDoc(docRef, data)
        .then((ref) => console.log("succesfully updated", ref))
        .catch((err) => console.log("ran into system error", err));
    }

    socket.on("msgToRoom", roomMsg);
    function progressValue(res = 0, total = 10) {
      let val = (res / total) * 100;
      setProgress(val);
    }
    progressValue(item.projectParticipants?.length, item.projectAttendees);
    setStateOfRoom(room.filter((val) => val == projectId));

    item.projectParticipants.map((val) => {
      if (val == authenticated.uid) {
        setJoined(true);
      }
    });
    return () => {
      socket.off("msgToRoom", roomMsg);
    };
  }, [comment, progress,joined]);

  let handleProjectMsg = (e) =>
    setroomMsg({
      ...roomMsg,
      projectMsg: e.target.value,
    });

  function sendMessages(val) {
    socket.emit("roomMsg", val);
    setroomMsg({
      ...roomMsg,
      projectMsg: "",
    });
    onClose();
  }

  const leaveRoom = () => {
    let another = item.projectParticipants.filter(
      (val) => val.id == authenticated.uid
    );
    const data = {
      projectParticipants: another,
    };
    const docRef = doc(db, "projects", item.id);
    updateDoc(docRef, data)
      .then((ref) => console.log("successfully updated", ref))
      .catch((err) => console.log("another server error", err));
    
  };

  return (
    <DashboardLayout>
      <Flex flexDir="column" mt="2" w="full">
        <HStack mb="4">
          <IconButton p="4" onClick={() => navigate(-1)}>
            <Icon as={MdKeyboardBackspace} />
          </IconButton>
        </HStack>
        <Stack>
          <Stack>
            <Flex ml="2rem" justifyContent="space-between">
              <Stack>
                <Flex direction="column" justifyContent="flex-start">
                  <Flex justifyContent="space-between" width="fit-content">
                    <Heading
                      fontWeight="semibold"
                      mb="1"
                      mr="2"
                      fontSize="18px"
                      as="h2"
                    >
                      {item?.projectName}
                    </Heading>
                    <Text mt="2">38m</Text>
                  </Flex>
                  <Text
                    fontWeight="normal"
                    px="1"
                    bg="ButtonFace"
                    borderRadius="lg"
                    color="GrayText"
                    py="1"
                    w="fit-content"
                    fontSize="14px"
                  >
                    {item?.projectCategory}
                  </Text>
                </Flex>
              </Stack>
              <Box>
                {joined?<button
                  onClick={leaveRoom}
                  className={`text-white py-2 px-4 rounded-lg font-bold ${
                    stateOfRoom.length > 0 ? "bg-red-300" : "bg-green-300"
                  }`}
                >
                  LEAVE
                </button>:''}
                {/* <button
                  onClick={leaveRoom}
                  className={`text-white py-2 px-4 rounded-lg font-bold ${
                    stateOfRoom.length > 0 ? "bg-red-300" : "bg-green-300"
                  }`}
                >
                  {joined ? "LEAVE" : "JOIN"}
                </button> */}
              </Box>
            </Flex>
          </Stack>
          <Stack>
            <VStack>
              <Stack>
                <Text>{item?.projectDesc}</Text>
              </Stack>
              <Divider />
              <ButtonGroup w="full" justifyContent="space-evenly">
                <IconButton bg="transparent" onClick={onOpen}>
                  <Icon as={TfiComment} />
                </IconButton>
                <IconButton bg="transparent">
                  <Icon as={FcLike} />
                </IconButton>
                <IconButton bg="transparent">
                  <Icon as={BsBookmark} />
                </IconButton>
                <IconButton bg="transparent">
                  <Icon as={BsShare} />
                </IconButton>
              </ButtonGroup>
              <HStack w="full">
                <Progress
                  w="80%"
                  hasStripe
                  m="auto"
                  size="lg"
                  colorScheme="green"
                  borderRadius="15px"
                  value={progress}
                />
              </HStack>
              <Divider />
              <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Compose a message</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <h1>This is a comment section</h1>
                    <Textarea
                      placeholder="write a message"
                      resize="none"
                      h="32"
                      value={roomMsg.projectMsg}
                      onChange={(e) => handleProjectMsg(e)}
                    ></Textarea>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      onClick={() => sendMessages(roomMsg)}
                    >
                      Publish
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Divider />
            </VStack>
          </Stack>
        </Stack>
        <VStack>
          {comment.length > 0 ? (
            comment.map(({ projectMsg, userId }, i) => (
              <CommentCard
                key={i}
                msg={projectMsg}
                photo={userId.photo}
                name={userId.name}
              />
            ))
          ) : (
            <Box>
              <Text>no comments yet</Text>
            </Box>
          )}
        </VStack>
      </Flex>
    </DashboardLayout>
  );
}
