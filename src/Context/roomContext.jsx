import React, { useState } from 'react'
import { createContext } from 'react'

export const RoomcontextId=createContext()
export default function RoomContext({children}) {
    let [room,setRoom]=useState([])
  return <RoomcontextId.Provider value={{room,setRoom}}>{children}</RoomcontextId.Provider>
};
