import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  status: { type: String, enum: ["draft", "published"] },
  created_at: Date,
  updated_at: Date,
});

 const loginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const loginCredModel = mongoose.model("loginCred", loginSchema);
export const Blog =  mongoose.model("Blog", blogSchema);

