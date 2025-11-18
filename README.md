# CodeClash

## CodeClash: Real-Time Competitive Coding Platform

### ⚡ Project Overview

CodeClash is a modern, real-time competitive coding platform designed to bring the excitement of instant, head-to-head duels to programming. Unlike traditional platforms that focus on solo practice or delayed contests, CodeClash facilitates real-time 1v1 coding matches where the first user to submit a correct solution wins and gains ELO points.

It introduces a dynamic, chess-style ELO rating system to competitive programming, offering instant feedback and intense competition.

---

## 🚀 Hosted Deployment Links

| Component                 | Status   | Link                                                                 |
|--------------------------:|:--------:|:---------------------------------------------------------------------|
| Frontend | Deployed | https://code-clash-sand.vercel.app/  |
| Backend | Deployed | https://codeclash-back.onrender.com |
| Database | Hosted   | pg-24c1c83a-codeclash67.f.aivencloud.com|

---

## ✨ Key Features

### Core

- **Real-Time 1v1 Matchmaking** — Users compete simultaneously on the exact same coding problem.
- **Dynamic ELO Rating System** — Winners gain ELO points and losers lose points to reflect skill changes quickly.
- **Integrated Problem Solving Interface** — In-browser code editor with instant run and submission.

### Social & Competitive

- **Friends & Challenges** — Add friends and initiate direct coding duels.
- **Global Leaderboard** — View top players globally or filter by topic.

### Reliability & Admin

- **Secure Code Execution** — Submissions evaluated safely via the Judge0 API.
- **Admin Controls** — Interfaces for admins to add, edit, or delete problems.

---

## ⚙️ Tech Stack & Architecture

The system follows a standard Frontend → Backend → Database architecture.

| Layer         | Technology               | Purpose                                                        |
|--------------:|--------------------------|----------------------------------------------------------------|
| Frontend      | Next.js, Tailwind CSS    | Fast, modern web interface with dynamic routing and responsive design. |
| Backend       | Node.js, Express.js      | REST API server for users, matches, and submissions.           |
| Database      | SQL (Prisma ORM)         | Type-safe persistence for users, problems, ratings.            |
| Authentication| Firebase Authentication  | Secure login/signup via email or Google.                       |
| Code Execution| Judge0 API               | Sandboxed multi-language code evaluation.                      |
| Hosting       | Vercel                   | Seamless deployment for frontend and backend.                  |

---

## 🌐 API Endpoints Overview

| Endpoint             | Method | Description                                                     | Access        |
|---------------------:|:------:|:----------------------------------------------------------------|:-------------:|
| /api/auth/signup     | POST   | Register a new user via Firebase.                               | Public        |
| /api/auth/login      | POST   | Authenticate and fetch user data.                               | Public        |
| /api/problems        | GET    | Retrieve the list of available coding problems.                 | Public        |
| /api/match/start     | POST   | Initiate a coding match between two users.                      | Authenticated |
| /api/match/submit    | POST   | Submit code to Judge0 for evaluation and receive the verdict.   | Authenticated |
| /api/leaderboard     | GET    | Fetch the global ELO ranking leaderboard.                       | Public        |

---

## 🛠️ Setup and Installation

Instructions for local setup will be added here once development is complete.
