import React from "react";
import "./../Articles/Intro.css";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import Subscribe from "./Subscribe";
import IntroCard from "./IntroCard";
import TeamsCard from "./TeamsCard";
import Chatcard from "./Chatcard";
import {  useNavigate } from "react-router-dom";



export default function Intro() {
  let navigate=useNavigate()

  

  
  return (
    <section className="w-11/12 m-auto ">
      <Flex margin="auto" maxH="90vh" h="80vh">
        <HStack width="full">
          <Flex width="full" justifyContent="space-between" flexDirection="row">
            <Box >
              <Stack spacing={2}>
                <Heading fontSize="5xl" fontWeight="medium">
                  Join a team of creatives,
                </Heading>
                <Heading
                  fontSize="5xl"
                  bgClip="text"
                  bgGradient="linear(to-r,purple,orange)"
                  fontWeight="medium"
                >
                  Think,develop,make
                </Heading>
                <Heading fontSize="5xl" fontWeight="medium">
                  Communicate in real time
                </Heading>
                <Text
                  fontSize="28px"
                  maxW="500px"
                  justifyContent="flex-start"
                  fontWeight="hairline"
                  mt="20px"
                >
                  Collaborate and work with people. <br />
                  Explore different fields, build, laugh and create solutions
                  together.
                </Text>
                <div>
                  <Button
                    mt="5"
                    bgGradient="linear(to-r,purple,orange)"
                    color="white"
                    transition="all .5s ease"
                    _hover={{
                      bg: "purple",
                    }}
                    onClick={()=>navigate('signup')}
                  >
                    Get Started
                  </Button>
                </div>
              </Stack>
            </Box>
            <Spacer />
            <Box h="auto">
              <Stack
                borderRadius="3rem"
                w="25rem"
                h="15rem"
                position="relative"
                bg="purple"
              >
                <IntroCard />
              </Stack>
            </Box>
          </Flex>
        </HStack>
      </Flex>
      <Flex direction="column" mt="28">
        <Center>
          <VStack>
            <Heading mb="20">
              With our teams system, <br />
              you can develop like nobody's business
            </Heading>
            <TeamsCard />
          </VStack>
        </Center>
      </Flex>
      <VStack className="mt-20">
        <Center>
          <Flex direction="column">
            <Center>
              <Heading>Connect with creative minds</Heading>
            </Center>
            <Box mt="20px" h="auto">
              <Chatcard />
            </Box>
          </Flex>
        </Center>
      </VStack>
      <Subscribe />
    </section>
  );
}
