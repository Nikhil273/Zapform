# Zapform - Serverless Form Handler

A modern full-stack application that simplifies form handling for developers. Create forms, collect submissions, and receive email notifications without managing complex infrastructure.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Contributing](#contributing)

## 🔍 Overview

Zapform is a comprehensive form handling solution that allows developers to quickly set up form endpoints for their websites. With a beautiful React frontend and robust Node.js backend, users can create custom forms, manage submissions, and receive instant email notifications - all without the hassle of setting up form infrastructure from scratch.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login system
- 📝 **Form Builder** - Create custom forms with unique endpoints
- 📧 **Email Notifications** - Automatic email alerts for new submissions
- 📊 **Dashboard** - View and manage your forms and submissions
- 🎨 **Modern UI** - Beautiful, responsive React interface
- 🔒 **Secure** - JWT authentication and data validation
- 📱 **Mobile Friendly** - Works seamlessly on all devices
- ⚡ **Fast** - Optimized performance with Vite build system

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Styling and animations
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

##  Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Clone the Repository
```bash
git clone <repository-url>
cd ServerlessForm
```

### Backend Setup
```bash
cd server
npm install
```

### Frontend Setup
```bash
cd ../client
npm install
```

## 🔧 Environment Setup

Create a `.env` file in the `server` directory:

```env
PORT=5000
BASE_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/zapform
JWT_SECRET=your_super_secret_jwt_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🎯 Usage

### Development Mode

1. **Start the Backend Server**:
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

2. **Start the Frontend Development Server**:
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the ISC License.

---

**Made with ❤️ by Nikhil Maurya**
