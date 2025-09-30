<div align="center">

# 📚 Libook - Online Library Platform  
---
</div>

Libook is an online library platform designed to help users discover, organize, and review books.  
This repository contains the complete source code for the application, including the backend built with **NestJS** and the frontend in **React**.  

---

### 🚧 Project Status 🚧

**Project in Development.** Features are being built step-by-step.

---

### ✨ Features

Here is a summary of what has been implemented and what is planned:

-   [x] **Backend API (NestJS):** Initial server structure.
-   [x] **Database with Prisma:** Connection and ORM setup with PostgreSQL.
-   [x] **User Registration:** Secure endpoint for new user registration with password hashing (Argon2).
-   [x] **User Login:** Authentication and JWT token generation.
-   [x] **Frontend (React):** Initial setup with Vite and TypeScript.
-   [x] **Book CRUD:** Full management of the book collection.
-   [x] **Advanced Search:** Integration with MeiliSearch or similar.
-   [x] **Personal Lists:** "Want to Read", "Reading", "Read" functionality.

---

### 🚀 Tech Stack

This project is built with a modern and robust stack, focused on performance and scalability.

| Layer          | Technology                                   |
| :------------- | :------------------------------------------- |
| **Backend** | Node.js, NestJS, TypeScript                  |
| **ORM** | Prisma                                       |
| **Database** | PostgreSQL                                   |
| **Authentication**| JWT, Argon2 (for password hashing)         |
| **Frontend** | React, TypeScript, Vite  |
| **Versioning** | Git & GitHub                                 |

---

### 📋 Prerequisites

Before you begin, you will need to have the following tools installed on your machine:
* [Node.js (v20.x or higher)](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)
* A running **PostgreSQL** instance, either locally or in the cloud.

---

### ⚙️ How to Run the Project

Follow the steps below to run the application in your development environment.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR-USERNAME/libook.git](https://github.com/YOUR-USERNAME/libook.git)
    cd libook
    ```

2.  **Set up the Backend:**
    ```bash
    # Navigate to the backend folder
    cd backend

    # Install dependencies
    npm install
    ```

3.  **Set up Environment Variables (Backend):**
    * Create a copy of the example file `.env.example` and rename it to `.env`.
    * Open the `.env` file and fill in the `DATABASE_URL` variable with your PostgreSQL connection string.
    ```env
    # .env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    ```

4.  **Run the Database Migrations:**
    This command will create all the necessary tables in your database.
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the Backend Server:**
    ```bash
    npm run start:dev
    ```
    The server will be running at `http://localhost:3000`.

6.  **Set up and Start the Frontend (when available):**
    ```bash
    # In a new terminal, navigate to the frontend folder
    cd frontend

    # Install dependencies
    npm install

    # Start the development server
    npm run dev
    ```

---

### 📜 Available Scripts

Inside the `backend/` folder, you can run several scripts:

-   `npm run start:dev`: Starts the server in development mode with hot-reload.
-   `npm run build`: Compiles the TypeScript code to JavaScript.
-   `npm run lint`: Runs the linter to check code quality.
-   `npx prisma studio`: Opens a visual interface to manage your database.

---

### 👤 Author

* GitHub: [@wmsalves](https://github.com/wmsalves)
* LinkedIn: [Wemerson Alves](https://www.linkedin.com/in/wmsalves/)
