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

export default function TeamsItemCard({
  name,
  projCategory,
  projDesc,
  projectParticipants,
  projectComment,
  projectAttendees,
  id,
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
    projectParticipants.map((val) => {
      if (val == authenticated.uid) {
        return;
      } else {
        const data = {
          projectParticipants: projectParticipants
            ? [...projectParticipants, authenticated.uid]
            : [],
        };
        const docRef = doc(db, "projects", id);
        updateDoc(docRef, data)
          .then((ref) => console.log("successfully updated", ref))
          .catch((err) => console.log("ran into a server error", err));
        console.log(authenticated.uid, "user info");
      }
    });
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
      // onClick={() => navigate(`/status/${id}`)}
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
          <ButtonGroup justifyContent="space-evenly">
            <Button>
              Comment({projectComment ? projectComment.length : 0})
            </Button>
            <Button>Like</Button>
            <Button>Bookmark</Button>
          </ButtonGroup>
        </VStack>
      </CardBody>
    </Card>
  );
}
