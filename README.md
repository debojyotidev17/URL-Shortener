# URL Shortener API

This is a URL Shortener backend built with Node.js, TypeScript, Express, PostgreSQL, Drizzle ORM, Docker, JWT Authentication, and Zod.

The goal of this project was to move beyond basic CRUD applications and build something that resembles a real-world backend service. Users can register, log in, create short URLs, manage their own links, and access protected resources through JWT-based authentication.

The project also includes a refresh token flow, route protection using middleware, request validation, and a PostgreSQL database running inside Docker for a consistent development environment.

---

## Features

### User Authentication

* User registration with email and password
* Secure password hashing using bcrypt
* Login with JWT authentication
* Access Token and Refresh Token implementation
* Protected routes using custom authentication middleware
* Refresh token support for generating new access tokens

### URL Management

* Create shortened URLs
* Create custom short codes
* Automatically generate short codes using NanoID
* Redirect users from a short URL to the original destination
* View all URLs created by the authenticated user

### Validation and Security

* Request validation using Zod
* Password hashing with bcrypt
* JWT verification and route protection
* HTTP-only refresh token cookies
* Environment variable configuration using dotenv

### Database

* PostgreSQL as the primary database
* Drizzle ORM for type-safe database operations
* One-to-many relationship between users and URLs
* PostgreSQL containerized with Docker Compose

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Drizzle ORM
* Docker
* Docker Compose

### Authentication

* JSON Web Tokens (JWT)
* bcrypt

### Validation

* Zod

### Utilities

* NanoID

---

## Project Structure

```text
src/
│
├── controllers/
├── routes/
├── services/
├── middlewares/
├── validations/
├── models/
├── db/
├── utils/
├── types/
└── index.ts
```

The project follows a layered architecture where controllers handle incoming requests, services contain business logic, middleware manages authentication, and utilities contain reusable helper functions. This separation keeps the codebase easier to maintain and scale.

---

## Authentication Flow

When a user logs in successfully:

1. The server validates the user's credentials.
2. An Access Token is generated for authenticated requests.
3. A Refresh Token is generated and stored in an HTTP-only cookie.
4. The Access Token is returned to the client.

Protected routes require an access token in the Authorization header:

```http
Authorization: Bearer <access_token>
```

When the access token expires, the client can request a new one using the refresh token without requiring the user to log in again.

---

## Running PostgreSQL with Docker

The database runs inside a Docker container to ensure a consistent setup across different environments.

Start the database:

```bash
docker compose up -d
```

Stop the database:

```bash
docker compose down
```

Check running containers:

```bash
docker ps
```

This removes the need to install PostgreSQL directly on the host machine and makes onboarding easier for anyone running the project.

---

## What I Learned

Building this project helped me gain practical experience with:

* Designing REST APIs
* Implementing authentication and authorization
* Working with JWT access and refresh tokens
* Password hashing and credential validation
* Database design with PostgreSQL
* Type-safe database operations using Drizzle ORM
* Structuring larger Express applications
* Middleware-based authentication
* Request validation using Zod
* Managing services and business logic separately from controllers
* Running development infrastructure using Docker

---

## Future Improvements

Some features I would like to add in the future:

* Click analytics and tracking
* URL expiration support
* Edit and delete URL endpoints
* Rate limiting
* Refresh token rotation
* API documentation with Swagger
* Automated testing
* Redis caching
* Containerizing the backend service itself
* Role-based access control

---

This project was built as a learning exercise to explore modern backend development practices while working with TypeScript, PostgreSQL, Drizzle ORM, Docker, and JWT-based authentication.
