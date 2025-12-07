## 📌 Project Overview

**IneEvents** is a modern, containerized full-stack web platform designed to manage engineering events efficiently. It features a **Vue.js frontend**, an **Express.js backend**, and a fully automated **CI/CD pipeline powered by Jenkins and Docker**.

---

## 🚀 Tech Stack

### 🎨 Frontend

* **Vue.js 3** – Progressive JavaScript framework
* **Vue Router** – Client-side routing
* **Pinia** – State management
* **Axios** – HTTP client
* **Vite** – Build tool and development server
* **Tailwind CSS** – Utility-first CSS framework

### ⚙️ Backend

* **Express.js** – Node.js web framework
* **Supabase** – Backend-as-a-Service (PostgreSQL database)
* **CORS** – Cross-origin resource sharing
* **dotenv** – Environment variable management

### ☁️ DevOps & Infrastructure

* **Docker** – Containerization
* **Docker Compose** – Multi-container orchestration
* **Nginx** – Web server & reverse proxy
* **Jenkins** – CI/CD pipeline automation
* **Docker Hub** – Container registry

---

## 🐳 Run with Docker Compose

### ▶️ Build and Start Containers

```bash
docker compose up --build
```

### ▶️ Run in Detached Mode

```bash
docker compose up -d --build
```

### 🌐 Application Access

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## ⛔ Stop the Application

```bash
docker compose down
```