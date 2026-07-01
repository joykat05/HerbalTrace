# HerbalTrace
HerbalTrace is a web-based system for managing essential oil production batches, linking lab certificates, and tracking dispatches to buyers. It provides a centralized platform to improve traceability. The system also includes basic analytical features to identify irregular yield patterns and generate simple production insights.

# Backend Setup
## Project Structure

```
backend/
│── middleware/
│── models/
│── routes/
│── .env
│── server.js
│── package.json
```

---

## Install Dependencies

```bash
npm install
```

## Create a `.env` File

Add the required environment variables:

```env
MONGODB_STRING=your_database_url
JWT_SECRET=your_secret_key
```

## Run the Server

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

**Tech Stack:** Node.js, Express.js, dotenv, mongoose
