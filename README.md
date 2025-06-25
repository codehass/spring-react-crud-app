# 🌱 Spring Boot + ⚛️ React Full-Stack Application

A modern full-stack web application built with a Spring Boot backend and a React (Vite) frontend, fully containerized using Docker for seamless local development and deployment.

---

## 🚀 Tech Stack

### 🔧 Backend

- Java 21
- Spring Boot 3
- Spring Data JPA / Hibernate
- PostgreSQL

### 🎨 Frontend

- React 18
- Vite
- TypeScript
- Tailwind CSS

### ⚙️ Infrastructure

- Docker & Docker Compose
- Nginx (as a reverse proxy)

---

## 🧪 Quick Start

To run the project locally:

1. **Clone the repository**

```bash
git clone git@github.com:codehass/spring-react-crud-app.git
cd spring-react-crud-app
```

2. **Set up environment variables**
   Copy the example environment file and configure your GitHub and Google OAuth credentials:

- **_Add environment to repo_**

  ```bash
  cp .env.example .env
  ```

- **_Then you also add a separate .env inside the frontend directory:_**

  ```bash
  cd frontend
  cp .env.example .env
  ```

- **_Important Notes on .env Files_**

  - Always create your own .env files by copying from .env.example to avoid committing sensitive credentials.

  - Make sure to fill in all required keys and passwords such as database credentials, API keys, and OAuth secrets before running the application.

3. **Start the application using Docker Compose**

```bash
docker compose up --build -d
```

## 🌐 Local URLs

- Frontend: http://localhost:5173
