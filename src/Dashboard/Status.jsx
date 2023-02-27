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
import { Comment } from "../Context/CommentContext";
import { useEffect } from "react";
import { Socket } from "../Context/SocketContext";
import { RoomcontextId } from "../Context/roomContext";

export default function Status() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { projectId } = useParams();
  const [item] = useContext(Store).filter((val) => val.id === projectId);
  const navigate = useNavigate();
  const { comment, setComment } = useContext(Comment);
  const socket = useContext(Socket);
  const { room } = useContext(RoomcontextId);
  let [roomMsg, setroomMsg] = useState({
    projectMsg: "",
    projectName: "",
    userId: "",
  });
  const [stateOfRoom, setStateOfRoom] = useState([]);
  useEffect(() => {
    socket.on("msgToRoom", (res) => setComment([...comment, res]));

    setStateOfRoom(room.filter((val) => val == projectId));
  }, [comment]);

  let handleProjectMsg = (e) =>
    setroomMsg({
      projectName: projectId,
      projectMsg: e.target.value,
      userId: socket.id,
    });

  function sendMessages(val) {
    socket.emit("roomMsg", val);
    setroomMsg({
      projectMsg: "",
      projectName: "",
      userId: "",
    });
    onClose();
  }

  return (
    <DashboardLayout>
      <Flex flexDir="column" mt="2">
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
                <Button bg="green.200">
                  {stateOfRoom.length > 0 ? "JOINED" : "JOIN"}
                </Button>
              </Box>
            </Flex>
          </Stack>
          <Stack>
            <VStack>
              <Stack>
                <Text>{item?.projectDesc}</Text>
              </Stack>
              <HStack>
                <Text>3/10 Project capacity full</Text>
              </HStack>
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
          <Text>Comments</Text>
          {comment.map(({ projectMsg, userId }, i) => (
            <Box
              flexDir="column"
              alignItems="flex-start"
              border="1px solid #939393"
              mt="0"
              p="2"
              w="full"
              key={i}
            >
              <Text>
                {userId}:{projectMsg}
              </Text>
            </Box>
          ))}
        </VStack>
      </Flex>
    </DashboardLayout>
  );
}
