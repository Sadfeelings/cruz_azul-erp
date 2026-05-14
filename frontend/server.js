const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

// Middleware para que el servidor entienda JSON y pueda mostrar tu index.html
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la conexión a PostgreSQL a través de la red interna Docker
const pool = new Pool({
  user: 'admin_erp',
  host: 'db', // Este es el nombre del servicio de la base de datos en tu docker-compose
  database: 'farmaciacruzazul',
  password: 'password123',
  port: 5432, 
});

// Endpoint GET: Sirve para consultar y listar los productos existentes en la base de datos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint POST: Sirve para recibir los datos del formulario web e ingresarlos a PostgreSQL
app.post('/api/productos', async (req, res) => {
  const { producto, descripcion, cantidad, precio_unitario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO productos (producto, descripcion, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *',
      [producto, descripcion, cantidad, precio_unitario]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// El servidor escucha en el puerto 80, tal como lo exige la evaluación
app.listen(80, () => {
  console.log('Frontend Node.js corriendo en el puerto 80');
});