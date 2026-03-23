import React, { useState, useEffect } from "react";

export default function ReporteVentas() {
  const [ventas, setVentas] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const data = [
      { id: "V-001", cliente: "Carlos Méndez", servicio: "Cambio de aceite", fecha: "2024-01-10", total: 1250, metodo: "efectivo" },
      { id: "V-002", cliente: "Ana López", servicio: "Alineación", fecha: "2024-01-11", total: 850, metodo: "tarjeta" },
      { id: "V-003", cliente: "Juan Pérez", servicio: "Frenos", fecha: "2024-01-12", total: 3200, metodo: "transferencia" }
    ];

    setVentas(data);
    setTotal(data.reduce((acc, v) => acc + v.total, 0));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-5">
        <h2 className="text-lg font-bold">Auto Servicio San Jorge</h2>
        <nav className="mt-6 space-y-2">
          <a className="block p-2 rounded hover:bg-blue-500">Dashboard</a>
          <a className="block p-2 rounded hover:bg-blue-500">Inventario</a>
          <a className="block p-2 rounded hover:bg-blue-500">Ventas</a>
          <a className="block p-2 rounded bg-blue-500">Reportes</a>
          <a className="block p-2 rounded hover:bg-blue-500">Pagos</a>
          <a className="block p-2 rounded hover:bg-blue-500">Clientes</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reporte de Ventas</h1>
          <span>Administrador</span>
        </div>

        {/* Filtros */}
        <div className="bg-white p-5 rounded-xl shadow mt-5 grid grid-cols-4 gap-3">
          <input type="date" className="border p-2 rounded" />
          <input type="date" className="border p-2 rounded" />
          <select className="border p-2 rounded">
            <option>Todos los clientes</option>
          </select>
          <select className="border p-2 rounded">
            <option>Todos los métodos</option>
          </select>
          <button className="col-span-4 bg-blue-600 text-white p-2 rounded">Generar Reporte</button>
        </div>

        {/* Stats */}
        <div className="flex gap-5 mt-5">
          <div className="flex-1 bg-white p-5 rounded-xl shadow">
            <h3>Total Ventas</h3>
            <h2 className="text-xl font-bold">${total}</h2>
          </div>
          <div className="flex-1 bg-white p-5 rounded-xl shadow">
            <h3>Número Ventas</h3>
            <h2 className="text-xl font-bold">{ventas.length}</h2>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white p-5 rounded-xl shadow mt-5">
          <h3 className="mb-3 font-bold">Historial de Ventas</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Método</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id} className="border-b">
                  <td>{v.id}</td>
                  <td>{v.cliente}</td>
                  <td>{v.servicio}</td>
                  <td>{v.fecha}</td>
                  <td>${v.total}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-white rounded-full text-sm ${
                        v.metodo === "efectivo"
                          ? "bg-green-500"
                          : v.metodo === "tarjeta"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {v.metodo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
