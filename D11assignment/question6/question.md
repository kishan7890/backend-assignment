Q: 6
Relationship-1
Product Management System
Submission Instructions:
Please submit the Masai Repo Link.

Description:
You are tasked with building a Product Management System using Mongoose and MongoDB. The system will manage products within different categories and allow for various operations on these products.

Instructions
Product Schema:

Define a Product schema with the following fields:
name: A string that is required and must be unique across all products.
price: A number that must be positive (greater than zero).
category: A string representing the category to which the product belongs.
stock: A number indicating how many items of this product are in stock. This field should be required and have a default value of 0.
created_at: A date field that stores the timestamp when the product was added. It should default to the current date and time.
Category Schema:

Define a Category schema with the following fields:
name: A string that is required and must be unique across all categories.
description: A string that provides details about the category.
products: An array of ObjectIDs that reference the Product schema. This will represent the products that belong to this category.
Functionality:

Create:
Implement a function to add a new product. Ensure that the product name is unique, and the price is a positive number.
Implement a function to create a new category and associate products with it. Ensure that the category name is unique.
Read:
Implement a function to list all products in a specific category.
Implement a function to get detailed information about a single product, including its category and stock status.
Update:
Implement a function to update the price, stock, and category of a specific product. Ensure that the new price is positive.
Implement a function to update the description of a specific category.
Delete:
Implement a function to delete a product. Ensure that the product is also removed from any category it was associated with.
Implement a function to delete a category. Optionally, you can decide whether to delete all products associated with this category or move them to an "Uncategorized" category.
Challenges:

Handle edge cases where a product might be associated with multiple categories.
Implement validation and error handling to ensure data integrity (e.g., preventing duplicate names, ensuring positive prices and stock values).
Consider implementing a feature where stock levels are automatically adjusted when a product is purchased.
All changes saved


