# Chat Application

This is a full-stack chat application built with Node.js for the backend and Angular for the frontend. It allows users to sign up, log in, send and receive messages in real-time.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Features

- User authentication with JWT
- Real-time messaging with Socket.io
- Send and receive messages
- Responsive design using Tailwind CSS

## Technologies Used

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.io
- Frontend: Angular, Tailwind CSS
- Authentication: JSON Web Tokens (JWT)

## Prerequisites

- Node.js (v14.x or later)
- Angular CLI (v18.x or later)
- MongoDB (local or remote instance)

## Installation

### Backend

1. Clone the repository:

    ```sh
    git clone https://github.com/manthanank/chat-application.git
    cd chat-application/backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:

    ```sh
    cd chat-application
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the frontend server:

    ```sh
    ng serve
    ```

## Running the Application

- The backend server will run on `http://localhost:5000`.
- The frontend server will run on `http://localhost:4200`.

## API Endpoints

### Auth

- **POST /api/auth/signup**: Create a new user
- **POST /api/auth/login**: Authenticate a user and get a token

### Chat

- **POST /api/chat/send**: Send a message
- **GET /api/chat/messages**: Get chat messages
  - Query Parameters:
    - `senderId`: The ID of the sender
    - `receiverId`: The ID of the receiver

## Usage

1. **Sign Up**: Create a new account by navigating to the sign-up page.
2. **Log In**: Log in with your credentials to access the chat application.
3. **Send Message**: Use the form to send a new message.
4. **View Messages**: View a list of all your messages in real-time.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
