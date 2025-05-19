import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SaveDrafts.css";

const SaveDraftList = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        const draftBlogs = res.data.filter((blog) => blog.status === "draft");
        setDrafts(draftBlogs);
      } catch (err) {
        console.error("Failed to load drafts", err);
      }
    };
    fetchDrafts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${blogId}`);
      setDrafts((prev) => prev.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted");
    } catch (e) {
      toast.error("Failed to delete blog");
    }
  };
  const handleSave = async () => {
    try {
      const updatedDrafts = drafts.map((draft) => ({
        ...draft,
        status: "published",
      }));

      await axios.post("http://localhost:5000/api/blogs/publish", {
        blogs: updatedDrafts,
        deletedIds: [], // optional
      });

      toast.success("Drafts published successfully", { autoClose: 2000 });

      // Remove published drafts from UI
      setDrafts([]);
    } catch (e) {
      toast.error("Error publishing drafts");
    }
  };

  if (drafts.length === 0) {
    return <p>No drafts found.</p>;
  }
  return (
    <div className="blog-container">
      {drafts.map((draft, index) => (
        <div key={draft._id} className="blog-item">
          <p>{index + 1}.</p>
          <h2>Title: {draft.title}</h2>
          <p>Content: {handleHtml(draft.content)}</p>
          <p>Tags: {draft.tags.join(", ")}</p>
          <button onClick={() => handleEdit(draft._id)}>Edit</button>
          <button onClick={() => handleDelete(draft._id)}>x</button>
        </div>
      ))}
      <div className="blog-save-btn">
        <button onClick={handleSave}>Publish All</button>
      </div>
    </div>
  );
};

export default SaveDraftList;
