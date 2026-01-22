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

Seed must be run one time to import default admin. Before running seed, make sure the email in users_seed.js file is accessible for OTP.
If SEND_EMAILS is false then sending mail is disabled. If you don't want to setup mail config, the OTP is logged in console of backend.

---

## Access URLs

Frontend: http://localhost:5173\
Backend API: http://localhost:3000

---

## Transaction Status Lifecycle

PENDING → COMPLETED

---
