# 🎫 Customer Support Ticket System API

A RESTful API built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** for managing customer support tickets. The system provides secure authentication, role-based authorization, ticket assignment, status management, and a reply system for customer-agent communication.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using Bcrypt
- Role-Based Authorization

### User Roles
- Admin
- Agent
- Customer

### Ticket Management
- Create Ticket
- Get All Tickets (Role-Based)
- Assign Ticket to Agent (Admin Only)
- Update Ticket Status (Admin & Assigned Agent)

### Reply System
- Customer can reply to their own tickets
- Agent can reply to assigned tickets
- View complete ticket conversation

### Dashboard
- Admin Dashboard
  - Total Tickets
  - Open Tickets
  - In Progress Tickets
  - Resolved Tickets
  - Closed Tickets
  - Total Customers
  - Total Agents

- Agent Dashboard
  - Assigned Tickets
  - Open Tickets
  - In Progress Tickets
  - Resolved Tickets

### Additional Features
- Request Validation using Zod
- Modular Folder Structure
- Centralized Error Handling
- Response Helper
- Async Error Handling
- Environment Variable Configuration

---

# 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- BcryptJS
- Zod

---

# 📁 Project Structure

```
src
│
├── config
├── middleware
├── routes
├── utils
├── modules
│   ├── auth
│   ├── user
│   ├── ticket
│   ├── reply
│   └── dashboard
│
├── app.ts
└── server.ts
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move to project folder

```bash
cd customer-support-ticket-system
```

Install dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file and add:

```env
PORT=5000

DATABASE_URL=your_mongodb_connection_string

JWT_MY_SECRET=your_secret_key

JWT_ACCESS_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10
```

---

# ▶️ Run Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |

---

## Tickets

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/tickets |
| GET | /api/v1/tickets |
| PATCH | /api/v1/tickets/:id/assign |
| PATCH | /api/v1/tickets/:id/status |

---

## Replies

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/replies/:ticketId |
| GET | /api/v1/replies/:ticketId |

---

## Dashboard

| Method | Endpoint |
|---------|----------|
| GET | /api/v1/dashboard/admin |
| GET | /api/v1/dashboard/agent |

---

# 🔒 Authentication

All protected routes require a JWT token.

Example Header

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 👥 Roles

### Admin

- Manage Tickets
- Assign Tickets
- Update Ticket Status
- View Dashboard

### Agent

- View Assigned Tickets
- Update Assigned Ticket Status
- Reply to Assigned Tickets
- View Agent Dashboard

### Customer

- Create Tickets
- View Own Tickets
- Reply to Own Tickets

---

# 🧪 API Testing

All APIs were tested using **Postman**.

A Postman Collection is included with the submission.

---

# 📖 Validation

Request validation is implemented using **Zod**.

---

# 📌 Error Handling

The project includes centralized error handling for:

- Validation Errors
- Authentication Errors
- Authorization Errors
- Resource Not Found
- Internal Server Errors

---

# 👨‍💻 Author

Developed as part of the **Customer Support Ticket System Backend Assignment** using **Node.js, Express.js, TypeScript, and MongoDB**.# customer-support-system-apis
