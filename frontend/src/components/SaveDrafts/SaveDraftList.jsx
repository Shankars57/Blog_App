import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SaveDrafts.css";
import { BlogContext } from "../../context/BlogProvider";

const SaveDraftList = () => {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();
  const { url } = useContext(BlogContext);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await axios.get(url);
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
      await axios.delete(`${url}/${blogId}`);
      setDrafts((prev) => prev.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted");
    } catch (e) {
      toast.error("Failed to delete blog");
    }
  };

  const handleSave = async () => {
    try {
      for (const draft of drafts) {
        const updated = { ...draft, status: "published" };
        await axios.post(`${url}/publish`, updated);
      }

      toast.success("Drafts published successfully", { autoClose: 2000 });
      setDrafts([]);
      navigate("/published");
    } catch (e) {
      console.error(e);
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
