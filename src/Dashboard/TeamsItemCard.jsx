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
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "../Context/SocketContext";

export default function TeamsItemCard({ name, projCategory, projDesc, id }) {
  let navigate = useNavigate();
  let socket = useContext(Socket);

  function JoinRoom(id) {
    socket.emit("createroom", id);
  }

  return (
    <Card mb="1" variant="outline" onClick={() => navigate(`/status/${id}`)}>
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
              bg="green.200"
            >
              JOIN
            </Button>
          </Box>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody>
        <VStack>
          <div>
            <Text>{projDesc}</Text>
          </div>
          <HStack>
            <Text>3/10</Text>
          </HStack>
          <ButtonGroup justifyContent="space-evenly">
            <Button>Like</Button>
            <Button>Bookmark</Button>
          </ButtonGroup>
        </VStack>
      </CardBody>
    </Card>
  );
}
