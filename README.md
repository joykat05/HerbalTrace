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
## Database Choice

HerbalTrace uses **MongoDB Atlas** as its cloud database.

MongoDB was selected because it is a flexible NoSQL database that stores data as JSON-like documents, making it a good fit for production batch records, certificates, and dispatch information. The document model allows nested data such as yield details and certificate information to be stored efficiently without requiring complex joins. MongoDB Atlas also provides cloud hosting, automatic backups, scalability, and secure access, making it suitable for a multi-user web application.

### Database Schema

The application consists of four main collections:

* **Organization** – Stores organization details and batch numbering information.
* **User** – Stores user accounts, authentication details, and user roles.
* **Batch** – Stores production batch information, yield data, certificates, and inventory details.
* **Dispatch** – Stores buyer dispatch records linked to production batches.

Relationships:

* One **Organization** can have many **Users**.
* One **Organization** can have many **Batches**.
* One **Organization** can have many **Dispatches**.
* One **User** can create many **Batches**.
* One **User** can create many **Dispatches**.
* One **Batch** can have multiple **Dispatch** records.

<img width="624" height="260" alt="image" src="https://github.com/user-attachments/assets/fed0a2ed-accb-4a7f-8ad8-f6c846eadbad" />

```

---

## Set Up the Database

### Prerequisites

* Node.js
* MongoDB Atlas account
* Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HerbalTrace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a MongoDB Atlas Cluster

1. Log in to MongoDB Atlas.
2. Create a new cluster.
3. Create a database user.
4. Allow your IP address.
5. Copy the MongoDB connection string.

### 4. Configure Environment Variables

Create a `.env` file in the backed directory.

```env
MONGODB_STRING = your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5. Start the Backend

```bash
npm run dev
```

### 6. Start the Frontend

```bash
npm start
```

The application will connect automatically to MongoDB Atlas using the configured connection string.

The backend will run on:

```
http://localhost:5000
```

**Tech Stack:** Node.js, Express.js, dotenv, mongoose
