import React, { useEffect, useState } from "react";

export default function Inventario() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos([
      { id: "PRD-001", nombre: "Aceite 5W-30", cat: "Aceites", stock: 45, min: 20 },
      { id: "PRD-002", nombre: "Filtro Aceite", cat: "Filtros", stock: 15, min: 25 },
      { id: "PRD-003", nombre: "Pastillas Freno", cat: "Frenos", stock: 32, min: 15 },
      { id: "PRD-004", nombre: "Amortiguador", cat: "Suspensión", stock: 8, min: 10 },
      { id: "PRD-005", nombre: "Batería", cat: "Eléctrico", stock: 3, min: 8 }
    ]);
  }, []);

  const getEstado = (stock, min) => {
    if (stock < min / 2) return { text: "Crítico", color: "bg-red-200 text-red-700" };
    if (stock < min) return { text: "Stock Bajo", color: "bg-yellow-200 text-yellow-700" };
    return { text: "Disponible", color: "bg-green-200 text-green-700" };
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-5">
        <h2 className="font-bold">Auto Servicio San Jorge</h2>
        <nav className="mt-5 space-y-2">
          <a className="block p-2 rounded hover:bg-blue-500">Dashboard</a>
          <a className="block p-2 rounded bg-blue-500">Inventario</a>
          <a className="block p-2 rounded hover:bg-blue-500">Ventas</a>
          <a className="block p-2 rounded hover:bg-blue-500">Reportes</a>
          <a className="block p-2 rounded hover:bg-blue-500">Pagos</a>
          <a className="block p-2 rounded hover:bg-blue-500">Clientes</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <input
            className="w-1/2 p-2 border rounded-full"
            placeholder="Buscar productos, categorías..."
          />
          <span>Administrador</span>
        </div>

        <h1 className="text-2xl font-bold">Reporte de Inventario</h1>
        <p className="text-gray-500">Genera y visualiza reportes del inventario</p>

        {/* Filtros */}
        <div className="bg-white p-5 rounded-xl shadow mt-5 grid grid-cols-5 gap-3">
          <input type="date" className="border p-2 rounded" />
          <input type="date" className="border p-2 rounded" />
          <select className="border p-2 rounded"><option>Categoría</option></select>
          <select className="border p-2 rounded"><option>Proveedor</option></select>
          <button className="bg-blue-600 text-white rounded p-2">Generar</button>
        </div>

        {/* Tabla */}
        <div className="bg-white p-5 rounded-xl shadow mt-5">
          <div className="flex justify-between mb-3">
            <h3 className="font-bold">Inventario Actual</h3>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-gray-200 rounded">PDF</button>
              <button className="px-3 py-1 bg-gray-200 rounded">Excel</button>
              <button className="px-3 py-1 bg-gray-200 rounded">Imprimir</button>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th>ID</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => {
                const estado = getEstado(p.stock, p.min);
                return (
                  <tr key={p.id} className="border-b">
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>{p.cat}</td>
                    <td>{p.stock}</td>
                    <td>{p.min}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-sm ${estado.color}`}>
                        {estado.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-end mt-3 space-x-2">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">1</span>
            <span className="px-2 py-1 bg-gray-200 rounded">2</span>
            <span className="px-2 py-1 bg-gray-200 rounded">3</span>
          </div>
        </div>
      </main>
    </div>
  );
}