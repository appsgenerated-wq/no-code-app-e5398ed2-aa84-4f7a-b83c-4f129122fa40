# Newton vs. Lagrange Concepts App

This application allows users to explore, post, and discuss scientific concepts developed by Isaac Newton and Joseph-Louis Lagrange. It's built using React for the frontend and Manifest for a completely managed backend.

## Features

- **User Authentication**: Sign up and log in to participate.
- **Concept Creation**: Authenticated users can post new scientific concepts, attributing them to either Newton or Lagrange.
- **Public Viewing**: All published concepts are visible to everyone.
- **Ownership Control**: Users can only edit or delete the concepts they have created.
- **Admin Panel**: A built-in admin interface to manage all users and concepts.

## Getting Started

### Prerequisites

- Node.js and npm
- A running Manifest backend instance

### Frontend Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the application**:
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

### Backend

The backend is powered by Manifest and is defined in the `manifest.yml` file. When deployed, Manifest automatically provisions a database, generates a REST API, and provides an admin panel.

### Accessing the Admin Panel

-   **URL**: Navigate to the `/admin` path of your deployed backend URL.
-   **Default Admin**: `admin@manifest.build` / `admin`
