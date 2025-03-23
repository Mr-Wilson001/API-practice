# Note-Taking API

A simple Note-Taking API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. This API allows users to register, log in, and manage their notes securely.

---

## Features

- **User Authentication**:
  - Register a new user.
  - Log in and receive a JWT token for authentication.
- **Note Management**:
  - Create, update, delete, and fetch notes.
  - Notes are associated with specific users.
- **Secure**:
  - Passwords are hashed using `bcrypt`.
  - Routes are protected using JWT authentication.

---

## Technologies Used

- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **TypeScript**: Type-safe JavaScript.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: JWT authentication.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/note-taking-api.git
   cd note-taking-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

### **Authentication**

#### Register a New User
- **POST** `/api/v1/auth/register`
- **Request Body**:
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Log In
- **POST** `/api/v1/auth/login`
- **Request Body**:
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "JWT_TOKEN"
  }
  ```

---

### **Notes**

#### Fetch All Notes
- **GET** `/api/v1/notes`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "NOTE_ID",
        "title": "First Note",
        "content": "This is the content of the first note.",
        "user": "USER_ID",
        "createdAt": "2025-03-22T12:00:00.000Z",
        "updatedAt": "2025-03-22T12:00:00.000Z"
      }
    ]
  }
  ```

#### Create a Note
- **POST** `/api/v1/notes`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "My First Note",
    "content": "This is the content of my first note."
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "NOTE_ID",
      "title": "My First Note",
      "content": "This is the content of my first note.",
      "user": "USER_ID",
      "createdAt": "2025-03-22T12:00:00.000Z",
      "updatedAt": "2025-03-22T12:00:00.000Z"
    },
    "message": "Note created successfully"
  }
  ```

#### Update a Note
- **PATCH** `/api/v1/notes/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
- **Request Body**:
  ```json
  {
    "title": "Updated Note Title",
    "content": "Updated content for the note."
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "NOTE_ID",
      "title": "Updated Note Title",
      "content": "Updated content for the note.",
      "user": "USER_ID",
      "createdAt": "2025-03-22T12:00:00.000Z",
      "updatedAt": "2025-03-23T12:00:00.000Z"
    },
    "message": "Note updated successfully"
  }
  ```

#### Delete a Note
- **DELETE** `/api/v1/notes/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Note deleted successfully"
  }
  ```

---

## Folder Structure

```
src/
├── controllers/       # Route handlers (e.g., auth.controller.ts, note.controller.ts)
├── middlewares/       # Middleware (e.g., auth.middleware.ts)
├── models/            # Mongoose models (e.g., user.model.ts, note.model.ts)
├── routes/            # API routes (e.g., auth.route.ts, note.route.ts)
├── types/             # TypeScript types (e.g., user.ts, express.d.ts)
├── app.ts             # Main application file
├── server.ts          # Database connection setup
```

---
