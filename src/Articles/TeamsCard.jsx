import {
  Card,
  CardBody,
  CardHeader,
  Circle,
  Flex,
  HStack,
  Square,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";

let teams = [
  "Javascript",
  "node",
  "nft",
  "business development",
  "advertisement",
  "photography",
  "blockchain",
  "web development",
  "crypto mining",
  "copywriting",
  "gold mining",
  "Architecture",
  "Law tech",
  "Designers",
  "data mining",
];

export default function TeamsCard() {
  return (
    <Card width="50rem" bg="#263238" userSelect="none">
      <CardHeader bg="#2f343a" borderRadius="2xl">
        <Flex direction="row">
          <HStack>
            <Circle bg="tomato" size="15px" />
            <Circle bg="yellow.300" size="15px" />
            <Circle bg="green.300" size="15px" />
          </HStack>

          <Text ml="50px" color="white">
            Teams
          </Text>
        </Flex>
      </CardHeader>
      <CardBody
        borderBottomLeftRadius="2xl"
        borderBottomRightRadius="2xl"
        bg="#22272e"
      >
        <Stack>
          <Wrap>
            {teams.map((val, i) => (
              <Square
                padding="2"
                borderRadius="md"
                key={i}
                bg="ThreeDDarkShadow"
                color="white"
              >
                <Text>{val}</Text>
              </Square>
            ))}
          </Wrap>
        </Stack>
      </CardBody>
    </Card>
  );
}
