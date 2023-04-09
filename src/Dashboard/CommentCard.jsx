import { Card, Circle, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CommentCard({name,msg,photo}) {
  return (
    <Card w='full' borderRadius='15px' border='1px solid gray'  p='4'>
        <Flex>
          <Circle bg='purple.600' mr='2'><img src={photo} className='rounded-full  w-8 h-8 ' alt="" /></Circle>
          <Link to='/#' className='mt-2'>{name.toUpperCase()}</Link>  
        </Flex>
        <Flex>
            <Text>{msg}</Text>
        </Flex>
    </Card>
  )
}
