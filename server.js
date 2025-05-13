// Server code (Node.js + Express)
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abhi74151',
  database: 'iotdb'
});

app.post('/api/data', (req, res) => {
  console.log("Received Data from ESP32:", req.body);  
  const { temperature, humidity, waterLevel, airQuality } = req.body;

  const query = `INSERT INTO sensor_data (temperature, humidity, water_level, air_quality) VALUES (?, ?, ?, ?)`;
  db.query(query, [temperature, humidity, waterLevel, airQuality], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Data inserted");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
