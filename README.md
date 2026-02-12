# 🌟 Project Setup & Workflow Guide

A clean and simple guide for preparing, updating, and running this project.

---

## ✅ Required Node / npm Versions

Use Node.js v18.20.5 and npm 10.8.2 when running the commands.

---

## 🔧 Setting Up (After Pulling From GitHub)

After pulling the latest changes, install dependencies:

📁 **Make sure your root folder is ****`ParKing/main`**

```bash
npm update
npm run setup
npm run dotenv
```

❗ **Make sure you fill the ****`.env`**** file in the root folder**

---

## 🗄️ Importing the Database

Before starting the server, you must import the database structure.

1. Open your database manager (e.g., phpMyAdmin, MySQL Workbench).
2. Create a new database (`parking`).
3. Import the SQL file located at:

```
main/config/ParKing.sql
```

4. Make sure the database name and credentials in your `.env` file match your local setup.

---

## 🚀 Starting the Server

After installing dependencies and importing the database, start the server with:

```bash
node server
```
