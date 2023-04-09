import React, { useState } from "react";
import {
  Card,
  Text,
  Center,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  HStack,
  Heading,
  Divider,
  ButtonGroup,
  CardHeader,
  CardFooter,
  IconButton,
  Icon,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import Layout from "../Layout/Layout";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseApp } from "../Authconfig/Auth";

const provider = new GoogleAuthProvider();
const githubProvider=new GithubAuthProvider()

export default function SignIn() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let handleClick = () => setShow(!show);
  let handlePassword = (e) => setPassword(e.target.value);
  let handleEmail = (e) => setEmail(e.target.value);
  let navigate = useNavigate();

  const toast = useToast();

  function authenticateWithEmailAndPassword(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(firebaseApp, email, password)
      .then((credential) => {
        
        toast({
          position: "top",
          title: "account created successfully",
          description: "Kindly sit tight we are taking you to your dashboard",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/home");
      })
      .catch((err) => {
        
        toast({
          position: "top",
          title: "Error creating account",
          description: "Kindly ensure this user doesn't exist",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }

  function authenticateWithGoogle(e) {
    e.preventDefault();
    signInWithPopup(firebaseApp, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        
        navigate("/home");
      })
      .catch((err) => console.error(err));
  }


  function authenticateWithGithub(){
    signInWithPopup(firebaseApp,githubProvider)
    .then(res=>{
      const credential=GithubAuthProvider.credentialFromResult(res);
      const token=credential.accessToken;
      const user=res.user
      
      navigate('/home')
    })
    .catch(err=>console.error(err))
  }

  return (
    <Layout>
      <Flex m="auto" justifyContent="center" alignItems="center">
        <Center className="center">
          <Card p="10">
            <CardHeader>
              <Heading>Create your Tims account</Heading>
              <Center mt="3">
                <Text>
                  Already have an account?{" "}
                  <Link to="/logIn" className=" text-orange-500">
                    Log in
                  </Link>
                </Text>
              </Center>
            </CardHeader>
            <form action="">
              <FormControl mt="5">
                <FormLabel mb="1">Name</FormLabel>
                <Input name="name" placeholder="name" />
              </FormControl>
              <FormControl mt="5">
                <FormLabel mb="1">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmail(e)}
                  name="email"
                />
              </FormControl>
              <FormControl mt="5">
                <FormLabel mb="1">Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => handlePassword(e)}
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                  />
                  <InputRightElement w="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>At least 8 characters long</FormHelperText>
              </FormControl>

              <Button
                type="submit"
                onClick={(e) => authenticateWithEmailAndPassword(e)}
                mt="6"
                w="full"
                p="5"
              >
                Create Account
              </Button>
            </form>
            <CardFooter w="full">
              <Flex w="full" direction="column" justifyContent="space-between">
                <HStack w="full">
                  <Divider />
                  <Text whiteSpace="nowrap" ml="2" mr="2">
                    or sign up with
                  </Text>
                  <Divider />
                </HStack>
                <ButtonGroup mt="4" justifyContent="space-evenly" w="full">
                  <IconButton
                    p="4"
                    w={20}
                    variant="outline"
                    onClick={(e) => authenticateWithGoogle(e)}
                  >
                    <Icon as={AiOutlineGoogle} />
                  </IconButton>
                  <IconButton  onClick={()=>authenticateWithGithub()} w={20} p="4" variant="outline">
                    <Icon as={AiFillGithub} />
                  </IconButton>
                </ButtonGroup>
              </Flex>
            </CardFooter>
          </Card>
        </Center>
      </Flex>
    </Layout>
  );
}
