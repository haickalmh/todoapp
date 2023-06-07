const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todoapp',
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware untuk mengizinkan parsing JSON
app.use(bodyParser.json());

// Endpoint untuk menyimpan data dari form
app.post('/api/form', (req, res) => {
  const formData = req.body;

  // Insert data into MySQL table
  const sql = 'INSERT INTO form_data (value, checked) VALUES (?, ?)';
  const values = [formData.value, formData.checked];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving data to MySQL:', err);
      res.status(500).json({ message: 'Error saving data.' });
      return;
    }

    console.log('Data saved to MySQL:', result);
    res.status(200).json({ message: 'Data saved successfully.' });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Endpoint untuk menghapus data dari form berdasarkan ID
app.delete('/api/form/:id', (req, res) => {
  const id = req.params.id;

  // Lakukan operasi penghapusan data dari database sesuai dengan ID
  connection.query('DELETE FROM form_data WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus data.' });
    } else {
      res.status(200).json({ message: 'Data berhasil dihapus.' });
    }
  });
});