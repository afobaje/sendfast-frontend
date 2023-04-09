import React, { useContext } from "react";
import { Authorized } from "../Context/AuthContext";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { Circle, Flex, Text, VStack } from "@chakra-ui/react";

export default function Profile() {
  let { authenticated } = useContext(Authorized);

  return (
    <DashboardLayout>
      <VStack flexDir="column" alignItems='flex-start'>
        <Flex>
          <Circle>
            <img
              src={authenticated && authenticated.photoURL}
              className="rounded-full "
              alt="profile picture"
            />
          </Circle>
        </Flex>
        <Flex flexDir='column' justifyContent='space-evenly' mt='8'> 
        <Text fontWeight="bold" fontSize="2xl" mt='4'>
          {authenticated && authenticated.displayName.toUpperCase()}
        </Text>
        <Text mt='4'>{authenticated && authenticated.email}</Text>
        </Flex>
      </VStack>
    </DashboardLayout>
  );
}
