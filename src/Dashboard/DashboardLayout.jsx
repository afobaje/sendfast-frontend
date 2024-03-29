// import {
//   Button,
//   Box,
//   VStack,
//   Text,
//   Grid,
//   GridItem,
//   useDisclosure,
//   Modal,
//   ModalBody,
//   ModalOverlay,
//   ModalHeader,
//   ModalCloseButton,
//   ModalContent,
//   Select,
//   FormControl,
//   FormLabel,
//   Textarea,
//   Input,
//   Flex,
//   Heading,
// } from "@chakra-ui/react";
// import React, { useContext } from "react";
// import { getFirestore } from "firebase/firestore";
// import { app } from "../Authconfig/Auth";
// import { collection, addDoc } from "firebase/firestore";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Socket } from "../Context/SocketContext";
// import { Store } from "../Context/StoreContext";
// import { useEffect } from "react";
// import { Comment } from "../Context/CommentContext";

// const db = getFirestore(app);
// let attendees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// let addNewProject = async () => {
//   try {
//     await addDoc(collection(db, "projects"), project);
//   } catch (error) {
//     console.error("error adding document:", error);
//   }
//   setProject({
//     ...project,
//     projectName: "",
//     projectCategory: "",
//     projectDesc: "",
//     projectAttendees: "",
//   });
//   onClose();
// };
// let teams = [
//   "blockchain development",
//   "business development",
//   "photography",
//   "web development",
//   "UI/UX",
//   "crypto mining",
//   "copywriting",
//   "Architecture",
//   "Law tech",
//   "data mining",
// ];

// export default function DashboardLayout({ children }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   let [project, setProject] = useState({
//     projectName: "",
//     projectCategory: "",
//     projectDesc: "",
//   });

//   let socket = useContext(Socket);

//   let [rooms, setRooms] = useState([]);
//   let [roomMsg, setroomMsg] = useState({
//     projectMsg: "",
//     projectName: "Borderline poverty in makoko",
//   });

//   let handleroomMsg = (e) =>
//     setroomMsg({ ...roomMsg, projectMsg: e.target.value });

//   useEffect(() => {
//     socket.on("joinedroom", (res) => {
//       setRooms([...rooms, res]);
//     });
    
//   }, [rooms]);

//   function sendMessages(val) {
//     socket.emit("roomMsg", val);
//     console.log("from val", val);
//   }

//   let handleProjname = (e) =>
//     setProject({ ...project, projectName: e.target.value });
//   let handleTextarea = (e) =>
//     setProject({ ...project, projectDesc: e.target.value });
//   let handleProjDesc = (e) =>
//     setProject({ ...project, projectCategory: e.target.value });

//   return (
//     <Flex h="100vh">
//       <VStack h="full" width="20vw">
//         <VStack
//           px="10"
//           justifyContent="space-evenly"
//           w="full"
//           alignItems="flex-start"
//           h="full"
//         >
//           <Flex>
//             <Heading><Link to='/'> Tims</Link></Heading>
//           </Flex>

//           <Flex
//             _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
//             w="full"
//             p="4"
//           >
//             <Link to="/chat">Chat</Link>
//           </Flex>
//           <Flex
//             _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
//             w="full"
//             p="4"
//           >
//             <Link to="/">Projects</Link>
//           </Flex>
//           <Flex
//             _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
//             w="full"
//             p="4"
//           >
//             <Link to="/">Bookmark</Link>
//           </Flex>
//           <Flex
//             _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
//             w="full"
//             p="4"
//           >
//             <Link to="/">Profile</Link>
//           </Flex>
//           <Flex>
//             <Button
//               bg="#b906b9a3"
//               onClick={onOpen}
//               color="white"
//               borderRadius="3xl"
//               padding="4"
//             >
//               Create Team
//             </Button>
//             <Modal
//               scrollBehavior="inside"
//               size="xl"
//               closeOnOverlayClick={false}
//               motionPreset="scale"
//               isOpen={isOpen}
//               onClose={onClose}
//             >
//               <ModalOverlay />
//               <ModalContent>
//                 <ModalHeader>Create a project</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody>
//                   <form>
//                     <FormControl mt="2" isRequired>
//                       <FormLabel>Project name</FormLabel>
//                       <Input
//                         type="text"
//                         value={project.projectName}
//                         onChange={(e) => handleProjname(e)}
//                         placeholder="Project name"
//                       />
//                     </FormControl>
//                     <FormControl mt="2" isRequired>
//                       <FormLabel>Project Description</FormLabel>
//                       <Textarea
//                         onChange={(e) => handleTextarea(e)}
//                         value={project.projectDesc}
//                         resize="none"
//                         h="32"
//                         placeholder="Project description"
//                       ></Textarea>
//                     </FormControl>

