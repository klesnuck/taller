const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const reportesRoutes = require("./routes/reportes");
const citaRoutes = require("./routes/citaRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const vehiculoRoutes = require("./routes/vehiculoRoutes");
const servicioRoutes = require("./routes/servicioRoutes");
const marcaRoutes = require("./routes/marcaRoutes");
const mantenimientoRoutes = require("./routes/mantenimientoRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cotizacionRoutes = require("./routes/cotizacionRoutes");
const compraRoutes = require("./routes/compraRoutes");
const productoRoutes = require("./routes/productoRoutes");
const proveedorRoutes = require("./routes/proveedorRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const catalogoRoutes = require("./routes/catalogoRoutes");
const compatibilidadRoutes = require("./routes/compatibilidadRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
const roleRoutes = require("./routes/rolesRoutes");

app.use("/api/reportes", reportesRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/mantenimiento", mantenimientoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);
app.use("/api/compras", compraRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/catalogo", catalogoRoutes);
app.use("/api/compatibilidad", compatibilidadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);

app.listen(4000, () => {
  console.log("Servidor corriendo en puerto 4000");
});
