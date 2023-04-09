import { Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 lg:h-[18rem] min-h-[15rem] bg-slate-50 ">
      <Flex 
      height="full"
       pt="3rem" 
      // mb={['3rem',null]}
      width="83%"
      // width={{lg:'83%'}}
      
       m="auto">
        <Flex justifyContent="space-between" flexWrap='wrap' height="full" width="full">
          <Stack 
          mb={['5rem',null]} 
          justifyContent="space-evenly" className="doc-logo">
            <Stack>
              <Heading fontSize="48px">
                <Link to="/">Tims</Link>
              </Heading> 
              <Text>
                Improving the quality of projects and cohesion <br /> among
                creators
              </Text>
            </Stack>
            <HStack mt="10" className="socials">
              <a href="#">twitter</a>
              <a href="#">instagram</a>
              <a href="#">linkedin</a>
            </HStack>
            <Text mt="24">&copy; 2022 Tims. All Rights Reserved.</Text>
          </Stack>
          <Flex justifyContent="space-evenly">
            <Flex mr="120px" direction="column">
              <ul className="">
                <li className="pb-4 ">
                  <Text fontWeight="medium" fontSize="2xl">
                    Our Company
                  </Text>{" "}
                </li>
                <li className="pb-4 hover:text-lime-800">About Us</li>
                <li className="pb-4 hover:text-lime-800">Careers</li>
                <li className="pb-4 hover:text-lime-800">Blog</li>
                <li className="pb-4 hover:text-lime-800">
                  {/* <Link to="/home">Home</Link> */}
                </li>
              </ul>
            </Flex>
            <Flex direction="column">
              <ul>
                <li className=" pb-4">
                  <Text fontWeight="medium" fontSize="2xl">
                    Our Services
                  </Text>
                </li>
                <li className="pb-4 hover:text-lime-800">
                  <Link to="/chat">Chat</Link>
                </li>
                <li className="pb-4 hover:text-lime-800">Teams</li>
                <li className="pb-4 hover:text-lime-800">Video</li>
              </ul>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </footer>
  );
}
