# ChatApp Backend: Real-Time Messaging Platform

## Overview

ChatApp Backend is built with **NestJS** and **Socket.IO** to provide the server-side logic for the real-time messaging platform. It handles user authentication, message storage, and real-time communication with clients using **WebSockets**. This backend serves as the API that the frontend communicates with to provide seamless, instant messaging features.

## Features

- **User Authentication**: Secure user login and registration using JWT tokens.
- **WebSocket Communication**: Real-time messaging with WebSockets via **Socket.IO**.
- **Private & Group Chat Management**: Allows for creating and managing private and group chats.
- **Message Persistence**: Stores chat messages in the database for later retrieval.
- **Password Management**: Users can reset their passwords securely.
- **Environment Variables**: Configuration of the backend via environment variables for flexibility.

## Technology Stack

- **Backend**: NestJS
- **Real-time Communication**: WebSockets (Socket.IO)
- **Database**: MongoDb
- **Environment Configuration**: `.env` for managing settings

## Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **npm** (for managing packages)
- **Database** (e.g., Mongodb)

### Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/OSMaben/chatapp_backend.git
cd chatapp_backend
```

2. **Install Project Dependencies:
   ```bash
   npm install


3. **Run the Backend Server
```bash
npm run start:dev
