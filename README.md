# Next.js Authentication App

This is a full-stack authentication web application built with Next.js, Node.js, Prisma, and Neon.tech as the database. The application supports credential-based login and registration, OAuth authentication via GitHub and Google, forgot-password functionality, and two-factor authentication (2FA). It follows a component-based architecture, ensuring modular and maintainable code. Instead of traditional HTTP API calls, this project leverages Next.js actions for login and registration.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Prisma, NextAuth.js
- **Database**: Neon.tech (PostgreSQL)
- **Security**: Bcrypt.js, JWT, NextAuth
- **Email Service**: Nodemailer, Resend

## Features

- **User Authentication**

  - Register and login using email and password
  - Sign in with GitHub and Google
  - Password reset via email
  - Two-Factor Authentication (2FA) for added security

- **Modern Tech Stack**

  - **Next.js 15** for server-side rendering and API routes
  - **Prisma** as the ORM for database management
  - **Neon.tech** for the PostgreSQL database
  - **NextAuth.js** for authentication
  - **Tailwind CSS** for styling

- **Security Enhancements**

  - Bcrypt for password hashing
  - Secure token-based authentication
  - Session management with NextAuth

## Installation

Clone the repository:

```sh
git clone https://github.com/faridomarAf/next-s-auth-app.git
cd next-s-auth-app
```

Install dependencies:

```sh
npm install
```

## Environment Variables

Create a `.env` file in the root directory and add the required environment variables:

```env
DATABASE_URL="your_neon_tech_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
EMAIL_SERVER="your_smtp_server"
EMAIL_FROM="your_email@example.com"
```

## Running the Application

To start the development server:

```sh
npm run dev
```

For production build:

```sh
npm run build
npm run start
```
