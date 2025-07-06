# Zapform API

A serverless form handler API that allows users to create forms and handle form submissions with email notifications.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
  - [Authentication Routes](#authentication-routes)
  - [Form Routes](#form-routes)
  - [Submission Routes](#submission-routes)
- [Request/Response Examples](#requestresponse-examples)
- [Error Handling](#error-handling)
- [Authentication](#authentication)

## 🔍 Overview

Zapform is a backend API that enables developers to easily handle form submissions without managing form infrastructure. Users can register, create forms, and receive email notifications when forms are submitted.

## ✨ Features

- User registration and authentication
- JWT-based authentication
- Form creation with customizable endpoints
- Email notifications on form submissions
- Form submission tracking
- Input validation
- CORS support

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Email Service**: Nodemailer
- **Password Hashing**: bcryptjs

## 🚀 Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Zapform
```

2. Install dependencies

```bash
cd server
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables))

4. Start the server

```bash
npm start
```

## 🔧 Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
BASE_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=your_smtp_host
EMAIL_PORT=587
EMAIL_USER=your_email_username
EMAIL_PASS=your_email_password
```

## 📡 API Routes

### Authentication Routes

#### Register User

- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Access**: Public
- **Description**: Register a new user account

**Request Body**:

```json
{
  "username": "string (required)",
  "email": "string (required, valid email)",
  "password": "string (required, min 6 characters)"
}
```

**Validation Rules**:

- `username`: Required, cannot be empty
- `email`: Required, must be valid email format
- `password`: Required, minimum 6 characters

**Success Response** (201):

```json
{
  "token": "jwt_token_string",
  "msg": "User registered successfully"
}
```

**Error Responses**:

- `422`: Validation errors
- `409`: User already exists with this email
- `500`: Server error

---

#### Login User

- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Access**: Public
- **Description**: Authenticate user and get JWT token

**Request Body**:

```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

**Validation Rules**:

- `email`: Required, must be valid email format
- `password`: Required

**Success Response** (200):

```json
{
  "token": "jwt_token_string",
  "msg": "Login successful"
}
```

**Error Responses**:

- `422`: Validation errors
- `401`: Invalid credentials
- `500`: Server error

---

### Form Routes

#### Create Form

- **Method**: `POST`
- **Endpoint**: `/api/forms/createform`
- **Access**: Private (requires authentication)
- **Description**: Create a new form endpoint for receiving submissions

**Headers**:

```
Authorization: Bearer <jwt_token>
```

**Request Body**:

```json
{
  "name": "string (required)",
  "notificationEmail": "string (required, valid email)",
  "redirectUrl": "string (optional, valid URL)"
}
```

**Validation Rules**:

- `name`: Required, form name cannot be empty
- `notificationEmail`: Required, must be valid email format
- `redirectUrl`: Optional, must be valid URL if provided

**Success Response** (201):

```json
{
  "formId": "mongodb_object_id",
  "endpoint": "http://localhost:5000/api/submit/form_id",
  "msg": "Form created successfully"
}
```

**Error Responses**:

- `422`: Validation errors
- `401`: Unauthorized (invalid/missing token)
- `500`: Server error

---

### Submission Routes

#### Submit Form

- **Method**: `POST`
- **Endpoint**: `/api/submit/:formId`
- **Access**: Public
- **Description**: Submit data to a specific form (publicly accessible)

**URL Parameters**:

- `formId`: MongoDB ObjectId of the form

**Request Body**:

```json
{
  "field1": "any_value",
  "field2": "any_value",
  "customField": "any_value"
}
```

**Note**: The request body can contain any fields as the form accepts dynamic data.

**Success Response** (200):

```json
{
  "msg": "Form submitted successfully"
}
```

**Error Responses**:

- `404`: Form not found
- `500`: Server error

**Additional Features**:

- Automatically captures submitter's IP address
- Records User-Agent header
- Sends email notification to form owner
- Stores submission data in database

---

## 📝 Request/Response Examples

### User Registration Example

**Request**:

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response**:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "msg": "User registered successfully"
}
```

### Form Creation Example

**Request**:

```http
POST /api/forms/createform
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Contact Form",
  "notificationEmail": "notifications@example.com",
  "redirectUrl": "https://example.com/thank-you"
}
```

**Response**:

```json
{
  "formId": "648a1b2c3d4e5f6789012345",
  "endpoint": "http://localhost:5000/api/submit/648a1b2c3d4e5f6789012345",
  "msg": "Form created successfully"
}
```

### Form Submission Example

**Request**:

```http
POST /api/submit/648a1b2c3d4e5f6789012345
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "Hello, I'd like to get in touch!",
  "phone": "+1234567890"
}
```

**Response**:

```json
{
  "msg": "Form submitted successfully"
}
```

---

## ⚠️ Error Handling

### Common Error Responses

**Validation Error (422)**:

```json
{
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Authentication Error (401)**:

```json
{
  "msg": "No token, authorization denied"
}
```

**Not Found Error (404)**:

```json
{
  "msg": "Form not found"
}
```

**Server Error (500)**:

```json
{
  "msg": "Server Error"
}
```

---

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Lifecycle

- Tokens are issued upon successful registration or login
- Include the token in the Authorization header for protected routes
- Tokens contain the user's ID for identifying authenticated requests

### Protected Routes

- `POST /api/forms/createform` - Requires authentication

### Public Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/submit/:formId` - Form submission

---

## 📧 Email Notifications

When a form is submitted, an email notification is automatically sent to the `notificationEmail` specified during form creation. The email contains the submitted form data.

---

## 🗄️ Database Models

### User Model

- `username`: String, required
- `email`: String, required, unique
- `password`: String, required (hashed)
- `createdAt`: Date, default: Date.now

### Form Model

- `name`: String, required
- `notificationEmail`: String, required
- `redirectUrl`: String, optional
- `owner`: ObjectId (reference to User)
- `createdAt`: Date, default: Date.now

### Submission Model

- `formId`: ObjectId (reference to Form)
- `data`: Object (dynamic form data)
- `ip`: String (submitter's IP)
- `userAgent`: String (submitter's browser info)
- `submittedAt`: Date, default: Date.now

---

## 👨‍💻 Author

**Nikhil Maurya**

---

## 📄 License

ISC License
