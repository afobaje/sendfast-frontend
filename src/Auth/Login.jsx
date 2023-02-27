import {
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { firebaseApp } from "../Authconfig/Auth";
import { Authorized } from "../Context/AuthContext";
import Layout from "../Layout/Layout";

const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function Login() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let handleEmail = (e) => setEmail(e.target.value);
  let handlePass = (e) => setPassword(e.target.value);
  let handleClick = () => setShow(!show);

  let navigate = useNavigate();

  let authenticateUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseApp, email, password)
      .then((credential) => {
        console.log("user authenticated", credential.user);
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  function authenticateWithGoogle(e) {
    e.preventDefault();
    signInWithPopup(firebaseApp, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        navigate("/home");
      })
      .catch((err) => console.error(err));
  }

  function authenticateWithGithub() {
    signInWithPopup(firebaseApp, githubProvider)
      .then((res) => {
        const credential = GithubAuthProvider.credentialFromResult(res);
        const user = res.user;
        console.log(user, "this is github user");
        navigate("/home");
      })
      .catch((err) => console.error(err));
  }

  return (
    <Layout>
      <Flex m="auto" justifyContent="center" alignItems="center">
        <Center className="center">
          <Card p="10">
            <CardHeader>
              <Heading fontSize="3xl">Log in to your Tims account</Heading>
              <Center mt="2">
                <Text>
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-orange-500">
                    Sign up
                  </Link>
                </Text>
              </Center>
            </CardHeader>
            <form action="">
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
                    type={show ? "text" : "password"}
                    onChange={(e) => handlePass(e)}
                  />
                  <InputRightElement w="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex mt="3">
                <FormControl>
                  <FormLabel>
                    <input type="checkbox" name="" id="" />
                    <span className="ml-2">Remember me</span>
                  </FormLabel>
                </FormControl>
              </Flex>
              <Button
                onClick={(e) => authenticateUser(e)}
                mt="6"
                w="full"
                p="5"
              >
                Log in
              </Button>
            </form>
            <CardFooter w="full">
              <Flex w="full" direction="column" justifyContent="space-between">
                <HStack w="full">
                  <Divider />
                  <Text whiteSpace="nowrap" ml="2" mr="2">
                    or sign in with
                  </Text>
                  <Divider />
                </HStack>
                <ButtonGroup mt="4" justifyContent="space-evenly" w="full">
                  <IconButton
                    p="4"
                    onClick={(e) => authenticateWithGoogle(e)}
                    w={20}
                    variant="outline"
                  >
                    <Icon as={AiOutlineGoogle} />
                  </IconButton>
                  <IconButton
                    onClick={authenticateWithGithub}
                    p="4"
                    w={20}
                    variant="outline"
                  >
                    <Icon as={AiFillGithub} />
                  </IconButton>
                </ButtonGroup>
                <Center mt="4">
                  <Text>
                    Forgot your password?{" "}
                    <Link className="text-orange-500">Reset it here</Link>{" "}
                  </Text>
                </Center>
              </Flex>
            </CardFooter>
          </Card>
        </Center>
      </Flex>
    </Layout>
  );
}
