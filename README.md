# HerbalTrace
HerbalTrace is a web-based system for managing essential oil production batches, linking lab certificates, and tracking dispatches to buyers. It provides a centralized platform to improve traceability. The system also includes basic analytical features to identify irregular yield patterns and generate simple production insights.
# Backend Setup

## Install Dependencies

```bash
npm install
```

## Create a `.env` File

Add the required environment variables:

```env
PORT=5000
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

**Tech Stack:** Node.js, Express.js, dotenv
