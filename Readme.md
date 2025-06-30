# 👨‍💻 DevConnect – A Mini Developer Social App

**DevConnect** is a full-stack social networking platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows developers to sign up, build personal profiles, post short updates, follow other developers, and view a dynamic feed from their network – like a mini Twitter for devs.

---

##  Features

### 🔐 Authentication
- Signup and Login with JWT-based authentication
- Password encryption with `bcrypt`

### 👤 Profile Management
- Create and update your developer profile (bio, skills, GitHub link)
- View public profiles of other developers

### 📝 Posts
- Create and delete short text-based posts
- View posts from developers you follow in a personalized feed

### 👥 Follow System
- Follow/unfollow other developers
- Feed updates based on your following list

---

## 🧰 Tech Stack

| Technology     | Description                      |
|----------------|----------------------------------|
| MongoDB Atlas  | NoSQL Cloud Database             |
| Express.js     | Backend Web Framework (Node.js)  |
| React.js       | Frontend UI Library              |
| Node.js        | JavaScript Runtime               |
| Mongoose       | ODM for MongoDB                  |
| JWT            | Authentication System            |
| Axios          | HTTP Client for API Requests     |
| Tailwind CSS   | (Optional) Frontend Styling      |
| Postman        | API Testing Tool                 |

---
## API ENDPOINTS

🔐 Auth
POST /api/auth/signup – Register a new user

POST /api/auth/login – Authenticate and receive token

👤 Users
GET /api/users – List all developers

GET /api/users/:id – View a specific profile

PUT /api/users/edit – Edit current user's profile

POST /api/users/follow/:id – Follow a user

POST /api/users/unfollow/:id – Unfollow a user

📝 Posts
POST /api/posts – Create a post

GET /api/posts/feed – Get feed from followed users

DELETE /api/posts/:id – Delete a post

