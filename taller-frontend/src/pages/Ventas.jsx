
import React, { useState } from 'react';

export default function Ventas() {
  const [ventas, setVentas] = useState([
    { id: 1, cliente: "Juan Pérez", servicio: "Cambio de Aceite", total: 1200, fecha: "2026-03-22" },
    { id: 2, cliente: "Maria García", servicio: "Afinación Mayor", total: 3500, fecha: "2026-03-22" }
  ]);

  const [nuevaVenta, setNuevaVenta] = useState({ cliente: '', servicio: '', total: '' });

  const registrarVenta = (e) => {
    e.preventDefault();
    const ventaFinal = {
      ...nuevaVenta,
      id: Date.now(),
      total: Number(nuevaVenta.total),
      fecha: new Date().toISOString().split('T')[0]
    };
    setVentas([ventaFinal, ...ventas]);
    setNuevaVenta({ cliente: '', servicio: '', total: '' });
    alert("Venta registrada y nota generada");
  };

  const eliminarVenta = (id) => {
    if(window.confirm("¿Anular esta venta?")) {
      setVentas(ventas.filter(v => v.id !== id));
    }
  };

  const ingresosTotales = ventas.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 text-left">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="font-bold text-xl uppercase tracking-tighter italic">Taller San Jorge - Ventas</span>
        </div>
        <button onClick={() => window.location.href = "/admin"} className="text-sm bg-blue-600 px-4 py-2 rounded-xl font-bold">Volver</button>
      </nav>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 h-fit">
          <h2 className="font-black text-lg mb-6 uppercase tracking-wider text-green-600">Nueva Venta</h2>
          <form onSubmit={registrarVenta} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cliente</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none"
                value={nuevaVenta.cliente} onChange={(e) => setNuevaVenta({...nuevaVenta, cliente: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Servicio Realizado</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none"
                value={nuevaVenta.servicio} onChange={(e) => setNuevaVenta({...nuevaVenta, servicio: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Total Cobrado ($)</label>
              <input type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none"
                value={nuevaVenta.total} onChange={(e) => setNuevaVenta({...nuevaVenta, total: e.target.value})} required />
            </div>
            <button className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl hover:bg-green-700 transition shadow-lg mt-4">
              Finalizar Venta
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <h2 className="font-black text-lg mb-6 uppercase tracking-wider">Corte de Caja</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase font-black">
                    <th className="pb-4">Cliente / Fecha</th>
                    <th className="pb-4">Servicio</th>
                    <th className="pb-4 text-right">Monto</th>
                    <th className="pb-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((v) => (
                    <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                      <td className="py-4">
                        <p className="text-sm font-bold text-slate-800">{v.cliente}</p>
                        <p className="text-xs text-slate-500">{v.fecha}</p>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{v.servicio}</td>
                      <td className="py-4 text-sm font-black text-emerald-600 text-right">${v.total.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <button onClick={() => eliminarVenta(v.id)} className="text-red-400 text-xs font-bold uppercase hover:underline">Anular</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-emerald-600 p-6 rounded-[2rem] text-white flex justify-between items-center shadow-xl">
            <div>
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Ingresos del Día</p>
              <h3 className="text-4xl font-black">${ingresosTotales.toLocaleString()}</h3>
            </div>
            <span className="text-4xl">🏁</span>
          </div>
        </div>
      </main>
    </div>
  );
}