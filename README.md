# EventPulse API

EventPulse is a RESTful backend API for an event management platform. It provides secure user authentication, event management, event registrations, announcements, real-time communication using Socket.io, and cloud deployment.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- Jest
- Supertest
- Swagger / OpenAPI
- Postman
- Vercel

## Features

- User registration and login
- JWT-based authentication
- Role-based authorization
- Event creation, updating, and deletion
- Browse and retrieve events
- Event registration and cancellation
- User registration history
- Event announcements
- Real-time communication using Socket.io
- MongoDB Atlas cloud database
- Swagger API documentation
- Postman API collection
- Health monitoring endpoint
- Vercel deployment

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Roh-Adel/EYOUTH-30711070100043-EventPulse.git
cd EYOUTH-30711070100043-EventPulse

### 2. Install dependencies

```bash
npm install


### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb+srv://eventpulse_user:userproject@cluster0.vebccrr.mongodb.net/?appName=Cluster0
JWT_SECRET=a_long_random_string_no_one_can_guess
NODE_ENV=development



### 4. Seed the database

```bash
npm run seed


### 5. Start the development server

```bash
npm run dev

The API will be available at:

http://localhost:3000



## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs

Production Swagger URL:
https://eyouth-30711070100043-event-pulse.vercel.app/api-docs


## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT |


### Events

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get an event by ID |
| POST | `/api/events` | Create a new event |
| PATCH | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |


### Registrations

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/registrations` | Register for an event |
| GET | `/api/registrations/my` | Get current user's registrations |
| DELETE | `/api/registrations/:id` | Cancel a registration |


### Announcements

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/announcements` | Create an announcement |
| GET | `/api/announcements/:eventId` | Get announcements for an event |



### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check API and database health |



## Postman

A complete Postman collection is available in:

```text
postman/EventPulse API.postman_collection.json

The Postman environment is:
EventPulse Dev


## Deployment

The EventPulse API is deployed on Vercel.

### Live API

https://eyouth-30711070100043-event-pulse.vercel.app

### Health Check

https://eyouth-30711070100043-event-pulse.vercel.app/health

### Swagger Documentation

https://eyouth-30711070100043-event-pulse.vercel.app/api-docs


## Project Repository

https://github.com/Roh-Adel/EYOUTH-30711070100043-EventPulse