//                     <FormControl mt="2" isRequired>
//                       <FormLabel>No. of project participants allowed</FormLabel>
//                       <Select
//                         onChange={(e) => handleAttendees(e)}
//                         placeholder="Select number of participants"
//                         mb="4"
//                       >
//                         {attendees.map((val, i) => (
//                           <option key={i}>{val}</option>
//                         ))}
//                       </Select>
//                     </FormControl>

//                     <FormControl mt="4" isRequired>
//                       <Select
//                         placeholder="Select project Category"
//                         onChange={(e) => handleProjDesc(e)}
//                         mb="4"
//                         value={project.projectCategory}
//                       >
//                         {teams.map((val, i) => (
//                           <option key={i}>{val}</option>
//                         ))}
//                       </Select>
//                       <Button onClick={addNewProject} colorScheme="blue">
//                         Create Project
//                       </Button>
//                     </FormControl>
//                   </form>
//                 </ModalBody>
//               </ModalContent>
//             </Modal>
//           </Flex>
//         </VStack>
//       </VStack>
//       <VStack h="full" overflow="auto" flex="1">
//         <VStack my="5vh" w="80%" mx="auto">
//           {children}
//         </VStack>
//       </VStack>
//     </Flex>
//   );
// }

import {
  Button,
  VStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Flex,
  Heading,
  Circle,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useContext, useRef } from "react";
import { getFirestore } from "firebase/firestore";
import { app } from "../Authconfig/Auth";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Socket } from "../Context/SocketContext";
import { useEffect } from "react";
import { Comment } from "../Context/CommentContext";
import { RoomcontextId } from "../Context/roomContext";
import { Authorized } from "../Context/AuthContext";

const db = getFirestore(app);
let teams = [
  "blockchain development",
  "business development",
  "photography",
  "web development",
  "UI/UX",
  "crypto mining",
  "copywriting",
  "Architecture",
  "Law tech",
  "data mining",
];

