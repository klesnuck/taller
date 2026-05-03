require('dotenv').config();
const express = require('express');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const pool = require('./db');

const marcaRoutes = require('./routes/marcaRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const citaRoutes = require('./routes/citaRoutes');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const DEFAULT_ROLES = [
  {
    nombre: 'Administrador',
    descripcion: 'Acceso completo al sistema',
    permisos: ['Dashboard', 'Citas', 'Vehículos', 'Servicios', 'Productos', 'Ventas', 'Compras', 'Cotizaciones', 'Reportes', 'Usuarios', 'Roles']
  },
  {
    nombre: 'Técnico',
    descripcion: 'Acceso a servicios y mantenimiento',
    permisos: ['Citas', 'Vehículos', 'Servicios']
  },
  {
    nombre: 'Cliente',
    descripcion: 'Acceso al portal de clientes',
    permisos: ['Cotizaciones', 'Reportes']
  },
];

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && email.length > 0 && email.length < 64 && emailRegex.test(email);
};

const validatePassword = (password) => {
  return typeof password === 'string' && password.length > 6 && /\d/.test(password);
};

const validateName = (name) => {
  return typeof name === 'string' && name.trim().length > 0 && name.trim().length <= 100;
};

const validatePhone = (phone) => {
  if (!phone) return true;
  return /^\+?[0-9\s\-()]{7,20}$/.test(phone);
};

const quoteIdentifier = (identifier) => `"${identifier}"`;

let userPasswordColumn = 'contrasena';
let userRoleIdColumn = 'idroles';

