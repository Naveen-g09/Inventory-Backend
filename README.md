# Ayush Inventory Backend

This repository contains the backend codebase for managing a medicine inventory system using PostgreSQL. It provides functionalities to display stock information, alert when stock levels are low, and perform CRUD operations on medicine stocks. The backend is specifically designed to support the Expo React Native app named "Ayush Inventory".

## Features

- Display stock information
- Alert when stock levels are low
- CRUD operations on medicine stocks
- Integration with Expo React Native app
- CORS support for cross-origin requests
- Utilizes Express.js for server-side logic
- Utilizes Axios for handling HTTP requests

## Technologies Used

- PostgreSQL: A powerful open-source relational database system.
- Express.js: A fast, unopinionated, minimalist web framework for Node.js.
- Axios: A promise-based HTTP client for the browser and Node.js.
- CORS: Cross-Origin Resource Sharing middleware for Express.js.
- [Add other relevant technologies]

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up your PostgreSQL database.
4. Configure your environment variables.
5. Run the server using `npm start`.

## Environment Variables

You need to set up the following environment variables:

- `DB_HOST`: Hostname for your PostgreSQL database.
- `DB_USER`: Username for your PostgreSQL database.
- `DB_PASSWORD`: Password for your PostgreSQL database.
- `DB_NAME`: Name of your PostgreSQL database.

## API Endpoints

1. **GET /stocks**: Retrieve all medicine stocks.
2. **GET /stocks/:id**: Retrieve details of a specific medicine stock.
3. **POST /stocks**: Add a new medicine stock.
4. **PUT /stocks/:id**: Update details of a specific medicine stock.
5. **DELETE /stocks/:id**: Delete a specific medicine stock.

## Deployment

This backend application can be deployed to various cloud services like AWS, Google Cloud Platform, or Heroku. Choose the cloud service that best suits your requirements and follow their deployment instructions.

