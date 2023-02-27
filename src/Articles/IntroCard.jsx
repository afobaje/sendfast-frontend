import React from 'react'
import { Card,CardHeader,Flex,Heading,CardBody,Text } from '@chakra-ui/react'
import { useLayoutEffect } from 'react'
import gsap from 'gsap'

export default function IntroCard() {

  
  return (
    <Card
    bg="#1a102d"
    borderRadius="3rem"
    userSelect='none'
    h="full"
    className=" -rotate-12  bg-slate-700 text-white "
  >
    <CardHeader px="5" pt="1">
      <Flex w="full" justifyContent="center" alignItems="center">
        <Heading
          as="h2"
          fontSize="20px"
          fontWeight="medium"
          color="white"
        >
          Chat_with_gilfoyle
        </Heading>
      </Flex>
    </CardHeader>
    <CardBody position="relative">
      <Text
        fontFamily="sans-serif"
        fontWeight="hairline"
        bg="whiteAlpha.800"
        p="2"
        borderRadius="3xl"
        w="fit-content"
      >
        Hello Gilfoyle
      </Text>
      <Text
        fontFamily="sans-serif"
        p="2"
        fontWeight="hairline"
        borderRadius="3xl"
        mt="4"
        right="30px"
        pos="absolute"
        bg="whiteAlpha.800"
      >
        Leave me alone Dinesh
      </Text>
      <Text
        fontFamily="sans-serif"
        fontWeight="hairline"
        bg="whiteAlpha.800"
        p="2"
        overflow="hidden"
        textOverflow="ellipsis"
        borderRadius="3xl"
        w="16rem"
        pos="absolute"
        top="28"
        whiteSpace="nowrap"
        mt="4"
      >
        How would you love to collaborate on the next big thing
      </Text>
      {/* <CardFooter>CreaTeams</CardFooter> */}
    </CardBody>
  </Card>
  )
}
