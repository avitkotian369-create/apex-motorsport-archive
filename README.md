# Full-Stack Monorepo (Next.js 15 + FastAPI)

A modern full-stack web application workspace with a Next.js 15 frontend, FastAPI Python backend, and asynchronous database layer supporting SQLite and PostgreSQL.

## Directory Overview

- **`/web`**: Next.js 15 application with App Router, TypeScript, Tailwind CSS, and Lucide React icons.
- **`/backend`**: FastAPI asynchronous backend with SQLAlchemy 2.0, Pydantic V2, and SQLite/Postgres support.
- **`tasks.md`**: Blueprint application roadmap, schema definitions, and phased task backlog.

---

## Quickstart Guide

### 1. Run Backend Service

```bash
cd backend

# On Windows
.\.venv\Scripts\Activate.ps1
python run.py
```
Backend will be available at:
- API Root: `http://localhost:8000`
- Interactive API Docs (Swagger UI): `http://localhost:8000/docs`
- Health Endpoint: `http://localhost:8000/api/health`

### 2. Run Web Frontend

```bash
cd web

npm install
npm run dev
```
Web application will be accessible at `http://localhost:3000`.

---

## Database Configuration

By default, the backend uses an asynchronous SQLite database at `./app.db`.
To switch to PostgreSQL, simply update `DATABASE_URL` in `backend/.env`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/blueprint_db
```