const initializeDatabase = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Roles (
      idRoles SERIAL PRIMARY KEY,
      nombre VARCHAR(100) UNIQUE,
      descripcion VARCHAR(255),
      permisos TEXT
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Usuarios (
      idUsuarios SERIAL PRIMARY KEY,
      idRoles INTEGER REFERENCES Roles(idRoles),
      email VARCHAR(100) UNIQUE,
      contrasena VARCHAR(255),
      nombre VARCHAR(100),
      telefono VARCHAR(20)
    );
  `);

  for (const role of DEFAULT_ROLES) {
    const { rows: existing } = await pool.query('SELECT idRoles, permisos FROM Roles WHERE nombre = $1', [role.nombre]);
    if (existing.length === 0) {
      await pool.query(
        'INSERT INTO Roles (nombre, descripcion, permisos) VALUES ($1, $2, $3)',
        [role.nombre, role.descripcion, JSON.stringify(role.permisos)]
      );
      continue;
    }

    const existingRole = existing[0];
    let storedPermissions = [];
    try {
      const parsed = Array.isArray(existingRole.permisos)
        ? existingRole.permisos
        : JSON.parse(existingRole.permisos || '[]');
      if (Array.isArray(parsed)) {
        storedPermissions = parsed;
      }
    } catch (parseError) {
      storedPermissions = [];
    }

    if (storedPermissions.length === 0 && role.permisos.length > 0) {
      await pool.query(
        'UPDATE Roles SET permisos = $1 WHERE idRoles = $2',
        [JSON.stringify(role.permisos), existingRole.idroles]
      );
    }
  }

  const { rows: adminRole } = await pool.query('SELECT idRoles FROM Roles WHERE nombre = $1', ['Administrador']);
  if (adminRole.length > 0) {
    const { rows: adminUser } = await pool.query('SELECT idUsuarios FROM Usuarios WHERE email = $1', ['admin@admin.com']);
    if (adminUser.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await pool.query(
        `INSERT INTO Usuarios (${quoteIdentifier(userRoleIdColumn)}, email, ${quoteIdentifier(userPasswordColumn)}, nombre, telefono) VALUES ($1, $2, $3, $4, $5)`,
        [adminRole[0].idroles, 'admin@admin.com', hashedPassword, 'Administrador', '']
      );
    }
  }
};

const formatRoleRow = (row) => ({
  id: row.idroles,
  name: row.nombre,
  description: row.descripcion,
  permissions: Array.isArray(row.permisos) ? row.permisos : JSON.parse(row.permisos || '[]')
});

const formatUserRow = (row) => ({
  id: row.idusuarios,
  roleId: row.idroles,
  email: row.email,
  name: row.nombre,
  phone: row.telefono || '',
  role: row.rolename,
});

app.get('/', (req, res) => {
  res.send('Backend en funcionamiento');
});

app.use('/api/marca', marcaRoutes);
app.use('/api', vehiculoRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/citas', citaRoutes);

app.get('/api/roles', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Roles ORDER BY idRoles');
    res.json(rows.map(formatRoleRow));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
});

app.post('/api/roles', async (req, res) => {
  try {
    const { name, description, permissions } = req.body;
    if (!validateName(name) || !description || !Array.isArray(permissions)) {
      return res.status(400).json({ error: 'Datos de rol inválidos' });
    }
    const result = await pool.query(
      'INSERT INTO Roles (nombre, descripcion, permisos) VALUES ($1, $2, $3) RETURNING idRoles',
      [name.trim(), description.trim(), JSON.stringify(permissions)]
    );
    const { rows } = await pool.query('SELECT * FROM Roles WHERE idRoles = $1', [result.rows[0].idroles]);
    res.json(formatRoleRow(rows[0]));
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El nombre del rol ya existe' });
    }
    res.status(500).json({ error: 'Error al crear el rol' });
  }
});

app.put('/api/roles/:id', async (req, res) => {
  try {
    const roleId = Number(req.params.id);
    const { name, description, permissions } = req.body;
    if (Number.isNaN(roleId) || !validateName(name) || !description || !Array.isArray(permissions)) {
      return res.status(400).json({ error: 'Datos de rol inválidos' });
    }
    await pool.query(
      'UPDATE Roles SET nombre = $1, descripcion = $2, permisos = $3 WHERE idRoles = $4',
      [name.trim(), description.trim(), JSON.stringify(permissions), roleId]
    );
    const { rows } = await pool.query('SELECT * FROM Roles WHERE idRoles = $1', [roleId]);
    if (!rows.length) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json(formatRoleRow(rows[0]));
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El nombre del rol ya existe' });
    }
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
});

app.delete('/api/roles/:id', async (req, res) => {
  try {
    const roleId = Number(req.params.id);
    if (Number.isNaN(roleId)) {
      return res.status(400).json({ error: 'ID de rol inválido' });
    }
    await pool.query('DELETE FROM Roles WHERE idRoles = $1', [roleId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT u.idUsuarios, u.idRoles, u.email, u.nombre, u.telefono, r.nombre AS rolename
       FROM Usuarios u
       JOIN Roles r ON u.idRoles = r.idRoles
       ORDER BY u.idUsuarios`
    );
    res.json(rows.map(formatUserRow));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!validateName(name) || !validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ error: 'Datos de usuario inválidos' });
    }
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ error: 'Teléfono inválido' });
    }
    const { rows: roleRow } = await pool.query('SELECT idRoles FROM Roles WHERE nombre = $1', [role]);
    if (!roleRow.length) {
      return res.status(400).json({ error: 'Rol no válido' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO Usuarios (${quoteIdentifier(userRoleIdColumn)}, email, ${quoteIdentifier(userPasswordColumn)}, nombre, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING idUsuarios`,
      [roleRow[0].idroles, email.trim(), hashedPassword, name.trim(), phone || '']
    );
    const { rows } = await pool.query(
      `SELECT u.idUsuarios, u.${userRoleIdColumn}, u.email, u.nombre, u.telefono, r.nombre AS rolename
       FROM Usuarios u
       JOIN Roles r ON u.${userRoleIdColumn} = r.idRoles WHERE u.idUsuarios = $1`,
      [result.rows[0].idusuarios]
    );
    res.json(formatUserRow(rows[0]));
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El correo ya existe' });
    }
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { name, email, password, role, phone } = req.body;
    if (Number.isNaN(userId) || !validateName(name) || !validateEmail(email)) {
      return res.status(400).json({ error: 'Datos de usuario inválidos' });
    }
    if (password && !validatePassword(password)) {
      return res.status(400).json({ error: 'Contraseña inválida' });
    }
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ error: 'Teléfono inválido' });
    }
    const { rows: roleRow } = await pool.query('SELECT idRoles FROM Roles WHERE nombre = $1', [role]);
    if (!roleRow.length) {
      return res.status(400).json({ error: 'Rol no válido' });
    }
    const { rows: existing } = await pool.query('SELECT idUsuarios FROM Usuarios WHERE idUsuarios = $1', [userId]);
    if (!existing.length) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const fields = [roleRow[0].idroles, email.trim(), name.trim(), phone || '', userId];
    let query = `UPDATE Usuarios SET ${quoteIdentifier(userRoleIdColumn)} = $1, email = $2, nombre = $3, telefono = $4`;
    let fieldCount = 4;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fieldCount++;
      query += `, ${quoteIdentifier(userPasswordColumn)} = $${fieldCount}`;
      fields.splice(4, 0, hashedPassword);
    }
    fieldCount++;
    query += ` WHERE idUsuarios = $${fieldCount}`;
    await pool.query(query, fields);
    const { rows } = await pool.query(
      `SELECT u.idUsuarios, u.idRoles, u.email, u.nombre, u.telefono, r.nombre AS rolename
       FROM Usuarios u
       JOIN Roles r ON u.idRoles = r.idRoles WHERE u.idUsuarios = $1`,
      [userId]
    );
    res.json(formatUserRow(rows[0]));
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'El correo ya existe' });
    }
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    await pool.query('DELETE FROM Usuarios WHERE idUsuarios = $1', [userId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!validateName(name) || !validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ error: 'Datos de registro inválidos' });
    }
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ error: 'Teléfono inválido' });
    }

    const { rows: roleRow } = await pool.query('SELECT idRoles FROM Roles WHERE nombre = $1', ['Cliente']);
    if (!roleRow.length) {
      return res.status(500).json({ error: 'No se encontró el rol Cliente' });
    }

    const { rows: existing } = await pool.query('SELECT idUsuarios FROM Usuarios WHERE email = $1', [email.trim()]);
    if (existing.length) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO Usuarios (${quoteIdentifier(userRoleIdColumn)}, email, ${quoteIdentifier(userPasswordColumn)}, nombre, telefono) VALUES ($1, $2, $3, $4, $5)`,
      [roleRow[0].idroles, email.trim(), hashedPassword, name.trim(), phone || '']
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error en el registro' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email) || !password) {
      return res.status(400).json({ error: 'Email o contraseña inválidos' });
    }
    const passwordReference = `u.${quoteIdentifier(userPasswordColumn)} AS passwordhash`;
    const { rows } = await pool.query(
      `SELECT u.idUsuarios, u.email, ${passwordReference}, u.nombre, u.telefono, r.nombre AS rolename, r.permisos
       FROM Usuarios u
       JOIN Roles r ON u.${userRoleIdColumn} = r.idRoles
       WHERE u.email = $1`,
      [email.trim()]
    );
    if (!rows.length) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    const user = rows[0];
    const passwordMatches = await bcrypt.compare(password, user.passwordhash);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }
    res.json({
      id: user.idusuarios,
      email: user.email,
      name: user.nombre,
      phone: user.telefono || '',
      role: user.rolename,
      permissions: Array.isArray(user.permisos) ? user.permisos : JSON.parse(user.permisos || '[]')
    });
  } catch (err) {
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

app.get('/api/reportes/financiero', async (req, res) => {
  try {
    const ingresosResult = await pool.query('SELECT SUM(total) AS total FROM Venta');
    const gastosResult = await pool.query('SELECT SUM(total) AS total FROM Compra');

    const ingresos = parseFloat(ingresosResult.rows[0].total || 0);
    const gastos = parseFloat(gastosResult.rows[0].total || 0);

    res.json({
      ingresos,
      gastos,
      balance: ingresos - gastos
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al generar reporte financiero' });
  }
});

app.get('/api/reportes/inventario-bajo', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT nombre, stock_minimo, precio_venta FROM Productos WHERE stock_minimo > 10'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al generar reporte de inventario' });
  }
});

