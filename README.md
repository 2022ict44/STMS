# Student Task Management System (STMS)

A full-stack web application that helps undergraduates log, track, prioritize, and manage academic tasks in one place.

---

## Problem Description

Undergraduates often struggle with managing academic deadlines, tracking assignments across multiple subjects, and prioritizing work efficiently. Scattered notes, missed due dates, and unclear priorities make it hard to stay on top of coursework.

## Proposed Solution

STMS is a modern, full-stack web application designed for students to visually log, track, prioritize, and manage their tasks seamlessly. Students can add assignments with subject and priority metadata, view everything on a dashboard table, and keep the list up to date without refreshing the page manually.

---

## Features

- **Create tasks** — Add new tasks with title, subject, priority level (Low / Medium / High), and deadline
- **Dashboard view** — Functional grid/table listing all tasks with status and actions
- **Update & delete** — Edit task details or remove completed or obsolete entries
- **Real-time UI updates** — The React frontend refetches task data after each create, update, or delete so the dashboard stays in sync with the database

---

## Technologies Used

| Layer      | Stack                                      |
| ---------- | ------------------------------------------ |
| Database   | **MongoDB** (Mongoose ODM)                 |
| Backend    | **Node.js**, **Express.js**                |
| Frontend   | **React** (Vite), clean **CSS** styling    |
| Tooling    | Nodemon, CORS, dotenv                      |

---

## Project Structure

```
STMS/
├── controller/       # Request handlers (CRUD logic)
├── model/            # Mongoose task schema
├── routes/           # Express API routes
├── frontend/         # React (Vite) client application
│   └── src/          # Components and UI logic
├── index.js          # Express server entry point
├── package.json      # Backend dependencies and scripts
└── .env              # Environment variables (not committed)
```

---

## API Endpoints

Base URL: `http://localhost:8000/api/task`

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/create`             | Create a new task              |
| GET    | `/getalltasks`        | Retrieve all tasks             |
| PUT    | `/update/:id`         | Update a task by MongoDB `_id` |
| DELETE | `/delete/:id`         | Delete a task by `_id`         |

### POST `/api/task/create`

**Request body (JSON):**

```json
{
  "title": "Submit lab report",
  "subject": "Computer Science",
  "deadline": "2026-05-20T23:59:00.000Z",
  "priority": "High"
}
```

**Success response (201):**

```json
{
  "_id": "674a1b2c3d4e5f6789012345",
  "title": "Submit lab report",
  "subject": "Computer Science",
  "deadline": "2026-05-20T23:59:00.000Z",
  "priority": "High",
  "isCompleted": false,
  "createdAt": "2026-05-16T10:00:00.000Z",
  "updatedAt": "2026-05-16T10:00:00.000Z"
}
```

### GET `/api/task/getalltasks`

**Success response (200):**

```json
[
  {
    "_id": "674a1b2c3d4e5f6789012345",
    "title": "Submit lab report",
    "subject": "Computer Science",
    "deadline": "2026-05-20T23:59:00.000Z",
    "priority": "High",
    "isCompleted": false,
    "createdAt": "2026-05-16T10:00:00.000Z",
    "updatedAt": "2026-05-16T10:00:00.000Z"
  },
  {
    "_id": "674a1b2c3d4e5f6789012346",
    "title": "Read chapter 4",
    "subject": "Mathematics",
    "deadline": "2026-05-18T17:00:00.000Z",
    "priority": "Medium",
    "isCompleted": true,
    "createdAt": "2026-05-15T08:30:00.000Z",
    "updatedAt": "2026-05-16T09:15:00.000Z"
  }
]
```

### PUT `/api/task/update/:id`

**Request body (JSON)** — send only fields to change:

```json
{
  "isCompleted": true,
  "priority": "Low"
}
```

### DELETE `/api/task/delete/:id`

**Success response (201):**

```json
{
  "message": "Task deleted successfully."
}
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string
- npm (included with Node.js)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd STMS
```

### 2. Configure the backend environment

Create a `.env` file in the project root (or copy from an example):

```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/stms
```

Replace `MONGO_URL` with your MongoDB connection string if you use Atlas or a different host.

### 3. Install backend dependencies

From the project root:

```bash
npm install
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 5. Configure the frontend (optional)

The Vite dev server proxies `/api` requests to `http://localhost:8000`. You can override the API base in `frontend/.env`:

```env
VITE_API_BASE=/api/task
```

---

## How to Run

Run the **backend** and **frontend** in separate terminals.

### Terminal 1 — Backend

From the project root:

```bash
npm start
```

This starts the Express server with Nodemon (default port **8000**). You should see:

```
Database connected successfully.
Server is running on port : 8000
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Vite prints a local URL (typically `http://localhost:5173`). Open it in your browser to use STMS.

### Production build (optional)

```bash
cd frontend
npm run build
npm run preview
```

---

## Task Model

Each task document includes:

| Field         | Type    | Notes                          |
| ------------- | ------- | ------------------------------ |
| `title`       | String  | Required                       |
| `subject`     | String  | Required                       |
| `deadline`    | Date    | Required                       |
| `priority`    | String  | `Low`, `Medium`, or `High`     |
| `isCompleted` | Boolean | Default: `false`               |

---

## License

This project was developed as an academic assignment for a Student Task Management System.
