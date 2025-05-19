import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setTags(res.data.tags.join(", "));
      } catch (err) {
        toast.error("Failed to load blog");
      }
    }
    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost:5000/api/blogs/save-draft`, {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
        status: "draft",
      });
      toast.success("Blog updated successfully!");
      navigate("/published");
    } catch (err) {
      toast.error("Failed to update blog");
    }
  };

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog</h2>
      <div className="edit-form-group">
        <label className="edit-label">Title</label>
        <input  className="edit-input"
         
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="edit-form-group">
        <label className="edit-label">Content</label>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </div>

      <div className="edit-form-group">
        <label className="edit-label">Tags (comma-separated)</label>
        <input  className="edit-input"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button className="update-button" onClick={handleUpdate}>
        Update Blog
      </button>
    </div>
  );
};

export default EditBlog;
