<div align="center">

# 📚 Libook - Online Library Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A modern and complete library platform built with NestJS, React, PostgreSQL, and MeiliSearch.

</div>

**Libook** is an online library platform designed to help users discover, organize, and review books. This repository contains the complete source code for the application, including a robust backend with NestJS and a reactive frontend with React.

---

### ✨ Implemented Features

The project was developed with a wide range of features covering the complete user and administrator journey:

#### User
-   ✅ **Full Authentication:** Signup, JWT Login, and session persistence.
-   ✅ **Public Catalog:** Visitors can explore the book catalog.
-   ✅ **Real-time Search:** A debounced search bar integrated with MeiliSearch for instant and relevant results.
-   ✅ **Pagination & Sorting:** Navigate through catalog pages and sort results by relevance, date, or title.
-   ✅ **Detail Page:** A complete view of book information, including synopsis, authors, and categories.
-   ✅ **Ratings & Reviews:** Authenticated users can submit ratings (score + comment).
-   ✅ **Personal Reading Lists:** "Want to Read", "Reading", and "Read" functionality for each book.
-   ✅ **"My Library" Page:** A personal area to view all books organized by their reading status.

#### Administration
-   ✅ **Secure Admin Panel:** Access restricted to users with the `ADMIN` role.
-   ✅ **Complete Book CRUD:** Administrators can Create, Read, Update, and Delete books from the catalog.
-   ✅ **Automatic Sync:** All changes to the catalog are synchronized in real-time with the search engine (MeiliSearch).

---

### 🚀 Tech Stack

| Category      | Technology / Library                                          |
| :------------- | :--------------------------------------------------------------- |
| **Backend** | Node.js, **NestJS**, TypeScript, Zod (validation)                 |
| **Frontend** | **React 18**, TypeScript, Vite, **Tailwind CSS** |
| **Database** | **PostgreSQL**, **Prisma ORM** |
| **Search** | **MeiliSearch** |
| **Authentication** | JWT (Access Token), Passport.js, Argon2 (hashing)                |
| **State (Frontend)** | **React Query** (server state), React Context (UI state) |
| **Forms** | **React Hook Form** + Zod                                        |
| **Routing** | React Router                                                     |
| **HTTP Client** | Axios                                                            |

---

### 📋 Prerequisites

-   [Node.js (v20.x or higher)](https://nodejs.org/en/)
-   [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/)
-   A running **PostgreSQL** instance.
-   A running **MeiliSearch** instance.

---

### ⚙️ Getting Started

1. **Clone the Repository**
    ```bash
    git clone [https://github.com/wmsalves/libook.git](https://github.com/wmsalves/libook.git)
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
    DATABASE_URL: Your PostgreSQL connection string.
    JWT_SECRET: A strong, random secret.
    GOOGLE_BOOKS_API_KEY: Your Google Books API key (required to populate the database).
    MEILISEARCH_HOST: Usually http://localhost:7700.
    MEILISEARCH_API_KEY: Your MeiliSearch Master Key (if any).
    ```

4.  **Run the Database Migrations:**
    This command will create all the necessary tables in your database.
    ```bash
    # Apply migrations to create the database tables
    npx prisma migrate dev

    # (Optional) Add base user data
    npm run prisma:seed

    # POPULATE THE DATABASE WITH REAL BOOKS (IMPORTANT)
    npm run import:books

    ```

5.  **Start the Backend Server:**
    ```bash
    npm run start:dev
    ```
    After starting the server, access http://localhost:3000/search/index once in your browser to trigger the initial indexing of books in MeiliSearch.

6.  **Set up and Start the Frontend (when available):**
    ```bash
    # In a new terminal, navigate to the frontend folder
    cd frontend

    # Install dependencies
    npm install
    
    # Create and configure the .env file
    cp .env.example .env
    
    # Start the development server
    npm run dev
    ```

---

### 📜 Available Scripts

Inside the `backend/` folder, you can run several scripts:

-    `npm run start:dev: Starts the server in development mode.`
-    `npx prisma migrate dev: Applies database migrations.`
-    `npm run prisma:seed: Populates the database with base users.`
-    `npm run import:books: Imports books from the Google Books API.`
-    `npx prisma studio: Opens the Prisma UI to view the database.`

Inside the `frontend/` folder, you can run several scripts:

-    `npm run dev: Starts the Vite development server.`
-    `npm run build: Builds the application for production.`
-    `npm run lint: Runs the linter.`
---

### 👤 Author

* GitHub: [@wmsalves](https://github.com/wmsalves)
* LinkedIn: [Wemerson Alves](https://www.linkedin.com/in/wmsalves/)
