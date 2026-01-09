import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/db.js";
import appRoute from "./routes/route.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", appRoute);

// Route de test avec vérification DB
app.get("/api/health", async (req, res) => {
  try {
    // Test de connexion DB
    const result = await pool.query(
      "SELECT NOW() as current_time, version() as db_version"
    );

    res.json({
      status: "OK",
      message: "Matcha API is running! 🚀",
      database: "Connected ✅",
      db_version:
        result.rows[0].db_version.split(" ")[0] +
        " " +
        result.rows[0].db_version.split(" ")[1],
      timestamp: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed ❌",
      error: error.message,
    });
  }
});

// Route pour tester l'accès aux tables
app.get("/api/db/tables", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);

    res.json({
      status: "OK",
      tables: result.rows.map((row) => row.table_name),
      count: result.rows.length,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      error: error.message,
    });
  }
});

// Route pour compter les users
app.get("/api/db/users/count", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) as count FROM users");

    res.json({
      status: "OK",
      users_count: parseInt(result.rows[0].count),
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
  console.log(
    `🗄️  Database: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`
  );
});

//tester les UserModel  ----------------

import * as User from "./models/user.model.js";

// Test 1 : Créer un user
app.post("/api/test/create-user", async (req, res) => {
  try {
    const user = await User.createUser(
      "test@example.com",
      "testuserr",
      "fakehash123",
      "John",
      "Doe"
    );

    res.json({
      status: "OK",
      message: "User created!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Test 2 : Trouver par email
app.get("/api/test/find-by-email/:email", async (req, res) => {
  try {
    const user = await User.findByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "OK",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Test 3 : Trouver par ID
app.get("/api/test/find-by-id/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      status: "OK",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
