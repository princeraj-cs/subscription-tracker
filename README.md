# Subscription Tracker

Subscription Tracker is a full-stack web application for keeping track of recurring services and understanding how much they cost over time. Users can create an account, add subscriptions, search and filter their active services, review monthly and yearly spending estimates, and remove subscriptions they no longer use.

The application is split into two independently runnable packages:

- `backend`: Express and MongoDB API with JWT authentication.
- `frontend`: React and Vite client application.

## Features

- Account registration and sign-in.
- JWT-protected subscription operations.
- Add subscriptions manually or choose from popular service presets.
- Subscription categories including entertainment, productivity, education, health, and other.
- Daily, weekly, monthly, and yearly billing frequencies.
- USD, EUR, GBP, JPY, and AUD currency options.
- Search by service name or payment method.
- Filter subscriptions by category.
- Monthly and yearly spending estimates.
- Active subscription count and renewal information.
- Delete subscriptions.
- Arcjet middleware for request protection.
- Responsive React interface styled with Tailwind CSS.

## Technology Stack

### Frontend

- React 19
- Vite
- React Router
- Tailwind CSS 4
- Lucide React icons

### Backend

- Node.js with ES modules
- Express
- MongoDB and Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- Password hashing with bcrypt
- Arcjet request protection
- dotenv, CORS, cookie-parser, and Morgan-compatible dependencies

## Prerequisites

- Node.js and npm
- A running MongoDB instance, either local or hosted
- An Arcjet account and API key for the request-protection middleware

No root-level `package.json` is currently included, so dependencies are installed separately in `backend` and `frontend`.

## Installation

Clone the repository and install both packages:

```powershell
git clone <repository-url>
cd SUBSCRIPTION-TRACKER

cd backend
npm install

cd ..\frontend
npm install
```

## Environment Configuration

The backend loads environment variables from a file selected by `NODE_ENV`:

```text
.env.<NODE_ENV>.local
```

For local development, create `backend/.env.development.local`:

```env
PORT=5500
NODE_ENV=development
DB_URI=mongodb://127.0.0.1:27017/subscription-tracker
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
ARCJET_ENV=development
ARCJET_KEY=your-arcjet-key
```

The important values are:

| Variable         | Purpose                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `PORT`           | Port used by the Express API. The frontend proxy expects `5500` unless the Vite proxy is changed. |
| `NODE_ENV`       | Selects the environment file to load.                                                             |
| `DB_URI`         | MongoDB connection string.                                                                        |
| `JWT_SECRET`     | Secret used to sign authentication tokens. Use a long, private value.                             |
| `JWT_EXPIRES_IN` | Token lifetime, such as `7d`.                                                                     |
| `ARCJET_ENV`     | Arcjet environment setting exposed to the configuration.                                          |
| `ARCJET_KEY`     | Arcjet project key.                                                                               |

Do not commit environment files or real credentials.

For a production frontend build, create `frontend/.env.production.local` with the deployed API URL:

```env
VITE_API_URL=https://subscription-tracker-backend-3xc9.onrender.com
```

The frontend falls back to relative `/api` requests when `VITE_API_URL` is not set, which allows the local Vite proxy to continue handling development requests.

## Running Locally

Start the backend in one terminal:

```powershell
cd backend
npm run dev
```

The API runs at `http://localhost:5500` by default. Its root endpoint returns a simple welcome message.

Start the frontend in a second terminal:

```powershell
cd frontend
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. Requests beginning with `/api` are proxied to `http://127.0.0.1:5500`, so both development servers need to be running.

## Available Scripts

Run these commands from the package directory shown.

### Backend

| Command       | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `npm run dev` | Start the API with Nodemon and restart it when files change. |
| `npm start`   | Start the API with Node.js.                                  |

### Frontend

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite development server.            |
| `npm run build`   | Create a production build in `frontend/dist`. |
| `npm run preview` | Preview the production build locally.         |
| `npm run lint`    | Run the configured Oxlint command.            |

## API Reference

The API base path is `/api/v1`.

### Authentication

