Q: 6
Authorization
Mini Todos Application with User Authentication
Submission Instructions:
Please submit the Masai Repo Link.

Description:
You are tasked with creating a Mini Todos Application using Node.js, MongoDB with Mongoose, and JWT for authentication. Implement user authentication, manage user-specific to-do items, and ensure that only authenticated users can perform CRUD operations on their to-do items. Utilize password hashing for secure storage and implement JWT for user authentication. Optionally, include access tokens, token blacklist, and refresh tokens as phase 2 improvements.

Instructions:
User Schema and Authentication:

Define a User schema using Mongoose with the following fields:
email: String (unique and required)
password: String (required, hashed before storing)
Implement user registration and login routes:
Registration Route (/register): Accept user data including email and password. Hash the password before storing it in MongoDB.
Login Route (/login): Authenticate the user using email and password. Generate and return a JWT upon successful authentication.
Todo Schema and Relationship:

Define a Todo schema using Mongoose with the following fields:
title: String (required)
description: String (optional)
completed: Boolean (default: false)
isPublic: Boolean (default: false) — If true, the to-do item is visible to all users; otherwise, it is only visible to the user who created it.
userId: ObjectId (references the User schema, required)
Implement CRUD operations for todos:
Create Todo (/todos): Allow authenticated users to create new to-do items. Ensure that each to-do is associated with the authenticated user and set the isPublic field accordingly.
Read Todos (/todos): Allow authenticated users to retrieve their own to-do items. Additionally, allow retrieval of public to-do items for all users.
Update Todo (/todos/:id): Allow authenticated users to update their own to-do items.
Delete Todo (/todos/:id): Allow authenticated users to delete their own to-do items.
Authentication Middleware:

Implement middleware to check for valid JWTs in requests. Ensure that only authenticated users can access the CRUD operations for todos.
Optionally, implement JWT access tokens, token blacklist, and refresh tokens as phase 2 improvements.
Optional Phase 2 Improvements:
Access Tokens and Refresh Tokens:

Implement access tokens for user authentication and refresh tokens to issue new access tokens without requiring re-login.
Implement a token blacklist to handle revoked tokens and prevent their reuse.
Token Management:

Create routes and logic for issuing and refreshing tokens.
Implement necessary middleware to handle token verification and management.