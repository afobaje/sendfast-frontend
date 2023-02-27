import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const Comment = createContext();
export default function CommentContext({ children }) {
  const [comment, setComment] = useState([]);
  return (
    <Comment.Provider value={{ comment, setComment }}>
      {children}
    </Comment.Provider>
  );
}
