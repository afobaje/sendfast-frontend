import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function NavMobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <>
      <button ref={btnRef} className="md:hidden block" onClick={onOpen}>
        <div className="flex justify-evenly flex-col">

        <span className="border-solid border border-black w-6 rounded-lg mt-1"></span>
        <span className="border-solid border border-black w-6 rounded-lg mt-1"></span>
        <span className="border-solid border border-black w-6 rounded-lg mt-1"></span>
        </div>
      </button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tims</DrawerHeader>
          <DrawerBody>
            <ul className="flex flex-col h-1/2 justify-evenly w-full">
              <li>
                <Link to="/chat">Chat</Link>
              </li>
              <li>
                <Link to="/home">Teams</Link>
              </li>
              <li>
                <div className="relative">
                  <Link to="/video">
                    <span className="z-20">Video</span>
                    <span className="capitalize font-semibold text-xs p-1 rounded-md absolute text-red-500 bg-red-200 -top-4 left-5  rotate-6 select-none">
                      soon
                    </span>
                  </Link>
                </div>
              </li>
            </ul>
            <div>
              <Link
                className="p-4 border-solid  rounded-full border-neutral-900 border whitespace-nowrap "
                to="/LogIn"
              >
                Sign in
              </Link>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
