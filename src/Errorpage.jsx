import { Center, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Errorpage() {
    const error=useRouteError();
    console.error(error)
  return (
    <Flex>
        <Center>
            <h1>Unexpected error</h1>
            <Text>
                <i>{error.statusText||error.message}</i>
            </Text>
        </Center>
    </Flex>
  )
}
