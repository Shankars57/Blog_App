📝 Blog Editor App
A full-stack blog editor application built for internship evaluation. This app allows users to write, edit, save drafts, and publish blogs with an auto-save feature and a clean, modern interface using React, Express, and MongoDB.

🚀 Features
🧠 Rich text blog editor with React Quill

💾 Save as Draft and Publish functionality

⏱️ Auto-save drafts after 30 seconds or 5 seconds of inactivity

🏷️ Add and remove tags (comma-separated)

✍️ Edit existing blogs or drafts

📃 View list of published blogs and saved drafts

🔔 Toast notifications on save/update

🧩 Custom CSS styling (no Bootstrap)

🛠️ Tech Stack
Frontend: React, React Router, React Quill, Axios, Toastify

Backend: Node.js, Express

Database: MongoDB (Mongoose ODM)

Styling: Custom CSS

Website Link : https://blog-frontned-vert.vercel.app/

📦 Installation

1. Clone the repository
   bash
   Copy
   Edit
   git clone https://github.com/Shankars57/Blog_App/tree/main
   cd blog-editor-app
1. Install client dependencies
   bash
   Copy
   Edit
   cd client
   npm install
1. Install server dependencies
   bash
   Copy
   Edit
   cd ../server
   npm install
   🔧 Usage
   Start the backend server
   bash
   Copy
   Edit
   cd server
   npm start
   The server will run at http://localhost:5000.

Start the frontend
bash
Copy
Edit
cd ../client
npm start
The frontend will run at http://localhost:3000.

📁 Folder Structure
bash
Copy
Edit
client/
├── components/
│ ├── BlogEditor.jsx
│ ├── EditBlog.jsx
│ ├── SaveDraftList.jsx
│ └── ...
├── App.js
├── index.js
|\_\_Main.js
└── styles/
└── \*.css

server/
├── models/Blog.js
├── routes/blogRoutes.js
├── server.js
🧪 API Endpoints
Method Endpoint Description
POST /api/blogs/save-draft Save or update a draft
POST /api/blogs/publish Save and publish a blog
GET /api/blogs Get all blogs (drafts + published)
GET /api/blogs/:id Get blog by ID

✅ Evaluation Focus
Frontend: UX, state handling, auto-save feedback

Backend: RESTful API design, validation

Database: Efficient schema for drafts & posts

System Design: Clean code separation and modularity

📌 Bonus Implemented
✅ Auto-save with debounce (5s inactivity or 30s interval)

✅ Toast notifications for user feedback

✅ Edit mode for saved drafts

✅ No Bootstrap — pure custom CSS

📃 License
This project is for educational and evaluation purposes only.
