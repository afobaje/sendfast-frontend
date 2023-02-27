import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Socket } from "../Context/SocketContext";
import Layout from "../Layout/Layout";

export default function Chat() {
  const socket = useContext(Socket);
  const [text, setText] = useState("");
  const [info, setInfo] = useState();
  const [blob, setBlob] = useState(null);

  let [data, setData] = useState("");
  const [arr, setArr] = useState([]);
  const [user, setUser] = useState("");

  let handleUser = (e) => setUser(e.target.value);

  useEffect(() => {
    socket.on("onMessage", (res) => {
      setArr([...arr, res]);
      console.log(arr);
    });

    socket.on("info", (res) => {
      console.log("info available", res);
      setInfo(res);
    });
  }, [arr, info]);

  function fileReader(e) {
    let files = e.target.files;
    let [file] = files;
    console.log(e.target.value, files);
    let i = 0,
      len = files.length;
    while (i < len) {
      console.log(`${files[i].name}(${files[i].type}),${files[i].size} bytes`);
      i++;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setBlob(reader.result);
  }

  function searchUser(mail) {
    socket.emit("mail", mail);
    setUser("");
  }

  // async function searchUser(email) {
  //   axios
  //     .post("http://localhost:3000/user", {
  //       email,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data);
  //     })
  //     .catch((err) => console.error(err));
  //   setUser("");
  // }

  return (
    <Layout>
      {/* <div className="flex flex-col">
        <div>
          <input
            type="text"
            name=""
            id=""
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              socket.emit("event", text);
              setText("");
            }}
          >
            send
          </button>

          <ul className="ml-10">
            {arr.map((val, i) => {
              return <li key={i}>{val.content}</li>;
            })}
          </ul>
        </div>
        <div>this is our status {socket.connected ? "connected" : "disconnected"}</div>

        <div>
          <input
            type="file"
            name=""
            className="p-6 bg-blue-300 shadow-lg"
            id=""
            multiple
            onChange={(e) => fileReader(e)}
          />
          <button className="space-y-16 mt-3 bg-red-500">submit</button>
          <div>{blob && <img src={blob} width="1000" height="1000" />}</div>
        </div>

        <h1 className="font-bold  text-xl">Welcome, {socket.id}</h1>
      </div> */}

      <Flex flexDir="column" minH="60vh">
        <HStack w="3xl">
          <Input value={user} type="email" onChange={(e) => handleUser(e)} />
          <Button onClick={() => searchUser(user)}>Search User</Button>
        </HStack>
        <Flex
          flexDir="column"
          h="full"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>Start a chat with anyone in simple steps</Heading>
          <Text>Search for a user with their mail</Text>
          <Text>Start a chat with your friend</Text>
          <Text>
            Please note that this chat does not persist across your other
            devices
          </Text>
          <Box>
          {info ? (
              <div>
                <p>hello world</p>
                <img src={info.photoURL} loading='lazy' alt="profile" />{" "}
              </div>
            ) : (
              <p>We've got nothing to display yet</p>
            )}
          </Box>
          <Text>
            hwy borhter
          </Text>
        </Flex>
      </Flex>
    </Layout>
  );
}
