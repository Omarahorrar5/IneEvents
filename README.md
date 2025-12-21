# 🎯 IneEvents – Full-Stack & DevSecOps Event Management Platform

## 📌 Project Overview

**IneEvents** is a modern, containerized **full-stack web application** designed to manage and showcase engineering events such as hackathons, competitions, and forums across different institutions.

Beyond application development, this project focuses heavily on **DevSecOps practices**, featuring a **fully automated, secure CI/CD pipeline** that takes code from **commit → build → scan → package → deploy → monitor** on **Kubernetes** using **GitOps principles**.

---

## 🧩 Architecture Overview

**High-level flow:**

```
Developer Commit
      ↓
   Jenkins CI
      ↓
 SonarQube (Code Quality)
      ↓
 Docker Build
      ↓
 Trivy (Image Security Scan)
      ↓
 Docker Hub (Registry)
      ↓
 GitOps Repo (Helm values update)
      ↓
 ArgoCD
      ↓
 Kubernetes (Minikube)
      ↓
 Prometheus & Grafana
```

---

## 🔄 CI/CD Pipeline Diagram

> 📌 **CI/CD & GitOps Pipeline**

![CI/CD Pipeline Diagram](./docs/pipeline.png)

> *This diagram illustrates the complete DevSecOps pipeline, from source code commit to declarative Kubernetes deployment using ArgoCD.*

---

## 🚀 Tech Stack

### 🎨 Frontend

* **Vue.js 3** – Progressive JavaScript framework
* **Vue Router** – Client-side routing
* **Pinia** – State management
* **Axios** – API communication
* **Vite** – Build tool & dev server
* **Tailwind CSS** – Utility-first styling

### ⚙️ Backend

* **Express.js** – Node.js REST API
* **Supabase** – PostgreSQL database & authentication
* **CORS** – Secure cross-origin handling
* **dotenv** – Environment variable management

---

## ☁️ DevSecOps & Infrastructure

* **Docker** – Application containerization
* **Docker Compose** – Local multi-container orchestration
* **Nginx** – Reverse proxy & frontend serving
* **Jenkins** – CI/CD pipeline automation
* **SonarQube** – Static code analysis & quality gates
* **Trivy** – Container vulnerability scanning
* **Docker Hub** – Container image registry
* **Helm** – Kubernetes application packaging
* **ArgoCD** – GitOps-based continuous delivery
* **Kubernetes (Minikube)** – Container orchestration
* **Prometheus** – Metrics collection
* **Grafana** – Monitoring & visualization

---

## 🔐 DevSecOps Pipeline Capabilities

The CI/CD pipeline automatically performs:

* ✅ Static code analysis with enforced **quality gates**
* ✅ Secure Docker image builds
* ✅ Vulnerability scanning using **Trivy**
* ✅ Versioned image push to **Docker Hub**
* ✅ GitOps-based image tag updates
* ✅ Declarative deployment via **ArgoCD**
* ✅ Continuous monitoring with **Prometheus & Grafana**

---

## 🐳 Run Locally with Docker Compose

### ▶️ Build & Start Containers

```bash
docker compose up --build
```

### ▶️ Run in Detached Mode

```bash
docker compose up -d --build
```

### 🌐 Access the Application

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## ⛔ Stop the Application

```bash
docker compose down
```

---

## 📂 Related Repositories

* **Application Repository:**
  👉 [https://github.com/Omarahorrar5/IneEvents](https://github.com/Omarahorrar5/IneEvents)

* **GitOps / CD Repository:**
  👉 [https://github.com/Omarahorrar5/IneEvents-GitOps](https://github.com/Omarahorrar5/IneEvents-GitOps)

---
