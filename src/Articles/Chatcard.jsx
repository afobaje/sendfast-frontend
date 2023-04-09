import { Card, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function Chatcard() {
  return (
    <Card
      p="10px"
      direction="column"
      // w="700px"
      // maxW="900px"
      w={{lg:'700px'}}
      background="blackAlpha.50"
      userSelect="none"
    >
      <Flex justifyContent="flex-start" height="auto" direction="column">
        <Text
          borderRadius="2xl"
          fontSize="18px"
          bg="green.300"
          mt="10px"
          color="white"
          p="15px"
          w="fit-content"
        >
          I have a project idea!!! Envision fintech but for farm produce,
          farmtech
        </Text>
        <HStack height="20px" dir="flex-start">
          <Divider width="2px" ml="15px" orientation="vertical" bg="#aaaeb3" />
        </HStack>
        <Text
          borderRadius="2xl"
          fontSize="18px"
          bg="blue.300"
          p="15px"
          w="fit-content"
          color="white"
        >
          Wow, sounds great <br /> Hey, I would love to join
        </Text>
        <HStack height="20px" dir="flex-start">
          <Divider width="2px" ml="15px" orientation="vertical" bg="#aaaeb3" />
        </HStack>
        <Text
          borderRadius="2xl"
          fontSize="18px"
          bg="green.300"
          p="15px"
          w="fit-content"
          color="white"
        >
          Great, this is going to be a blast
        </Text>
      </Flex>
    </Card>
  );
}
