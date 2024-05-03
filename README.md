# Movie App Backend

Welcome to the Movie App Backend! This repository contains the backend code for a movie application that supports user authentication and allows users to manage their favorite movies.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Movie CRUD Operations**: The backend supports basic CRUD operations for managing movies.
- **Favorite Movies**: Users can add movies to their favorites list and view/delete them.
- **RESTful API**: The backend provides a RESTful API for easy integration with frontend applications.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js used for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data and movie information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: Used for secure authentication and authorization.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB instance or MongoDB Atlas account for database storage

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movie-app-backend
Install dependencies:
bash
Copy code
npm install
Set up environment variables:Create a .env file in the root directory and add the following variables:
makefile
Copy code
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Start the server:
bash
Copy code
npm start
API Endpoints
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Log in an existing user.
GET /api/movies: Get a list of all movies.
POST /api/movies: Add a new movie.
GET /api/movies/:id: Get details of a specific movie.
PUT /api/movies/:id: Update details of a movie.
DELETE /api/movies/:id: Delete a movie.
GET /api/favorites: Get the list of favorite movies for the authenticated user.
POST /api/favorites/:movieId: Add a movie to favorites.
DELETE /api/favorites/:movieId: Remove a movie from favorites.
Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Contact
For any inquiries or support, feel free to contact Your Name.
