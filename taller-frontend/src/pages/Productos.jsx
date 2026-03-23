
import React, { useState } from 'react';

export default function Productos() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Aceite Sintético 5W30", categoria: "Lubricantes", precio: 250, stock: 15 },
    { id: 2, nombre: "Filtro de Aceite PH6607", categoria: "Filtros", precio: 120, stock: 4 },
    { id: 3, nombre: "Balatas Delanteras Mazda 3", categoria: "Frenos", precio: 850, stock: 10 }
  ]);

  const [nuevo, setNuevo] = useState({ id: null, nombre: '', categoria: '', precio: '', stock: '' });
  const [editando, setEditando] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (editando) {
      setProductos(productos.map(p => p.id === nuevo.id ? nuevo : p));
      setEditando(false);
    } else {
      setProductos([...productos, { ...nuevo, id: Date.now() }]);
    }
    setNuevo({ id: null, nombre: '', categoria: '', precio: '', stock: '' });
  };

  const prepararEdicion = (p) => {
    setNuevo(p);
    setEditando(true);
  };

  const eliminar = (id) => {
    if(window.confirm("¿Eliminar producto del inventario?")) {
      setProductos(productos.filter(p => p.id !== id));
    }
  };

  const filtrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 text-left">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛠️</span>
          <span className="font-bold text-xl uppercase tracking-tighter italic">Taller San Jorge - Inventario</span>
        </div>
        <button onClick={() => window.location.href = "/admin"} className="text-sm bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition">Volver</button>
      </nav>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 h-fit">
          <h2 className={`font-black uppercase mb-6 ${editando ? 'text-orange-500' : 'text-blue-600'}`}>
            {editando ? "📝 Editar Producto" : "📦 Nuevo Producto"}
          </h2>
          <form onSubmit={manejarEnvio} className="space-y-4">
            <input type="text" placeholder="Nombre de refacción" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 outline-none focus:border-blue-400" 
              value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required />
            
            <select className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 outline-none"
              value={nuevo.categoria} onChange={e => setNuevo({...nuevo, categoria: e.target.value})} required>
              <option value="">Categoría</option>
              <option value="Lubricantes">Lubricantes</option>
              <option value="Frenos">Frenos</option>
              <option value="Filtros">Filtros</option>
              <option value="Suspensión">Suspensión</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>

            <div className="flex gap-2">
              <input type="number" placeholder="Precio" className="w-1/2 p-3 bg-slate-50 rounded-xl border border-slate-100" 
                value={nuevo.precio} onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
              <input type="number" placeholder="Stock" className="w-1/2 p-3 bg-slate-50 rounded-xl border border-slate-100" 
                value={nuevo.stock} onChange={e => setNuevo({...nuevo, stock: e.target.value})} required />
            </div>

            <button className={`w-full text-white font-bold py-3 rounded-xl transition ${editando ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-900 hover:bg-slate-800'}`}>
              {editando ? "Actualizar" : "Registrar Producto"}
            </button>
            {editando && <button type="button" onClick={() => {setEditando(false); setNuevo({id:null, nombre:'', categoria:'', precio:'', stock:''})}} className="w-full text-xs text-slate-400 font-bold uppercase mt-2 text-center">Cancelar</button>}
          </form>
        </div>

        <div className="lg:col-span-3 space-y-4 text-left">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <input type="text" placeholder="🔍 Buscar por nombre o categoría..." className="w-full p-2 outline-none text-sm" 
              value={busqueda} onChange={e => setBusqueda(e.target.value)} />
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase font-black border-b border-slate-50">
                  <th className="pb-4">Producto / Cat.</th>
                  <th className="pb-4">Stock</th>
                  <th className="pb-4">Precio Venta</th>
                  <th className="pb-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map(p => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                    <td className="py-4">
                      <p className="font-bold text-slate-800 text-sm">{p.nombre}</p>
                      <p className="text-[10px] text-blue-500 font-bold uppercase">{p.categoria}</p>
                    </td>
                    <td className="py-4 font-black">
                      <span className={`${p.stock <= 5 ? 'text-red-500 bg-red-50' : 'text-emerald-600 bg-emerald-50'} px-3 py-1 rounded-full text-xs`}>
                        {p.stock} pzas
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-900 text-sm">${p.precio}</td>
                    <td className="py-4 text-right">
                      <div className="flex gap-3 justify-end text-left">
                        <button onClick={() => prepararEdicion(p)} className="text-blue-500 text-xs font-bold uppercase hover:underline">Editar</button>
                        <button onClick={() => eliminar(p.id)} className="text-red-400 text-xs font-bold uppercase hover:underline">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}