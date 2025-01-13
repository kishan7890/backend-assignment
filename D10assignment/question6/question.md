Q: 6
Advanced Data Validation with Mongoose Schema
Submission Instructions:
Please submit the Masai Repo Link.

Description:
You are building an e-commerce application where users can create product listings. Each product listing must include a product name, price, category, stock quantity, SKU (Stock Keeping Unit), and a list of tags. You need to enforce specific validation rules to ensure that the data meets the application's requirements.

Instructions
create an express server, connect the mongo as DB, perfom the CRUD operations on Product by creating schema and model, segreate the Product route using Router and maintain clean coding practise.

Tasks:

Create a Mongoose Schema:

productName: A required string field with a maximum length of 50 characters.
price: A required number field that must be a positive value.
category: A required string field that must be one of the predefined categories using enum (e.g., "Electronics", "Clothing", "Books", "Home Appliances").
stock: A required number field that must be an integer greater than or equal to 0.
SKU: A required string field that must be unique and follow the pattern PROD-XXXX, where X is any alphanumeric character.
tags: An optional array of strings, where each string should be a non-empty tag and must not contain special characters.
Validation Rules:

The productName field must be non-empty and cannot exceed 50 characters.
The price field must be a positive number greater than 0.
The category field should only accept specific values defined by an enum (e.g., "Electronics", "Clothing", "Books", "Home Appliances").
The stock field should be an integer value and cannot be negative.
The SKU field should match the pattern PROD-XXXX and must be unique across the collection.
The tags array should contain non-empty strings without special characters, and no duplicate tags are allowed.
Custom Validation Logic (optional):

Implement a custom validator for the tags field to ensure that there are no duplicate tags within the array.
Add a custom validation message for each field that explains the specific validation failure (e.g., "Price must be a positive number").
Use a regex pattern to validate the SKU field, ensuring it follows the format PROD-XXXX.
Ensure that the category field is validated using an enum, restricting it to a predefined set of values.