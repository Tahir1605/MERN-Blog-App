# 🚀 React + Vite Project

This is a minimal setup for a React project using Vite, with support for HMR (Hot Module Replacement) and ESLint rules for better development practices.

## MERN Blog Application

![Project Screenshot](screenshots/Quick-BlogApp.png)


## 📌 Project Description

The MERN Blog App is designed to enable a content-driven platform where users can sign up, publish articles, leave comments, and manage their own content. Admins have enhanced privileges to oversee platform activity, manage all users and posts, and ensure the quality of content.

This project highlights real-world use of REST APIs, role-based access control, React routing, and MongoDB data modeling.

✨ Key Features

✍️ User Features:

📰 Read blogs by category or author

📝 Create, edit, and delete own blog posts

💬 Comment on articles

🔐 User registration, login, and profile management

📂 View list of published posts by other users

🛠️ Admin Features:

📁 Full CRUD operations on all blog posts

📚 Manage categories (add, update, delete)

💬 View and delete inappropriate comments

👥 Manage users and assign roles

📊 Admin dashboard with blog and user metrics

🔧 Tech Stack:

Frontend: React, Context Api, React Router DOM

Backend: Node.js, Express.js, MongoDB

Authentication: JWT with bcrypt

Database: MongoDB + Mongoose

Rich Text Editor: (Optional: Quill, TinyMCE, or custom Markdown editor)

Deployment (optional):  Vercel

## 🔗 Live Demo

👉 [Click here to view the project](https://mern-blog-app-fawn.vercel.app/)

---

## 🔧 ESLint Configuration Notes

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for more information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
