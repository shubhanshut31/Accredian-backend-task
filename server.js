require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SHT@905858",  // Replace with your actual password
    database: "referral_db",
    port: 3306
});


db.connect((err) => {
    if (err) {
        console.error("MySQL Connection Failed:", err);
    } else {
        console.log("✅ MySQL Connected!");
    }
});

// API Endpoint to Store Referral Data
app.post("/api/refer", (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO referrals (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ message: "Referral added successfully!" });
    });
});

// Start the Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
