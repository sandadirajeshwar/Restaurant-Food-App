# Restaurant-Food-App
A backend application built with Node.js, Express, and MongoDB using MVC architecture. Supports user authentication, restaurant management, food categories, order management, and admin controls. APIs are secured with JWT and tested using Postman.
Features

Authentication & Authorization (JWT-based login/register)

Admin Panel APIs

Manage users, restaurants, categories, foods, and orders

Full control over CRUD operations

User Management

Profile update, reset password, delete account

Restaurant Management

Create, view, update, and delete restaurants

Category Management

Create, update, and delete food categories

Food Management

Add, update, delete, and get foods with category & restaurant mapping

Order Management

Users can place orders for selected foods

Track order status (Pending, Confirmed, Delivered, Cancelled)

Admin/Restaurant can update and manage orders

Secure APIs with middleware validation

RESTful API Endpoints tested in Postman

Error handling & logging with morgan and cors

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Middleware: JWT, bcrypt, CORS, Morgan

Architecture: MVC (Model-View-Controller)

📌 API Modules

Auth → Register, Login, Reset Password

Users → Get User, Update User, Delete User

Admin → Manage Users, Foods, Categories, Orders

Restaurants → CRUD operations

Categories → CRUD operations

Foods → CRUD operations + Category & Restaurant integration

Orders → Place Order, View Orders, Update Order Status
