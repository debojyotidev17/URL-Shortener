# URL Shortener API

A secure URL shortener backend built with TypeScript, Express, PostgreSQL, Drizzle ORM, Docker, Zod validation, bcrypt password hashing, JWT access and refresh token authentication, protected routes, custom short links, and URL redirection.

This project was built to explore real-world backend development concepts beyond basic CRUD applications. It includes user authentication, token-based authorization, route protection through middleware, database relationships, request validation, and a Dockerized PostgreSQL setup.

---

## Features

### Authentication & Authorization

* User registration
* User login
* Password hashing using bcrypt
* JWT Access Token authentication
* JWT Refresh Token workflow
* Protected routes using custom authentication middleware
* HTTP-only refresh token cookies

### URL Shortening

* Create custom short URLs
* Auto-generate short codes using NanoID
* Redirect users using short URLs
* Retrieve all URLs created by the authenticated user

### Validation & Security

* Request validation using Zod
* Secure password storage with bcrypt
* Access token verification
* Refresh token validation
* Environment-based configuration

### Database

* PostgreSQL
* Drizzle ORM
* Type-safe database operations
* User-to-URL relationship mapping
* Dockerized PostgreSQL using Docker Compose

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

* JWT (JSON Web Tokens)
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
│
├── routes/
│
├── services/
│
├── middlewares/
│
├── validations/
│
├── models/
│
├── db/
│
├── utils/
│
├── types/
│
└── index.ts
```

The project follows a layered architecture where:

* Controllers handle incoming requests and responses
* Services contain business logic and database interactions
* Middleware manages authentication and authorization
* Validation schemas ensure request integrity
* Utilities provide reusable helper functions

---

## Authentication Flow

When a user logs in:

1. Credentials are validated.
2. An Access Token is generated.
3. A Refresh Token is generated.
4. The Refresh Token is stored in an HTTP-only cookie.
5. The Access Token is returned to the client.

Protected routes require:

```http
Authorization: Bearer <access_token>
```

When the Access Token expires, a new one can be generated using the Refresh Token without requiring the user to log in again.

---

## Route Overview

| Method | Endpoint     | Description                  | Protected |
| ------ | ------------ | ---------------------------- | --------- |
| POST   | /user/signup | Register a new user          | No        |
| POST   | /user/login  | Login user                   | No        |
| POST   | /refresh     | Generate new access token    | No        |
| POST   | /shorten     | Create a short URL           | Yes       |
| GET    | /urls        | Get all URLs created by user | Yes       |
| GET    | /:shortcode  | Redirect to original URL     | No        |

---

## API Endpoints

### Register User

```http
POST /user/signup
```

Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login User

```http
POST /user/login
```

Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "result": "success",
  "accessToken": "..."
}
```

---

### Refresh Access Token

```http
POST /refresh
```

Uses a valid refresh token to generate a new access token.

Response

```json
{
  "success": "success",
  "accessToken": "..."
}
```

---

### Create Short URL

```http
POST /shorten
```

Headers

```http
Authorization: Bearer <access_token>
```

Request Body

```json
{
  "Link": "https://www.google.com"
}
```

Custom Short Code

```json
{
  "shortCode": "google",
  "Link": "https://www.google.com"
}
```

Response

```json
{
  "result": "success",
  "message": "short link created successfully"
}
```

---

### Get All URLs

```http
GET /urls
```

Headers

```http
Authorization: Bearer <access_token>
```

Response

```json
{
  "result": "success",
  "data": []
}
```

---

### Redirect Using Short Code

```http
GET /:shortcode
```

Example

```http
GET /google
```

Response

```http
302 Redirect
```

Redirects the user to the original URL stored in the database.

---

## Database Schema

### User

| Field    | Type    |
| -------- | ------- |
| id       | Integer |
| name     | String  |
| email    | String  |
| password | String  |

### URL

| Field     | Type    |
| --------- | ------- |
| id        | Integer |
| userId    | Integer |
| shortCode | String  |
| Link      | String  |

Relationship

```text
User (1) ──────────── (N) URL
```

A single user can create multiple shortened URLs.

---

## Running PostgreSQL with Docker

Start PostgreSQL:

```bash
docker compose up -d
```

View running containers:

```bash
docker ps
```

Stop PostgreSQL:

```bash
docker compose down
```

Using Docker ensures a consistent development environment without requiring PostgreSQL to be installed locally.

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd url-shortener
```

Install dependencies:

```bash
npm install
```

Start PostgreSQL:

```bash
docker compose up -d
```

Push database schema:

```bash
npm run db:push
```

Start development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Run production build:

```bash
npm run start
```

---

## What I Learned

This project helped me gain practical experience with:

* REST API design
* Authentication and authorization
* JWT access and refresh token workflows
* Password hashing and credential management
* PostgreSQL database design
* Drizzle ORM
* Middleware architecture
* Request validation with Zod
* TypeScript backend development
* Service-oriented project structure
* Dockerized development environments

---

## Future Improvements

Planned enhancements include:

* URL click analytics
* URL expiration support
* Update and delete URL endpoints
* Rate limiting
* Refresh token rotation
* Swagger/OpenAPI documentation
* Automated testing
* Redis caching
* Containerized backend deployment
* Role-based authorization

---

## License

This project is open source and available under the MIT License.
