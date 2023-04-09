import { Switch } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import NavMobile from "../Articles/NavMobile";

export default function Header() {
  return (
    <header className={` block w-full h-20  `}>
      <div className="flex w-full h-full px-10 py-3 justify-between    place-items-center ">
        <div className="logo block mr-36 font-bold text-xl">
          <span>
            <Link to="/">Tims</Link>
          </span>
        </div>
        <div className="hidden md:flex flex-1 justify-between font-bold">
          <nav className="flex w-3/4">
            <ul className="flex justify-evenly w-full">
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
          </nav>
          <nav className="flex w-1/4">
            <ul className="flex justify-evenly w-full">
              
              <li>
                <Link
                  className="p-4 border-solid  rounded-full border-neutral-900 border whitespace-nowrap "
                  to="/LogIn"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <NavMobile />
      </div>
    </header>
  );
}
