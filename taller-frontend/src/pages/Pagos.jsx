import React, { useState, useEffect } from "react";

export default function MetodoPago() {
  const total = 1250;
  const [metodo, setMetodo] = useState("efectivo");
  const [monto, setMonto] = useState(1500);
  const [referencia, setReferencia] = useState("");
  const [cambio, setCambio] = useState(0);
  const [estado, setEstado] = useState("");

  useEffect(() => {
    calcular();
  }, [monto]);

  const calcular = () => {
    const resultado = monto - total;
    setCambio(resultado);

    if (resultado >= 0) {
      setEstado("Pago completo");
    } else {
      setEstado("Monto insuficiente");
    }
  };

  const procesar = () => {
    alert("Pago procesado correctamente");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-5">
        <h2 className="font-bold">Auto Servicio San Jorge</h2>
        <nav className="mt-6 space-y-2">
          <a className="block p-2 rounded hover:bg-blue-500">Dashboard</a>
          <a className="block p-2 rounded hover:bg-blue-500">Inventario</a>
          <a className="block p-2 rounded hover:bg-blue-500">Ventas</a>
          <a className="block p-2 rounded hover:bg-blue-500">Reportes</a>
          <a className="block p-2 rounded bg-blue-500">Pagos</a>
          <a className="block p-2 rounded hover:bg-blue-500">Clientes</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Método de Pago</h1>
        <p className="text-gray-500 mb-5">Seleccione y procese el método de pago</p>

        <div className="grid grid-cols-2 gap-5">
          {/* Resumen */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-3">Resumen</h3>
            <p className="text-gray-500">Cliente</p>
            <p className="font-semibold">Carlos Méndez García</p>

            <p className="text-gray-500 mt-3">Orden</p>
            <span className="bg-gray-200 px-2 py-1 rounded">ORD-2024-089</span>

            <p className="text-gray-500 mt-3">Servicio</p>
            <p>Cambio de aceite y filtros</p>

            <div className="mt-5 text-right">
              <p className="text-gray-500">Total</p>
              <h2 className="text-xl font-bold text-blue-600">${total.toFixed(2)}</h2>
            </div>
          </div>

          {/* Pago */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-3">Método de Pago</h3>

            <label className="block text-gray-500">Método</label>
            <select
              value={metodo}
              onChange={(e) => setMetodo(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>

            <label className="block text-gray-500 mt-3">Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              className="w-full border p-2 rounded mt-1"
            />

            {metodo !== "efectivo" && (
              <>
                <label className="block text-gray-500 mt-3">Referencia</label>
                <input
                  type="text"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  className="w-full border p-2 rounded mt-1"
                />
              </>
            )}

            <div className="mt-5 p-4 rounded bg-green-100 text-green-700">
              <p className="font-semibold">Cambio / Restante</p>
              <h2 className="text-xl font-bold">${cambio.toFixed(2)}</h2>
              <p className={cambio < 0 ? "text-red-600" : ""}>{estado}</p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-5">
          <button className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
          <button
            onClick={procesar}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Procesar Pago
          </button>
        </div>
      </main>
    </div>
  );
}