| Method | Endpoint         | Description                                                               | Auth |
| ------ | ---------------- | ------------------------------------------------------------------------- | ---- |
| `POST` | `/auth/sign-up`  | Create an account and return authentication data.                         | No   |
| `POST` | `/auth/sign-in`  | Authenticate an existing user.                                            | No   |
| `POST` | `/auth/sign-out` | Sign-out route; the frontend currently clears local authentication state. | No   |

Registration and sign-in requests use JSON bodies containing `email` and `password`; registration also accepts `name`.

### Users

| Method   | Endpoint     | Description                                                 | Auth         |
| -------- | ------------ | ----------------------------------------------------------- | ------------ |
| `GET`    | `/users`     | Return users through the current controller implementation. | No           |
| `GET`    | `/users/:id` | Fetch a user by ID.                                         | Bearer token |
| `POST`   | `/users`     | Placeholder user-creation response.                         | No           |
| `PUT`    | `/users/:id` | Placeholder user-update response.                           | No           |
| `DELETE` | `/users/:id` | Placeholder user-deletion response.                         | No           |

### Subscriptions

| Method   | Endpoint                    | Description                                                           | Auth         |
| -------- | --------------------------- | --------------------------------------------------------------------- | ------------ |
| `GET`    | `/subscriptions`            | Placeholder response for all subscriptions.                           | No           |
| `GET`    | `/subscriptions/:id`        | Placeholder subscription-detail response.                             | No           |
| `POST`   | `/subscriptions`            | Create a subscription for the authenticated user.                     | Bearer token |
| `PUT`    | `/subscriptions/:id`        | Placeholder update response.                                          | No           |
| `DELETE` | `/subscriptions/:id`        | Delete an owned subscription.                                         | Bearer token |
| `GET`    | `/subscriptions/user/:id`   | List subscriptions for an authenticated user.                         | Bearer token |
| `PUT`    | `/subscriptions/:id/cancel` | Placeholder cancellation response.                                    | No           |
| `GET`    | `/subscriptions/upcoming`   | Intended for upcoming renewals; currently affected by route ordering. | No           |

Authenticated requests use this header:

```http
Authorization: Bearer <token>
```

The frontend API helper reads the token from browser `localStorage` and adds the header automatically.

## Project Structure

```text
backend/
  app.js                    Express application and server entry point
  config/                   Environment and Arcjet configuration
  controllers/              Authentication, user, and subscription logic
  database/                 MongoDB connection
  middleware/               Authentication, Arcjet, and error middleware
  models/                   Mongoose models
  routes/                   API route definitions

frontend/
  src/
    App.jsx                 Routes and application shell
    components/             Navbar, modal, and service-logo components
    constants/              Popular service presets
    context/                Authentication state
    pages/                  Login, registration, and dashboard screens
    services/               Frontend API client
    index.css               Global styles
  public/                   Static assets
  vite.config.js            Vite and API proxy configuration
```

## Authentication Flow

1. A user registers or signs in through the frontend.
2. The backend validates the credentials and returns a JWT.
3. The frontend stores the token and user data in `localStorage`.
4. The API helper sends the token as a Bearer token for protected requests.
5. Logging out currently removes the local token and user data.

## Current Limitations

This README documents the current implementation, including unfinished API areas:

- Several user and subscription endpoints return placeholder responses rather than performing CRUD operations.
- The sign-out endpoint is not fully implemented server-side; logout is handled locally in the frontend.
- The current `GET /users` endpoint is public and should be reviewed before production use because user data exposure is a security concern.
- The `/subscriptions/upcoming` route is declared after `/:id`, so requests may be handled by the parameterized route instead of the intended upcoming-renewals handler.
- Renewal dates use approximate month and year durations when subscriptions are saved.
- Subscription expiration status is not continuously recalculated.
- Database connection failures are logged by the current startup flow but do not automatically terminate the server.

## Production Checklist

Before deploying, review the following:

- Use a managed MongoDB connection string and restrict database access.
- Set a strong, unique `JWT_SECRET` outside source control.
- Configure a production environment file and Arcjet key.
- Restrict CORS to the deployed frontend origin.
- Protect or remove the public users endpoint.
- Replace placeholder routes with complete implementations.
- Move authentication from development-oriented local storage to a production-appropriate strategy if required by your threat model.
- Build the frontend with `npm run build` and serve the generated assets through your hosting platform.

## License

No license has been specified for this project yet.
