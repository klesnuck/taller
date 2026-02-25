require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', ( req, res) => {
  res.send('Backend en funcionamiento');
});

app.get('/api/marca', async (req, res) => {
  try{
    const result = await pool.query('SELECT idmarca, nombre FROM marca');
    res.json(result.rows);
  } catch (err){
    res.status(500).json({ error: err.message})
  }
});

app.get('/api/anio', async (req, res) => {
  try{
    const result = await pool.query('SELECT * FROM anio');
    res.json(result.rows);
  } catch (err){
    console.error('Error en /api/anio:', err.message);
    res.status(500).json({ error: err.message})
  }
});

app.get('/api/modelo/:idmarca', async (req, res) => { 
  const idmarca = Number(req.params.idmarca);

  if (isNaN(idmarca)) {
    return res.status(400).json({ error: "idmarca inválido" });
  }

  try {
    const result = await pool.query(
      'SELECT idmodelo, nombre FROM modelo WHERE idmarca = $1 order by nombre',
      [idmarca]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/motor', async (req, res) => {
  try{
    const result = await pool.query('SELECT idmotor, nombre FROM motor');
    res.json(result.rows);
  } catch (err){
    res.status(500).json({ error: err.message})
  }
});


app.post('/api/cliente', async (req, res) => {
  try{
    const { nombre, apellido, correo, telefono } = req.body;
    const result = await pool.query(
      'INSERT INTO cliente (nombre, apellido, correo, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, correo, telefono]
    );
    res.json(result.rows[0]);
  } catch (err){
    res.status(500).json({ error: err.message})
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);

});