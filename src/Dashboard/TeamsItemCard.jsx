import {
  Card,
  VStack,
  CardHeader,
  Text,
  Heading,
  Box,
  Button,
  Flex,
  Divider,
  CardBody,
  HStack,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../Authconfig/Auth";
import { Authorized } from "../Context/AuthContext";
import { Socket } from "../Context/SocketContext";
import { SlLike } from "react-icons/sl";
import { BsBookmarkDash } from "react-icons/bs";
import { TfiComment } from "react-icons/tfi";
// import {GoComment} from 'react-icons/go'

export default function TeamsItemCard({
  name,
  projCategory,
  projDesc,
  projectParticipants,
  projectComment,
  projectAttendees,
  id,
  projectCreation,
}) {
  let navigate = useNavigate();
  let socket = useContext(Socket);
  let { authenticated } = useContext(Authorized);
  let [joined, setJoined] = useState(false);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function progressValue(res = 0, total = 10) {
      let val = (res / total) * 100;
      setProgress(val);
    }
    progressValue(projectParticipants?.length, projectAttendees);

    projectParticipants.map((val) => {
      if (val == authenticated.uid) {
        setJoined(true);
      }
    });
  });

  const db = getFirestore(app);

  function JoinRoom(id) {
    socket.emit("createroom", id);
    console.log(projectParticipants, "whats happening");

    let group;
    if (projectParticipants.length > 0) {
      projectParticipants.map((val) => {
        if (val == authenticated.uid) {
          console.log(val, "culprit");
          return;
        } else {
          console.log("to be added");
          const data = {
            projectParticipants: projectParticipants
              ? [...projectParticipants, authenticated.uid]
              : [],
          };
          const docRef = doc(db, "projects", id);
          updateDoc(docRef, data)
            .then((ref) => console.log("successfully updated", ref))
            .catch((err) => console.log("ran into a server error", err));
        }
      });
    } else {
      group = [authenticated.uid];
      const data = {
        projectParticipants: group,
      };
      const docRef = doc(db, "projects", id);
      updateDoc(docRef, data)
        .then((ref) => console.log("successfully updated", ref))
        .catch((err) => console.log("ran into a server error", err));
    }
  }

  function enterRoom(id) {
    socket.emit("createroom", id);
    navigate(`/status/${id}`);
  }

  return (
    <Card
      w="full"
      mb="1"
      variant="outline"
      _hover={{ cursor: "pointer", backgroundColor: "#eae6eb8c" }}
      onClick={() => enterRoom(id)}
    >
      <CardHeader>
        <Flex ml="2rem" justifyContent="space-between">
          <div>
            <Flex direction="column" justifyContent="flex-start">
              <Flex justifyContent="space-between" width="fit-content">
                <Heading
                  fontWeight="semibold"
                  mb="1"
                  mr="2"
                  fontSize="18px"
                  as="h2"
                >
                  {name}
                </Heading>

                {/* <Text mt="2">
                  {projectCreation ? projectCreation : ""}
                </Text> */}
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
                {projCategory}
              </Text>
            </Flex>
          </div>
          <Box>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                JoinRoom(id);
              }}
              bg="green.400"
              textColor="white"
              disabled={joined}
            >
              {joined ? "JOINED" : "JOIN"}
            </Button>
          </Box>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <VStack>
          <div>
            <Text fontSize="16px">{projDesc}</Text>
          </div>
          <HStack>
            {progress > 0 && (
              <CircularProgress value={progress} color="green.400">
                <CircularProgressLabel fontSize="16px">
                  {Math.round(progress)}
                </CircularProgressLabel>
              </CircularProgress>
            )}
          </HStack>
          <HStack justifyContent="space-evenly" flexWrap='wrap'>
            <div className="flex p-2 border border-solid rounded-md"> 
              <TfiComment className="mr-1 mt-1" />
              {projectComment ? projectComment.length : 0}
            </div>
            <div className="p-2 border border-solid rounded-md">
              <SlLike />
            </div>
            <div className="p-2 border border-solid rounded-md">
              <BsBookmarkDash />
            </div>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
