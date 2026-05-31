# Food App — Full-Stack Food Ordering & Delivery Platform

> A MERN-stack food delivery application with a customer storefront, a Stripe-powered checkout, and a dedicated admin dashboard for managing menus and orders.

<!-- Badges — replace placeholder values (build status, coverage, version) once CI/CD is configured. -->
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)
![Build](https://img.shields.io/badge/build-not%20configured-lightgrey) <!-- TODO: add real build/CI badge -->

---

## Overview

Food App is a full-stack food ordering and delivery platform built on the MERN stack (MongoDB, Express, React, Node.js). Customers can browse a categorized food menu, manage a shopping cart, pay through Stripe Checkout, and track their order status, while administrators manage the catalog and fulfil orders through a separate dashboard.

The project is organized as three independent applications that work together:

| App | Description | Stack |
| --- | --- | --- |
| `backend` | REST API handling auth, food catalog, cart, orders, payments, and image uploads | Node.js · Express · MongoDB |
| `frontend` | Customer-facing storefront for browsing, ordering, and tracking | React · Vite |
| `admin` | Admin dashboard for adding food, listing items, and managing orders | React · Vite |

It covers running an online food business end-to-end: catalog management, authenticated customer carts, payment processing, and order fulfilment in one self-hostable codebase.

---

## Features

### Customer (Frontend)
- **User authentication** — register and login with JWT-based sessions and bcrypt-hashed passwords.
- **Browse menu by category** — explore food items filtered by category.
- **Cart management** — add/remove items with quantities, persisted per logged-in user.
- **Stripe Checkout** — hosted payment flow with delivery charges applied.
- **Payment verification** — order is confirmed or rolled back based on payment outcome.
- **My Orders** — view past orders with live status (e.g. *Food Processing*).
- **App download and footer sections** — marketing/landing components included.

### Admin (Dashboard)
- **Add food items** — upload a product image (via Multer) with name, description, price, and category.
- **List and remove items** — view the full catalog and delete entries.
- **Order management** — list all orders and update their delivery status.
- **Toast notifications** — user feedback via React-Toastify.

### Backend (API)
- **RESTful endpoints** for food, users, cart, and orders.
- **JWT auth middleware** protecting cart and order routes.
- **Static image serving** of uploaded food images.
- **Input validation** for emails and password strength.

---

## Tech Stack

**Frontend & Admin**
- [React 18](https://react.dev/) with Hooks and Context API
- [Vite 5](https://vitejs.dev/) (dev server and build)
- [React Router DOM 6](https://reactrouter.com/)
- [Axios](https://axios-http.com/) for API calls
- [React-Toastify](https://fkhadra.github.io/react-toastify/) (admin notifications)
- Plain CSS per component

**Backend**
- [Node.js](https://nodejs.org/) and [Express 4](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) via [Mongoose 8](https://mongoosejs.com/)
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) (authentication)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (password hashing)
- [Stripe](https://stripe.com/) (payments)
- [Multer](https://github.com/expressjs/multer) (image uploads)
- [Validator](https://github.com/validatorjs/validator.js) (input validation)
- [CORS](https://github.com/expressjs/cors), [dotenv](https://github.com/motdotla/dotenv)

**Tooling**
- ESLint (React plugins)
- Nodemon (backend live reload)

**Hosting**
<!-- TODO: Hosting/deployment targets not configured in the codebase yet. Document chosen providers (e.g. Render/Railway for API, Vercel/Netlify for frontends, MongoDB Atlas for DB) once deployed. -->

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm
- A [MongoDB](https://www.mongodb.com/) database (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Stripe](https://dashboard.stripe.com/) account with a test secret key

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Food App"
```

### 2. Install dependencies

Each app has its own `package.json`. Install them separately:

```bash
# Backend API
cd backend
npm install

# Customer frontend
cd ../frontend
npm install

# Admin dashboard
cd ../admin
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend/` directory (see `backend/.env.example`):

```bash
# backend/.env

# Secret used to sign JWT auth tokens
JWT_SECRET=your_jwt_secret_here

# Stripe secret key (use a test key during development)
STRIPE_SECRET_KEY=your_stripe_key

# MongoDB connection string
MONGO_URI=your_mongo_uri

# Optional — defaults to 4000 if unset
PORT=4000
```

### 4. Run the apps locally

Open three terminals (one per app):

```bash
# Terminal 1 — Backend API -> http://localhost:4000
cd backend
npm start
```

```bash
# Terminal 2 — Customer frontend -> http://localhost:5174
cd frontend
npm run dev
```

```bash
# Terminal 3 — Admin dashboard -> http://localhost:5173 (default Vite port)
cd admin
npm run dev
```

> Note: The backend's Stripe success/cancel redirect is hardcoded to `http://localhost:5174` (the frontend). If your frontend runs on a different port, update `frontendUrl` in [backend/controllers/orderController.js](backend/controllers/orderController.js).
> <!-- TODO: Confirm the admin dev port — Vite defaults to 5173 but may shift to 5175 if 5173/5174 are taken. -->

---

## Available Scripts

### Backend (`backend/`)

| Command | Description |
| --- | --- |
| `npm start` | Starts the Express API with nodemon (live reload) on port `4000`. |

### Frontend & Admin (`frontend/`, `admin/`)

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with hot module replacement. |
| `npm run build` | Builds the production bundle into `dist/`. |
| `npm run preview` | Serves the production build locally for previewing. |
| `npm run lint` | Runs ESLint across the project. |

---

## Project Structure

```text
Food App/
├── backend/                  # Express + MongoDB REST API
│   ├── app.js                # App entry: middleware, routes, server bootstrap
│   ├── config/db.js          # MongoDB (Mongoose) connection
│   ├── controllers/          # Route handlers (food, user, cart, order)
│   ├── middleware/auth.js    # JWT auth guard
│   ├── models/               # Mongoose schemas (food, user, order)
│   ├── routes/               # Express routers
│   └── uploads/              # Multer-stored food images (served at /images)
│
├── frontend/                 # Customer-facing React app (Vite)
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx          # React entry
│       ├── App.jsx           # Routes: Home, Cart, Order, Verify, MyOrders
│       ├── components/       # Navbar, Header, Footer, FoodItem, ExploreMenu, ...
│       ├── context/          # StoreContext (cart, token, API base URL)
│       ├── pages/            # Home, Cart, PlaceOrder, MyOrders, Verify
│       └── assets/           # Images and static food data
│
├── admin/                    # Admin dashboard React app (Vite)
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx           # Routes: Add, List, Order
│       ├── components/       # Navbar, Sidebar
│       └── pages/            # Add (upload), List (catalog), Order (fulfilment)
│
└── package.json              # Root (declares react-router-dom only)
```

---

## Deployment

> This project is not yet deployed. The steps below are a general guide.

A typical deployment splits the three apps:

1. **Database** — Provision a managed MongoDB instance (e.g. [MongoDB Atlas](https://www.mongodb.com/atlas)) and copy its connection string into `MONGO_URI`.
2. **Backend API** — Deploy `backend/` to a Node host (e.g. [Render](https://render.com/), [Railway](https://railway.app/), or a VPS). Set `JWT_SECRET`, `STRIPE_SECRET_KEY`, `MONGO_URI`, and `PORT` as environment variables.
   - Uploaded images are stored on the local `uploads/` disk. For a stateless host, switch to object storage (e.g. S3/Cloudinary).
3. **Frontend & Admin** — Build each (`npm run build`) and deploy the static `dist/` output to a static host (e.g. [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)).
   - Replace the hardcoded `http://localhost:4000` API base URLs (in `frontend/src/context/StoreContext.jsx` and the admin app) with your deployed API URL, ideally via an environment variable.
   - Update the Stripe redirect `frontendUrl` in the backend to your deployed frontend URL.

<!-- TODO: Add provider-specific deployment configs (e.g. vercel.json, render.yaml, Dockerfile) once a target is chosen. -->

---

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push the branch: `git push origin feature/your-feature`.
5. Open a Pull Request describing your changes.

Please run `npm run lint` in the affected app before submitting, and avoid committing secrets.

---

## License

This project is licensed under the ISC License (as declared in `backend/package.json`).
<!-- TODO: Add a LICENSE file at the repo root to make the license explicit. -->

---

## Author / Contact

**Muhammad Furqan Abbas**

- GitHub: [@mfurqanabbas20](https://github.com/mfurqanabbas20)
- Email: mfurqanabbas20@gmail.com

<!-- TODO: Add portfolio/LinkedIn links if desired. -->
