const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk mengizinkan parsing JSON
app.use(express.json());

// Endpoint untuk menyimpan data dari form
app.post('/api/form', (req, res) => {
  const formData = req.body;
  // Simpan data di sini sesuai kebutuhan (misalnya, ke database)
  console.log(formData);
  res.status(200).json({ message: 'Data berhasil disimpan.' });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