app.get('/api/reportes/citas-totales', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT COUNT(*) as total_citas FROM Cita');
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al contar citas' });
  }
});

app.get('/api/productos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Productos ORDER BY idProductos DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, precio_unitario, precio_venta, stock_minimo, categoria, sku, ubicacion_almacen } = req.body;
    const result = await pool.query(
      'INSERT INTO Productos (nombre, precio_unitario, precio_venta, stock_minimo, categoria, sku, ubicacion_almacen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, precio_unitario, precio_venta, stock_minimo, categoria, sku, ubicacion_almacen]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio_unitario, precio_venta, stock_minimo, categoria, sku, ubicacion_almacen } = req.body;
    const result = await pool.query(
      'UPDATE Productos SET nombre = $1, precio_unitario = $2, precio_venta = $3, stock_minimo = $4, categoria = $5, sku = $6, ubicacion_almacen = $7 WHERE idProductos = $8 RETURNING *',
      [nombre, precio_unitario, precio_venta, stock_minimo, categoria, sku, ubicacion_almacen, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM Productos WHERE idProductos = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

app.get('/api/ventas', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT v.*, u.nombre as nombre_usuario, p.nombre as nombre_producto
      FROM Venta v
      LEFT JOIN Usuarios u ON v.idUsuarios = u.idUsuarios
      LEFT JOIN Productos p ON v.idProductos = p.idProductos
      ORDER BY v.idVenta DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

app.post('/api/ventas', async (req, res) => {
  try {
    const { idProductos, idUsuarios, metodo_pago, total } = req.body;
    const result = await pool.query(
      'INSERT INTO Venta (idProductos, idUsuarios, metodo_pago, total) VALUES ($1, $2, $3, $4) RETURNING *',
      [idProductos, idUsuarios, metodo_pago, total]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar venta' });
  }
});

app.get('/api/reportes/ventas', async (req, res) => {
  try {
    const totalVentas = await pool.query('SELECT SUM(total) as monto, COUNT(*) as cantidad FROM Venta');
    const historial = await pool.query('SELECT * FROM Venta ORDER BY idVenta DESC LIMIT 10');
    res.json({
      totalMonto: parseFloat(totalVentas.rows[0].monto || 0),
      totalCantidad: parseInt(totalVentas.rows[0].cantidad || 0),
      historial: historial.rows
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/api/reportes/productos', async (req, res) => {
  try {
    const valorInv = await pool.query('SELECT SUM(precio_unitario * stock_minimo) as valor FROM Productos');
    const rendimiento = await pool.query(`
      SELECT nombre, stock_minimo as stock, 
      (SELECT COUNT(*) FROM Venta WHERE idproductos = p.idproductos) as ventas,
      (SELECT SUM(total) FROM Venta WHERE idproductos = p.idproductos) as ganado
      FROM Productos p ORDER BY ganado DESC LIMIT 5
    `);
    res.json({
      valorInventario: parseFloat(valorInv.rows[0].valor || 0),
      productos: rendimiento.rows
    });
  } catch (err) {
    res.status(500).send('Error en reporte de productos');
  }
});

app.get('/api/reportes/servicios', async (req, res) => {
  try {
    const distribucion = await pool.query(`
      SELECT s.nombre, COUNT(v.idventa) as cantidad
      FROM Servicio s
      LEFT JOIN Venta v ON s.idservicio = v.idservicio
      GROUP BY s.nombre
    `);
    res.json(distribucion.rows);
  } catch (err) {
    res.status(500).send('Error en reporte de servicios');
  }
});

app.get('/api/compras/dashboard', async (req, res) => {
  try {
    const bajoStockQuery = await pool.query(`
      SELECT idproductos, nombre, stock, stock_minimo, precio_venta,
      (stock_minimo - stock + 10) as cantidad_sugerida 
      FROM productos WHERE stock <= stock_minimo
    `);

    let costoEstimado = 0;
    bajoStockQuery.rows.forEach(prod => {
      costoEstimado += (prod.cantidad_sugerida * (prod.precio_venta * 0.6));
    });

    const statsMesQuery = await pool.query(`
      SELECT 
        COUNT(*) as ordenes_mes, 
        COALESCE(SUM(total), 0) as total_compras
      FROM orden_compra
      WHERE EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM CURRENT_DATE)
        AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE)
    `);

    const ordenesQuery = await pool.query(`
      SELECT o.idOrden, o.codigo_orden, o.fecha, o.total, o.estado_recepcion, o.estado_pago, p.nombre as proveedor
      FROM Orden_Compra o
      LEFT JOIN Proveedores p ON o.idProveedor = p.idProveedor
      ORDER BY o.fecha DESC LIMIT 5
    `);

    const ordenesConDetalle = await Promise.all(ordenesQuery.rows.map(async (orden) => {
      const detalles = await pool.query(`
        SELECT d.cantidad, d.precio_unitario, d.subtotal, pr.nombre as producto
        FROM Detalle_Compra d
        JOIN Productos pr ON d.idProductos = pr.idProductos
        WHERE d.idOrden = $1
      `, [orden.idorden]);
      
      return {
        ...orden,
        productos: detalles.rows
      };
    }));

    res.json({
      productosPorOrdenar: bajoStockQuery.rows.length,
      costoPendiente: costoEstimado,
      bajoStock: bajoStockQuery.rows,
      ordenesEsteMes: parseInt(statsMesQuery.rows[0].ordenes_mes),
      totalCompras: parseFloat(statsMesQuery.rows[0].total_compras),
      ordenesRecientes: ordenesConDetalle
    });

  } catch (err) {
    res.status(500).send("Error en el dashboard de compras");
  }
});
app.get('/api/proveedores', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT idProveedor, nombre FROM Proveedores ORDER BY nombre');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
});

app.post('/api/compras', async (req, res) => {
  const client = await pool.connect();
  try {
    const { idProveedor, total, estado_pago, productos } = req.body;
    
    await client.query('BEGIN');

    const countQuery = await client.query('SELECT COUNT(*) FROM Orden_Compra');
    const numOrden = parseInt(countQuery.rows[0].count) + 1;
    const codigo_orden = `ORD-${numOrden.toString().padStart(3, '0')}`;

    const insertOrden = await client.query(`
      INSERT INTO Orden_Compra (codigo_orden, idProveedor, total, estado_recepcion, estado_pago)
      VALUES ($1, $2, $3, 'PENDIENTE', $4)
      RETURNING idOrden
    `, [codigo_orden, idProveedor, total, estado_pago]);
    
    const idOrden = insertOrden.rows[0].idorden;

    for (const prod of productos) {
      await client.query(`
        INSERT INTO Detalle_Compra (idOrden, idProductos, cantidad, precio_unitario, subtotal)
        VALUES ($1, $2, $3, $4, $5)
      `, [idOrden, prod.idProductos, prod.cantidad, prod.precio_unitario, prod.subtotal]);

      await client.query(`
        UPDATE Productos 
        SET stock = COALESCE(stock, 0) + $1 
        WHERE idProductos = $2
      `, [prod.cantidad, prod.idProductos]);
    }

    await client.query('COMMIT');
    res.json({ success: true, codigo_orden });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Error al registrar la compra' });
  } finally {
    client.release();
  }
});

app.get('/api/compras', async (req, res) => {
  try {
    const query = `
      SELECT 
        oc.idorden as id,
        oc.codigo_orden as orden,
        TO_CHAR(oc.fecha, 'DD/MM/YYYY') as fecha,
        p.nombre as proveedor,
        oc.estado_recepcion as "estadoRecepcion",
        oc.estado_pago as "estadoPago",
        oc.total,
        json_agg(
          json_build_object(
            'nombre', pr.nombre,
            'cantidad', dc.cantidad,
            'costoUnitario', dc.precio_unitario,
            'total', dc.subtotal
          )
        ) as productos
      FROM orden_compra oc
      LEFT JOIN proveedores p ON oc.idproveedor = p.idproveedor
      LEFT JOIN detalle_compra dc ON oc.idorden = dc.idorden
      LEFT JOIN productos pr ON dc.idproductos = pr.idproductos
      GROUP BY oc.idorden, p.nombre
      ORDER BY oc.idorden DESC;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener compras:", err);
    res.status(500).json({ error: 'Error al obtener el historial de compras' });
  }
});

app.get('/api/compras/alertas', async (req, res) => {
  try {
    const query = `
      SELECT 
        idproductos as id,
        nombre,
        stock as "stockActual",
        stock_minimo as minimo,
        'Proveedor' as proveedor,
        (stock_minimo - stock) as sugerido,
        ((stock_minimo - stock) * precio_unitario) as "costoTotal"
      FROM productos
      WHERE stock <= stock_minimo;
    `;
    const { rows } = await pool.query(query);
    
    const productosPorOrdenar = rows.length;
    const costoEstimado = rows.reduce((acc, curr) => acc + parseFloat(curr.costoTotal || 0), 0);

    res.json({
      bajoStock: rows,
      productosPorOrdenar,
      costoEstimado
    });
  } catch (err) {
    console.error("Error en alertas:", err);
    res.status(500).json({ error: 'Fallo en la consulta de stock' });
  }
});

app.get('/api/productos_stats', async (req, res) => {
  try {
    const query = `
      SELECT 
        idproductos, nombre, sku, categoria, 
        stock, stock_minimo, precio_unitario as costo, 
        precio_venta, ubicacion,
        (stock * precio_unitario) as valor_inventario,
        CASE 
          WHEN stock <= stock_minimo THEN 'bajo'
          ELSE 'ok'
        END as estado
      FROM productos;
    `;
    const { rows } = await pool.query(query);
    
    
    const stats = {
      totalProductos: rows.length,
      unidadesStock: rows.reduce((acc, p) => acc + parseInt(p.stock), 0),
      bajoStock: rows.filter(p => p.estado === 'bajo').length,
      valorTotal: rows.reduce((acc, p) => acc + parseFloat(p.valor_inventario), 0)
    };

    res.json({ productos: rows, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/api/productos_completo', async (req, res) => {
  try {
    const query = `
      SELECT 
        idproductos, 
        nombre, 
        sku, 
        categoria, 
        stock, 
        stock_minimo, 
        precio_unitario AS costo, 
        precio_venta, 
        ubicacion
      FROM productos 
      ORDER BY idproductos DESC
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});


app.post('/api/ventas_gestion', async (req, res) => {
    const { folio, clienteNombre, metodoPago, productosSeleccionados, subtotal, iva, total } = req.body;
    
    try {
        // 1. Insertar en tabla 'venta'
        const nuevaVenta = await pool.query(
            'INSERT INTO venta (folio, cliente, metodo_pago, subtotal, iva, total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING idventa',
            [folio, clienteNombre || 'Público General', metodoPago, subtotal, iva, total]
        );

        const idVentaGenerada = nuevaVenta.rows[0].idventa;

        // 2. Insertar en 'detalle_venta' con los nombres de tu imagen image_e03c8c.png
        for (const prod of productosSeleccionados) {
            await pool.query(
                'INSERT INTO detalle_venta (idventa, idproductos, cantidad, precio_unitario, subtotal_linea) VALUES ($1, $2, $3, $4, $5)',
                [
                    idVentaGenerada, 
                    prod.idproductos, 
                    prod.cantidad, 
                    prod.precio, // precio_unitario
                    prod.total   // subtotal_linea
                ]
            );
        }

        res.status(200).send('Venta registrada correctamente');
    } catch (err) {
        // Este log es vital: revísalo en tu terminal negra de Node.js
        console.error("DETALLE DEL ERROR EN SERVIDOR:", err.message);
        res.status(500).send("Error interno: " + err.message);
    }
});

app.get('/api/ventas_completo', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM venta ORDER BY fecha DESC');
    res.json(resultado.rows); // Enviamos el array de filas directamente
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener ventas');
  }
});

app.put('/api/ventas_gestion/:id', async (req, res) => {
    const { id } = req.params;
    const { clienteNombre, metodoPago } = req.body;
    try {
        await pool.query(
            'UPDATE venta SET cliente = $1, metodo_pago = $2 WHERE idventa = $3',
            [clienteNombre, metodoPago, id]
        );
        res.status(200).send('Venta actualizada');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    process.exit(1);
  });
  