export default function DashboardLayout({children}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isOpen:drawerOpen,onOpen:draweronOpen,onClose:draweronClose}=useDisclosure()
  const btnRef=useRef()
  let {authenticated}=useContext(Authorized)
  
  let [project, setProject] = useState({
    projectName: "",
    projectCategory: "",
    projectDesc: "",
    projectParticipants: [],
    projectAttendees: "",
    projectCreation: new Date().toLocaleTimeString(),
    projectComment: [],
  });

  const attendees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let addNewProject = async () => {
    try {
      await addDoc(collection(db, "projects"), project);
    } catch (error) {
      console.error("error adding document:", error);
    }
    setProject({
      ...project,
      projectName: "",
      projectCategory: "",
      projectDesc: "",
      projectAttendees: "",
    });
    onClose();
  };

  let socket = useContext(Socket);

  const { room, setRoom } = useContext(RoomcontextId);
  const { comment, setComment } = useContext(Comment);

  useEffect(() => {
    socket.on("joinedroom", (res) => {
      setRoom([...room, res]);
    });
    socket.on("msgToRoom", (res) => {
      setComment([...comment, res]);
    });
  }, [room, comment]);

  
  let handleProjname = (e) =>
    setProject({ ...project, projectName: e.target.value });

  let handleTextarea = (e) =>
    setProject({ ...project, projectDesc: e.target.value });

  let handleProjDesc = (e) =>
    setProject({ ...project, projectCategory: e.target.value });

  let handleAttendees = (e) =>
    setProject({ ...project, projectAttendees: e.target.value });

    


  return (
    <Flex h="100vh">
      <VStack h="full" width="20vw" display={{base:'none',md:'flex'}} >
        <VStack
          px="10"
          justifyContent="space-evenly"
          w="full"
          alignItems="flex-start"
          h="full"
        
        
        >
          <Flex>
            <Heading><Link to='/'>Tims</Link></Heading>
          </Flex>

          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/chat">Chat</Link>
          </Flex>
          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/">Projects</Link>
          </Flex>
          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/">Bookmark</Link>
          </Flex>
          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/">Profile</Link>
          </Flex>
          <Flex>
            <Button
              bg="#b906b9a3"
              onClick={onOpen}
              color="white"
              borderRadius="3xl"
              padding="4"
            >
              Create Team
            </Button>
            <Modal
              scrollBehavior="inside"
              size="xl"
              closeOnOverlayClick={false}
              motionPreset="scale"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create a project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form>
                    <FormControl mt="2" isRequired>
                      <FormLabel>Project name</FormLabel>
                      <Input
                        type="text"
                        value={project.projectName}
                        onChange={(e) => handleProjname(e)}
                        placeholder="Project name"
                      />
                    </FormControl>
                    <FormControl mt="2" isRequired>
                      <FormLabel>Project Description</FormLabel>
                      <Textarea
                        onChange={(e) => handleTextarea(e)}
                        value={project.projectDesc}
                        resize="none"
                        h="32"
                        placeholder="Project description"
                      ></Textarea>
                    </FormControl>

                    <FormControl mt="2" isRequired>
                      <FormLabel>No. of project participants allowed</FormLabel>
                      <Select
                        onChange={(e) => handleAttendees(e)}
                        placeholder="Select number of participants"
                        mb="4"
                      >
                        {attendees.map((val, i) => (
                          <option key={i}>{val}</option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl mt="4" isRequired>
                      <Select
                        placeholder="Select project Category"
                        onChange={(e) => handleProjDesc(e)}
                        mb="4"
                        value={project.projectCategory}
                      >
                        {teams.map((val, i) => (
                          <option key={i}>{val}</option>
                        ))}
                      </Select>
                      <Button onClick={addNewProject} colorScheme="blue">
                        Create Project
                      </Button>
                    </FormControl>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Flex>
        </VStack>
      </VStack>
      <VStack>
      <Circle
                _hover={{ cursor: "pointer" }}
                mt="4"
                display={{ base: "block", md: "none" }}
                ref={btnRef}
                onClick={draweronOpen}
                size="40px"
                ml="3"
              >
                <img
                  src={authenticated&&authenticated.photoURL}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </Circle>
              <Drawer isOpen={drawerOpen} placement='left' onClose={draweronClose} finalFocusRef={btnRef}>
                <DrawerOverlay/>
                <DrawerContent>
                  <DrawerCloseButton/>
                  <DrawerHeader>TIMS</DrawerHeader>
                  
                  <DrawerBody>
                  <VStack
          px="10"
          justifyContent="space-evenly"
          w="full"
          alignItems="flex-start"
          h="full"
        
        
        >
          <Flex>
            <Heading><Link to='/'>Tims</Link></Heading>
          </Flex>

          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/chat">Chat</Link>
          </Flex>
          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/">Projects</Link>
          </Flex>
          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/">Bookmark</Link>
          </Flex>
          <Flex
            _hover={{ bg: "gray", borderRadius: "30px", color: "white" }}
            w="full"
            p="4"
          >
            <Link to="/">Profile</Link>
          </Flex>
          <Flex>
            <Button
              bg="#b906b9a3"
              onClick={onOpen}
              color="white"
              borderRadius="3xl"
              padding="4"
            >
              Create Team
            </Button>
            
          </Flex>
        </VStack>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button mr={3} onClick={onClose}>Cancel</Button>
                  </DrawerFooter>
                </DrawerContent>

              </Drawer>
      </VStack>
      <VStack h="full" overflow="auto" flex="1">
        <VStack mt="15vh" w="80%" mx="auto">
          {children}
        </VStack>
      </VStack>
    </Flex>
  );
}
