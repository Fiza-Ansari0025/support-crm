Copy this directly into your `README.md` file:

````md
# Support CRM System

A full-stack Support CRM application built using React, Node.js, Express, and SQLite.

## Features

- Create support tickets
- View all tickets
- Search tickets
- Filter tickets by status
- Update ticket status
- Responsive dashboard UI

---

# Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js
- SQLite

---

# Project Setup

## Backend Setup

```bash
cd backend
npm install
node server.js
````

Backend runs on:


http://localhost:5000

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

http://localhost:5173


---

# API Endpoints

## Create Ticket

POST /api/tickets


## Get All Tickets

GET /api/tickets


## Search Tickets

GET /api/tickets?search=rahul


## Filter Tickets

GET /api/tickets?status=Open


## Get Single Ticket

GET /api/tickets/:ticket_id


## Update Ticket

PUT /api/tickets/:ticket_id


---

# Author

Fiza

```
```
