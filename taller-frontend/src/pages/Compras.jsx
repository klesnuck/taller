import React, { useState } from 'react';

export default function Compras() {
  const [compras, setCompras] = useState([
    { id: 1, proveedor: "Refaccionaria Garza", producto: "Aceite Sintético 5W30", cantidad: 20, precioUnitario: 225, total: 4500, fecha: "2026-03-20" },
    { id: 2, proveedor: "Llantas Saltillo", producto: "Llantas R15 MICHELIN", cantidad: 8, precioUnitario: 1600, total: 12800, fecha: "2026-03-21" }
  ]);

  const [nuevoItem, setNuevoItem] = useState({ id: null, proveedor: '', producto: '', cantidad: '', precioUnitario: '' });
  const [editando, setEditando] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    const totalCalc = Number(nuevoItem.cantidad) * Number(nuevoItem.precioUnitario);

    if (editando) {
      const listaEditada = compras.map(c => 
        c.id === nuevoItem.id ? { ...nuevoItem, total: totalCalc, fecha: c.fecha } : c
      );
      setCompras(listaEditada);
      setEditando(false);
    } else {
      const compraNueva = {
        ...nuevoItem,
        id: Date.now(),
        total: totalCalc,
        fecha: new Date().toISOString().split('T')[0]
      };
      setCompras([compraNueva, ...compras]);
    }
    setNuevoItem({ id: null, proveedor: '', producto: '', cantidad: '', precioUnitario: '' });
  };

  const prepararEdicion = (compra) => {
    setNuevoItem(compra);
    setEditando(true);
  };

  const eliminarCompra = (id) => {
    if(window.confirm("¿Eliminar registro?")) {
      setCompras(compras.filter(c => c.id !== id));
    }
  };

  const gastoTotal = compras.reduce((acc, curr) => acc + Number(curr.total), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 text-left">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📦</span>
          <span className="font-bold text-xl uppercase tracking-tighter italic">Taller San Jorge - Compras</span>
        </div>
        <button onClick={() => window.location.href = "/admin"} className="text-sm bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition">Volver a Reportes</button>
      </nav>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 h-fit">
          <h2 className={`font-black text-lg mb-6 uppercase tracking-wider ${editando ? 'text-orange-500' : 'text-blue-600'}`}>
            {editando ? "📝 Editando" : "🛒 Nueva Compra"}
          </h2>
          <form onSubmit={manejarEnvio} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Proveedor</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
                value={nuevoItem.proveedor} onChange={(e) => setNuevoItem({...nuevoItem, proveedor: e.target.value})} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Producto</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500"
                value={nuevoItem.producto} onChange={(e) => setNuevoItem({...nuevoItem, producto: e.target.value})} required />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Cant.</label>
                <input type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl"
                  value={nuevoItem.cantidad} onChange={(e) => setNuevoItem({...nuevoItem, cantidad: e.target.value})} required />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">P. Unitario ($)</label>
                <input type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl"
                  value={nuevoItem.precioUnitario} onChange={(e) => setNuevoItem({...nuevoItem, precioUnitario: e.target.value})} required />
              </div>
            </div>
            <button className={`w-full text-white font-bold py-4 rounded-2xl transition shadow-lg mt-4 ${editando ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-900 hover:bg-slate-800'}`}>
              {editando ? "Guardar Cambios" : "Registrar Entrada"}
            </button>
            {editando && (
              <button type="button" onClick={() => {setEditando(false); setNuevoItem({id:null, proveedor:'', producto:'', cantidad:'', precioUnitario:''})}} className="w-full text-slate-400 text-xs font-bold uppercase mt-2 text-center">Cancelar</button>
            )}
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <h2 className="font-black text-lg mb-6 uppercase tracking-wider text-slate-900 text-left">Historial de Adquisiciones</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase font-black">
                    <th className="pb-4">Proveedor / Producto</th>
                    <th className="pb-4 text-center">Cant.</th>
                    <th className="pb-4 text-right">Total</th>
                    <th className="pb-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                      <td className="py-4 text-left">
                        <p className="text-sm font-bold text-slate-800">{c.proveedor}</p>
                        <p className="text-xs text-slate-500">{c.producto} - {c.fecha}</p>
                      </td>
                      <td className="py-4 text-sm font-black text-blue-600 text-center">{c.cantidad}</td>
                      <td className="py-4 text-sm font-black text-slate-900 text-right">${c.total.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <div className="flex gap-3 justify-end">
                          <button onClick={() => prepararEdicion(c)} className="text-blue-500 text-xs font-bold uppercase hover:underline">Editar</button>
                          <button onClick={() => eliminarCompra(c.id)} className="text-red-400 text-xs font-bold uppercase hover:underline">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-[2rem] text-white flex justify-between items-center shadow-xl">
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Inversión Total en Insumos</p>
              <h3 className="text-4xl font-black">${gastoTotal.toLocaleString()}</h3>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
      </main>
    </div>
  );
}