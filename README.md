
# Tasker - Task Management App

A full-stack Task Management Application built using **Next.js** for the frontend and **ASP.NET Core** for the backend. This app allows users to manage tasks, including features like user authentication, role-based access control (RBAC), and task CRUD operations.

## Overview

The **Task Management App** is designed to simplify task organization and assignment, providing an intuitive interface for managing task workflows. It features user authentication with JWT, task creation, updating, deletion, and viewing, with role-based access control to limit certain actions based on the user's role.

## Tech Stack

### Backend
- **ASP.NET Core**: Web API for managing users and tasks.
- **Entity Framework Core**: ORM for MySQL database interaction.
- **MySQL**: Database for storing users and tasks.
- **JWT (JSON Web Token)**: For secure authentication.

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Typed JavaScript for better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN UI**: Tailwind-based UI component library.

## Installation

### Prerequisites
- **Node.js** (v16.x or higher)
- **.NET SDK** (v6 or higher)
- **MySQL** (for backend database)

### Backend Setup (ASP.NET Core)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/tasker-api.git
   cd tasker-api
   ```

2. **Install dependencies**:
   ```bash
   dotnet restore
   ```

3. **Configure MySQL Database**:
   - Update the `appsettings.json` file with your MySQL database connection string.

4. **Run migrations**:
   ```bash
   dotnet ef database update
   ```

5. **Run the backend API**:
   ```bash
   dotnet run
   ```

### Frontend Setup (Next.js)

1. **Clone the frontend repository**:
   ```bash
   git clone https://github.com/yourusername/tasker-ui.git
   cd tasker-ui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file and set the API URL:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License.
