import React, { useEffect, useState } from "react";
import "./index.css";
import NavBar from "./components/navBar/NavBar";
import LoginPage from "./components/Loginpage/LoginPage";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlogEditor from "./components/Blogeditor/BlogEditor";
import BlogList from "./components/BlogList/BlogList";
import EditBlog from "./components/EditBlog/EditBlog";
import SaveDraftList from "./components/SaveDrafts/SaveDraftList";
import { ToastContainer } from "react-toastify";

const NotFound = () => {
  return <h1 style={{ textAlign: "center" }}>404 Not Found</h1>;
};

const App = () => {
  const [content, setContent] = useState(false); // false = not logged in
  return (
    <div className="app">
      <ToastContainer />
      {content ? <LoginPage setContent={setContent} /> : ""}
      <>
        <NavBar content={content} setContent={setContent} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/published" element={<BlogList />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/drafts" element={<SaveDraftList />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </div>
  );
};

export default App;
