import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../context/BlogProvider";
import "./BlogList.css"; // Assuming you have some CSS for styling
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const { url } = useContext(BlogContext);

  const navigate = useNavigate();
  const handleEdit = (blogId) => {
    navigate(`/edit/${blogId}`);
  };

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get(url);
        setBlogs(response.data);
      } catch (e) {
        toast.error("Error fetching blogs");
      }
    }
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${url}/${blogId}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted");
    } catch (e) {
      toast.error("Failed to delete blog");
    }
  };

  const htmlToPlainText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  if (blogs.length === 0) {
    return <p>No blogs found.</p>;
  }

  const handleSave = async () => {
    alert("Do you want to save the changes?");
    try {
      await axios.post(url + "/publish", {
        blogs,
        deletedIds,
      });
      toast.success("Blogs saved successfully", { autoClose: 2000 });
    } catch (e) {
      toast.error("Error saving blogs");
    }
  };

  return (
    <div className="blog-container">
      {blogs.map((blog, index) => (
        <div key={blog._id} className="blog-item">
          <p>{index + 1}.</p>
          <h2>Title: {blog.title}</h2>
          <p>Content: {htmlToPlainText(blog.content)}</p>
          <p>Tags: {blog.tags.join(", ")}</p>
          <p>Created: {blog.created_at}</p>
          <p>Updated: {blog.updated_at}</p>

          <button onClick={() => handleEdit(blog._id)}>Edit</button>
          <button onClick={() => handleDelete(blog._id)}>x</button>
        </div>
      ))}
      <div className="blog-save-btn">
        <button onClick={handleSave}>Save changes</button>
      </div>
    </div>
  );
};

export default BlogList;
