import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BlogEditor.css";
import axios from "axios";
import { toast } from "react-toastify";

const BlogEditor = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    tags: [],
    status: "draft",
  });
  const [tagInput, setTagInput] = useState("");
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const htmlToPlainText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    triggerInactivitySave();
  };

  const handleContentChange = (content) => {
    setData((prev) => ({ ...prev, content }));
    triggerInactivitySave();
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !data.tags.includes(trimmed)) {
        setData((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmed],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== indexToRemove),
    }));
    triggerInactivitySave();
  };

  const saveDraft = async () => {
    const plainTextContent = htmlToPlainText(data.content);
    const blogData = {
      ...data,
      content: plainTextContent,
      status: "draft",
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/blogs/save-draft",
        blogData
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("Draft auto-saved");
      }
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  };

  const triggerInactivitySave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      saveDraft();
    }, 5000); // Save after 5 seconds of inactivity
  };

  useEffect(() => {
    // Auto-save every 30 seconds
    intervalRef.current = setInterval(() => {
      saveDraft();
    }, 30000);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [data]);

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();
    const plainTextContent = htmlToPlainText(data.content);
    const blogData = {
      ...data,
      content: plainTextContent,
      status: isDraft ? "draft" : "published",
    };

    const url = isDraft
      ? "http://localhost:5000/api/blogs/save-draft"
      : "http://localhost:5000/api/blogs/publish";

    try {
      const res = await axios.post(url, blogData);
      if (res.status === 200 || res.status === 201) {
        toast.success(
          `Blog ${isDraft ? "saved as draft" : "published"} successfully!`
        );
        setData({ title: "", content: "", tags: [], status: "draft" });
        setTagInput("");
      } else {
        toast.error("Failed to save the blog.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving the blog.");
    }
  };

  return (
    <div className="blog-editor">
      <h1>Blog Creator</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Title"
            onChange={handleInputChange}
            value={data.title}
          />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <ReactQuill
            theme="snow"
            value={data.content}
            onChange={handleContentChange}
            placeholder="Write your blog content here..."
          />
        </div>

        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            placeholder="Type a tag and press Enter or comma"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
          <div className="tag-container">
            {data.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  className="remove-tag"
                  onClick={() => removeTag(index)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="btns"
            onClick={(e) => handleSubmit(e, true)}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="publish btns"
            onClick={(e) => handleSubmit(e, false)}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
