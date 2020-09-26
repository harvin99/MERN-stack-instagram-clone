import React, { useState, createContext } from "react";

export const PostContext = createContext();
export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  
  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostContext.Provider>
  );
}
