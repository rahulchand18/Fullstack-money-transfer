# Fullstack Money Transfer System (Japan → Nepal)

This project is a full-stack money transfer system that simulates
**sender-to-receiver remittance from Japan to Nepal**, following a
real-world remittance workflow.

The system is built using **React, Node.js, Kafka, Redis, and MSSQL**,
and is fully **Dockerized** so it can be started with a single command.

---

## Architecture Overview

Frontend (React + Vite) → Backend API (Node.js + Express) → Kafka
(Producer) → Kafka Consumer → MSSQL Database

Additional services: - Redis (OTP storage and rate-limiting) - Kafka
(Asynchronous transaction processing) - MSSQL (Persistent transactional
storage)

---

## Key Features

- OTP-based admin authentication
- JWT authentication with auto-logout on 401
- Sender & Receiver management
- Transaction creation (Japan → Nepal only)
- Automatic currency conversion and service fee calculation
- Kafka-based asynchronous transaction processing
- Admin-controlled transaction completion
- Transaction reporting with filters
- Fully containerized setup

---

## Business Rules

Forex Rate: 1 JPY = 0.92 NPR

Service Fee (NPR-based slabs): - 0 -- 100,000 → NPR 500 - 100,000.01 --
200,000 → NPR 1,000 - Above 200,000 → NPR 3,000

---

## Environment Configuration

Docker: - Uses `.env.docker` inside respective folders frontend and backend

Local Development: - Backend: `backend/.env.example` - Frontend:
`frontend/.env.example`

---

## Running the Application (Docker)

1.  Start services: docker compose up --build

2.  Run migrations: docker exec -it backend npx knex migrate:latest --knexfile src/db/knexfile.js

3.  Run seeds: docker exec -it backend npx knex seed:run --knexfile src/db/knexfile.js

---

## 🌱 Database Seeding (Default Admin)

The application requires a **default admin user** to be present in the system.

### Important Notes

- The **seed must be run one time** to insert the default admin.
- Before running the seed, make sure the **email address defined in `users_seed.js` is accessible**, as OTP login depends on it.
- If email sending is disabled, OTP will not be sent via email.

### Email Configuration

- If `SEND_EMAILS=false`:
  - Email delivery is disabled
  - OTP will be **logged in the backend console**
- If `SEND_EMAILS=true`:
  - Proper mail configuration must be set up
  - OTP will be sent to the admin’s email address

### Running the Seed on local

```bash
npx knex seed:run --knexfile src/db/knexfile.js

## Access URLs

Frontend: http://localhost:5173\
Backend API: http://localhost:3000

---

```
