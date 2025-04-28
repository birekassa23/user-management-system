# 🏗️ Structure of the User Authentication and Authorization System

### 1. **User Registration**
- Fields: `name`, `email`, `password`, `avatar (optional)` ✅
- Validate user input. ✅
- Hash the password before saving. ✅
- Save avatar if uploaded (using `Multer` for file upload). ✅

### 2. **User Login**
- User submits `email` and `password`. ✅
- Find user → Compare password hash. ✅
- If valid, generate and send a **JWT token**.

### 3. **Password Reset**
- User submits email → Send a **reset password token** via email.
- Token allows user to set a new password securely.

### 4. **Avatar Update**
- Allow user to upload or replace avatar anytime.
- Delete old avatar if needed.

### 5. **Role-Based Authorization**
- Roles: `admin`, `editor`, `viewer`
- Protect routes based on user role.

---

# 🛠️ Tech Stack
- **Node.js + Express** (backend server)
- **MongoDB + Mongoose** (database & ORM)
- **bcryptjs** (password hashing)
- **jsonwebtoken** (authentication tokens)
- **Multer** (avatar uploads)
- **nodemailer** (sending password reset emails)
- **express-validator** or **Joi** (input validation)

