# Service Marketplace

A comprehensive REST API for a service marketplace platform built with Node.js, Express, and MongoDB. This platform connects service providers with customers, enabling browsing, booking, and management of services.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Running the Application](#running-the-application)
- [Author](#author)

## 🎯 Overview

Service Marketplace is a full-featured backend API that powers a platform where:
- **Customers** can discover and book services
- **Providers** can list and manage their services
- **Admins** can manage the platform (categories, skills, etc.)

The platform supports multi-role access control with JWT-based authentication and secure password hashing.

## ✨ Features

- **User Management**
  - User registration and login with email authentication
  - Role-based access control (Admin, Provider, Customer)
  - User profiles with avatar support
  - Password hashing with bcryptjs

- **Service Management**
  - Create, read, update, and delete services
  - Browse all services or user-specific services
  - Service categorization
  - Provider profiles

- **Service Requests**
  - Customers can request services
  - Track personal requests
  - Providers can view and manage incoming requests
  - Update request status

- **Skills Management**
  - Create and manage skills
  - Skill approval system (for admins)
  - Delete skills

- **Categories**
  - Create and manage service categories
  - Get all categories or specific categories by ID
  - Update and delete categories

- **Reviews**
  - Customer reviews for services and providers

- **File Management**
  - Image upload support via Cloudinary
  - Multer for handling file uploads

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** (v5.2.1) | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** (v9.7.0) | MongoDB ODM |
| **JWT** | Authentication tokens |
| **bcryptjs** (v3.0.3) | Password hashing |
| **Multer** (v2.1.1) | File upload handling |
| **Cloudinary** (v2.10.0) | Cloud image storage |
| **CORS** | Cross-origin resource sharing |
| **dotenv** | Environment configuration |
| **Nodemon** (dev) | Auto-restart during development |

## 📁 Project Structure

```
src/
├── app.js                    # Express app setup and route mounting
├── index.js                  # Server entry point
├── config/
│   └── db.js                # MongoDB connection
├── controllers/              # Business logic for each feature
│   ├── userController.js
│   ├── serviceController.js
│   ├── requestController.js
│   ├── skillController.js
│   ├── categoryController.js
│   ├── reviewController.js
│   └── providerProfileController.js
├── models/                   # MongoDB schemas
│   ├── userModel.js
│   ├── serviceModel.js
│   ├── requestModel.js
│   ├── skillModel.js
│   ├── categoryModel.js
│   ├── reviewModel.js
│   └── providerProfileModel.js
├── routes/                   # API route definitions
│   ├── user.route.js
│   ├── services.route.js
│   ├── request.route.js
│   ├── skillRoute.js
│   ├── categoryRoute.js
│   ├── review.route.js
│   └── providerProfileRoute.js
└── middleware/               # Custom middleware
    ├── authMiddleware.js     # JWT authentication
    └── roleMiddleware.js     # Role-based access control
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance (local or cloud - MongoDB Atlas)
- Cloudinary account (for image uploads)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hackerolley/service-market-place.git
   cd service-market-place
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see Configuration section below)

4. **Start the server**
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

The server will run on `http://localhost:5000` by default.

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/service-marketplace

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary (optional, for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS (optional)
CLIENT_URL=http://localhost:3000
```

## 📡 API Endpoints

### Users (`/api/users`)
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout

### Services (`/api/services`)
- `POST /api/services/createservice` - Create a new service
- `GET /api/services/getallservices` - Get all services
- `GET /api/services/getmyservices` - Get current user's services
- `GET /api/services/getservice/:id` - Get a specific service
- `PUT /api/services/updateservice/:id` - Update a service
- `DELETE /api/services/deleteservice/:id` - Delete a service

### Service Requests (`/api/requests`)
- `POST /api/requests/createrequest` - Create a service request
- `GET /api/requests/getmyrequests` - Get user's own requests
- `GET /api/requests/getproviderrequests` - Get provider's incoming requests
- `PUT /api/requests/updaterequeststatus/:id` - Update request status

### Skills (`/api/skills`)
- `POST /api/skills/createSkill` - Create a new skill
- `GET /api/skills/approvedSkills` - Get approved skills
- `PUT /api/skills/approveSkill/:id` - Approve a skill (admin only)
- `DELETE /api/skills/deleteSkill/:id` - Delete a skill

### Categories (`/api/categories`)
- `GET /api/categories/getAllCategories` - Get all categories
- `GET /api/categories/getCategoryById/:id` - Get category by ID
- `POST /api/categories/createCategory` - Create a category
- `PUT /api/categories/updateCategory/:id` - Update a category
- `DELETE /api/categories/deleteCategory/:id` - Delete a category

## 💾 Database Models

### User
- `name` - User's full name
- `email` - Unique email address
- `phone` - Contact number
- `password` - Hashed password (min 6 characters)
- `avatar` - Profile image URL
- `roles` - User role (admin, provider, customer)

### Service
- Service details and metadata

### Service Request
- Request tracking between customers and providers

### Skills
- Skills that providers can offer

### Categories
- Service categories

### Reviews
- Customer reviews for services and providers

### Provider Profile
- Extended profile information for service providers

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication:

1. User registers and logs in
2. Server returns a JWT token
3. Client includes token in the `Authorization` header: `Bearer <token>`
4. Middleware verifies token before processing protected routes

**Protected Routes** require a valid JWT token in the request header.

### Authentication Middleware Flow
- Extracts token from `Authorization` header
- Verifies token signature using `JWT_SECRET`
- Fetches user from database
- Attaches user object to request for downstream use

## ▶️ Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```
Uses Nodemon to automatically restart the server when files change.

### Production Mode
```bash
npm start
```

### Testing Endpoints
Test API endpoints using:
- Postman
- Insomnia
- cURL
- VS Code REST Client

Example request:
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## 👤 Author

**Yakub Yusuf Olaide**

- GitHub: [Hackerolley](https://github.com/Hackerolley)
- Repository: [service-market-place](https://github.com/Hackerolley/service-market-place)

## 📄 License

ISC License

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a pull request.

## 📞 Support

For support, please open an issue on the [GitHub repository](https://github.com/Hackerolley/service-market-place/issues).

---
