// Context.js or BlogContext.js
import React, { createContext } from "react";

// Create the context object
export const BlogContext = createContext();

// Create the context provider component
function BlogProvider({ children }) {
  const url = "https://blog-app-qey8.onrender.com/api/blogs";

  const contextValue = {
    url,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  );
}

export default BlogProvider;
