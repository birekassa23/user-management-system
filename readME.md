
---

# **User Management System with Role-Based Authentication**

A robust user management system built with **Node.js**, **Express**, **MongoDB**, and **JWT**. This system allows users to register, log in, update their profile, and manage roles with role-based authorization to control access to various parts of the application. The system supports profile customization through avatar uploads and includes a secure password recovery system.

## **Features**
- **User Registration**: Users can create an account by providing their full name, email, password, and an optional avatar image.
- **Login & Authentication**: Secure login using email and password with JWT token generation.
- **Password Recovery**: Users who forget their password can request a reset link to regain access.
- **Profile Update**: Users can update their avatar at any time.
- **Role-Based Access Control**:
  - **Admin**: Can manage users (view, update roles, delete users).
  - **Editor**: Can create, edit, and manage content.
  - **Viewer**: Can only view content.
- **Secure API Endpoints**: Access to routes is controlled using middleware for both authentication and role-based authorization.

## **Tech Stack**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer (for avatar uploads)
- **Password Hashing**: bcryptjs
- **Middleware**: Express middleware for authentication and authorization
- **Environment Variables**: dotenv (for managing sensitive configuration)

## **Installation & Setup**

Follow the steps below to set up the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/user-management-system.git
cd user-management-system
```

### 2. Install Dependencies
Make sure you have `Node.js` and `npm` installed. Then run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of the project and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-secret-key
PORT=5000
```

- **MONGO_URI**: Connection string to your MongoDB database.
- **JWT_SECRET**: A secret key used for signing JWT tokens (ensure this is kept secure).
- **PORT**: Port on which the application will run (default is 5000).

### 4. Run the Application
To run the app in development mode:

```bash
npm run dev
```

The server will start at `http://localhost:5000`.

### 5. Testing the API
You can use tools like **Postman** or **Insomnia** to test the API. Below are some key API routes:

#### User Registration
- **POST** `/api/auth/register`
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "viewer"
  }
  ```

#### User Login
- **POST** `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Forgot Password (Request Reset Link)
- **POST** `/api/auth/forgot-password`
- **Request Body**:
  ```json
  {
    "email": "john@example.com"
  }
  ```

#### Reset Password
- **POST** `/api/auth/reset-password/:token`
- **Request Body**:
  ```json
  {
    "password": "newpassword123"
  }
  ```

#### Update Avatar (Protected Route)
- **PUT** `/api/auth/update-avatar`
- **Authorization**: Bearer JWT Token
- **Form Data**: Use `multipart/form-data` to upload an avatar image.

### 6. Role-Based Authorization
Each route requires different roles for access:
- **Admin**: Can access user management features.
- **Editor**: Can create and modify content.
- **Viewer**: Can only view content.

The `authorizeRole` middleware ensures that users can only access resources based on their role.

## **Middleware & Routes**

### 1. **Authentication Middleware** (`authenticateUser`)
- Ensures that the user is logged in by verifying the JWT token sent with requests.
- Attaches user data to the request object (`req.user`) for further use in route handlers.

### 2. **Authorization Middleware** (`authorizeRole`)
- Protects routes based on the user's role (admin, editor, or viewer).
- Ensures that users can only access routes for which they have appropriate permissions.

## **Folder Structure**
```bash

|user-management-system/
│
├── config                   # Configuration files
│   └── database-conn.js      # MongoDB connection setup
├── controllers              # Controller files to handle requests and responses
│   ├── user.controller.js    # Handles user-related logic like registration, profile, etc.
│   └── authentication.controller.js  # Handles login, password recovery, and JWT generation
├── middlewares              # Middlewares for authentication, authorization, and file uploads
│   ├── authorizationMiddleware.js  # Verifies JWT and checks user roles
│   └── upload.js             # Handles file uploads (avatar)
├── models                   # Mongoose models for database schema
│   └── user.model.js         # Defines the User schema (name, email, password, role, avatar)
├── routes                   # API route definitions
│   ├── authorization.routes.js   # Contains routes that require user authentication and role validation
│   └── authentication.route.js  # Routes for user authentication (register, login, reset password)
├── utils                    # Utility functions
│   └── sendResetPasswordEmail.js  # Sends a reset password email with a token
├── validators               # Input validation files using Joi or express-validator
│   ├── registrationValidation.js # Validates user registration input
│   └── loginValidation.js    # Validates login input
├── app.js                   # Main server file to configure routes and middleware
├── .gitignore               # Git ignore file to exclude unwanted files from version control
└── readMe.d                 # Project's detailed README (this file)

```


