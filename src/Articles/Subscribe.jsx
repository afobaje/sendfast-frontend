import {
  Card,
  Center,
  FormControl,
  Stack,
  HStack,
  Text,
  Flex,
  Heading,
  Input,
  Button,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";

export default function Subscribe() {
  return (
    <Card bg="green.200" borderRadius="20px" m="auto" mt="20" maxWidth="1100px">
      <Center py="35px" px="24px">
        <Flex direction="column" p="30">
          <Stack pb='5'>
            <Heading m='auto' fontWeight='medium' as='h3'>Be on top always</Heading>
            <Text lineHeight='7' >
              Get ahead in your creative journey, get the latest tips and info,{" "}
               be the first to <br /> collaborate on that next big project.
            </Text>
          </Stack>
          <Stack>
            <FormControl >
              <HStack>
                
                <Input type="email" name='email' outline='none' bg="white" placeholder="Enter your mail" />
                <Button>Subscribe</Button>
              </HStack>
              <FormHelperText lineHeight="6" letterSpacing="wide">
                Your privacy is important to us, so we'll never spam you or
                share your info with third parties. <br />  You can unsubscribe at any time.
              </FormHelperText>
            </FormControl>
          </Stack>
        </Flex>
      </Center>
    </Card>
  );
}
