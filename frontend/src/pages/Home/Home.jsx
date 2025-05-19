import React from "react";
import "./Home.css";
import BlogEditor from "../../components/Blogeditor/BlogEditor";
import BlogList from "../../components/BlogList/BlogList";
const Home = () => {
  return (
    <div className="home">
      <BlogEditor />
    </div>
  );
};

export default Home;
