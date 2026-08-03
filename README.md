# HerbalTrace

HerbalTrace is a web-based system for managing essential oil production batches, linking lab certificates, and tracking dispatches to buyers. It provides a centralized platform to improve traceability. The system also includes basic analytical features to identify irregular yield patterns and generate simple production insights.

---

## Live Deployment

- **Live App (Frontend):** [https://herbal-trace-six.vercel.app](https://herbal-trace-six.vercel.app)
- **Live API (Backend):** [https://herbaltrace.onrender.com](https://herbaltrace.onrender.com)

### Tech Stack

- **Frontend:** React + Vite, deployed on Vercel
- **Backend:** Node.js + Express, deployed on Render
- **Database:** MongoDB Atlas
- **Auth:** JWT (email/password) + Google OAuth 2.0 (Passport.js)

### Known Limitations on Free Tier

- **Render free tier spins down after 15 minutes of inactivity.** The first request after idle can take 30–60 seconds to wake the server back up — this is expected, not a bug.
- **MongoDB Atlas network access is set to allow all IPs (`0.0.0.0/0`)**, since Render's free tier doesn't provide fixed outbound IPs. Access is still protected by database authentication.

---

## Backend Setup

### Project Structure

```
backend/
│── middleware/
│── models/
│── routes/
│── config/
│── .env
│── server.js
│── package.json
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

Add the required environment variables:

```
MONGODB_STRING=your_database_url
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### Run the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will run on:

```
http://localhost:5000
```

---

## Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Create a `.env` File

```
VITE_API_URL=http://localhost:5000
```

### Run the Frontend

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

## Database Choice

HerbalTrace uses **MongoDB Atlas** as its cloud database.

MongoDB was selected because it is a flexible NoSQL database that stores data as JSON-like documents, making it a good fit for production batch records, certificates, and dispatch information. The document model allows nested data such as yield details and certificate information to be stored efficiently without requiring complex joins. MongoDB Atlas also provides cloud hosting, automatic backups, scalability, and secure access, making it suitable for a multi-user web application.

## Database Schema

The application consists of four main collections:

- **Organization** – Stores organization details and batch numbering information.
- **User** – Stores user accounts, authentication details, and user roles.
- **Batch** – Stores production batch information, yield data, certificates, and inventory details.
- **Dispatch** – Stores buyer dispatch records linked to production batches.

### Relationships

- One Organization can have many Users.
- One Organization can have many Batches.
- One Organization can have many Dispatches.
- One User can create many Batches.
- One User can create many Dispatches.
- One Batch can have multiple Dispatch records.
<img width="624" height="260" alt="image" src="https://github.com/user-attachments/assets/fed0a2ed-accb-4a7f-8ad8-f6c846eadbad" />
---

## Set Up the Database (Local Development)

### Prerequisites

- Node.js
- MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HerbalTrace
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Create a MongoDB Atlas Cluster

1. Log in to MongoDB Atlas.
2. Create a new cluster.
3. Create a database user.
4. Allow your IP address (or `0.0.0.0/0` for unrestricted access during development).
5. Copy the MongoDB connection string.

### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```
MONGODB_STRING=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 5. Start the Backend

```bash
npm run dev
```

### 6. Start the Frontend

```bash
cd ../frontend
npm run dev
```

The application will connect automatically to MongoDB Atlas using the configured connection string.

---

## Tech Stack

**Backend:** Node.js, Express.js, Mongoose, dotenv, JWT, Passport.js (Google OAuth), bcryptjs

**Frontend:** React, Vite

**Database:** MongoDB Atlas

**Deployment:** Vercel (frontend), Render (backend)
