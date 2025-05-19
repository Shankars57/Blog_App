import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Routes/Routes.js";
import { Blog } from "./models/Blog.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas or local MongoDB
const mongoURI = process.env.MongoDBAtlas || process.env.MongoDBCompass;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes for blog drafts and publish

app.post("/api/blogs/save-draft", async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    const existing = await Blog.findOne({ title });

    if (existing) {
      existing.content = content;
      existing.tags = tags;
      existing.status = status;
      existing.updated_at = new Date();
      await existing.save();
      return res.json(existing);
    }

    const newBlog = new Blog({
      title,
      content,
      tags,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save draft", error: err.message });
  }
});

app.post("/api/blogs/publish", async (req, res) => {
  try {
    const { title, content, tags, status } = req.body;
    const blog = await Blog.findOne({ title });

    if (blog) {
      blog.content = content;
      blog.tags = tags;
      blog.status = status;
      blog.updated_at = new Date();
      await blog.save();
      return res.json(blog);
    }

    const newBlog = new Blog({
      title,
      content,
      tags,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ message: "Failed to publish", error: err.message });
  }
});

app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch blogs", error: err.message });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch blog", error: err.message });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", detail: err.message });
  }
});

// Use other routes from router
app.use("/api/blogs", router);

app.listen(5000, () => console.log("Server started on port 5000"));
