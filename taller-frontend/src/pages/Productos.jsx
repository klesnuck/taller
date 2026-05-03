import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ 
    idproductos: null, nombre: '', categoria: '', precio_venta: '', 
    stock: 0, sku: '', stock_minimo: '', precio_unitario: '', ubicacion: '' 
  });
  const [editando, setEditando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [soloBajoStock, setSoloBajoStock] = useState(false);

  const cargarProductos = () => {
    fetch('http://localhost:3000/api/productos_completo')
      .then(res => res.json())
      .then(data => {
        const lista = Array.isArray(data) ? data : data.productos;
        setProductos(lista || []);
      })
      .catch(err => console.error("Error al cargar productos:", err));
  };

  useEffect(() => { cargarProductos(); }, []);

  // AGILIZACIÓN: Generación automática de SKU
  useEffect(() => {
    if (!editando && nuevo.nombre.length >= 3 && nuevo.categoria) {
      const prefijoCat = nuevo.categoria.substring(0, 3).toUpperCase();
      const prefijoNom = nuevo.nombre.substring(0, 3).toUpperCase();
      const secuencial = String(productos.length + 1).padStart(3, '0');
      const skuAuto = `${prefijoCat}-${prefijoNom}-${secuencial}`;
      
      if (nuevo.sku !== skuAuto) {
        setNuevo(prev => ({ ...prev, sku: skuAuto }));
      }
    }
  }, [nuevo.nombre, nuevo.categoria, productos.length, editando]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const metodo = editando ? 'PUT' : 'POST';
    const url = editando 
      ? `http://localhost:3000/api/productos_gestion/${nuevo.idproductos}`
      : 'http://localhost:3000/api/productos_gestion';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      if (response.ok) {
        setShowModal(false);
        setEditando(false);
        cargarProductos(); 
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  // FUNCIÓN DELETE: Para eliminar productos
  const eliminarProducto = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
      try {
        const response = await fetch(`http://localhost:3000/api/productos_gestion/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          cargarProductos();
        } else {
          alert("No se pudo eliminar el producto");
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const ajustarStockRemoto = async (p) => {
    const newStock = window.prompt(`Ingresa el nuevo stock para ${p.nombre}:`, p.stock);
    if (newStock !== null && !isNaN(newStock) && newStock.trim() !== '') {
      await fetch(`http://localhost:3000/api/productos_gestion/stock/${p.idproductos}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: Number(newStock) })
      });
      cargarProductos();
    }
  };

  const alCambiarCategoria = (cat) => {
    let sugerencias = { categoria: cat };
    if (!editando) {
      if (cat === 'Lubricantes') { sugerencias.stock_minimo = 12; sugerencias.ubicacion = 'Estante A-1'; }
      else if (cat === 'Filtros') { sugerencias.stock_minimo = 20; sugerencias.ubicacion = 'Pasillo 2'; }
    }
    setNuevo(prev => ({ ...prev, ...sugerencias }));
  };

  const alCambiarCosto = (valor) => {
    const costo = parseFloat(valor) || 0;
    const sugerido = (costo * 1.35).toFixed(2);
    setNuevo(prev => ({ ...prev, precio_unitario: valor, precio_venta: sugerido }));
  };

  const totalStock = productos.reduce((acc, p) => acc + Number(p.stock || 0), 0);
  const totalValue = productos.reduce((acc, p) => acc + (Number(p.stock || 0) * Number(p.precio_unitario || 0)), 0);
  const lowStockCount = productos.filter(p => Number(p.stock) <= Number(p.stock_minimo)).length;

  const productosFiltrados = productos
    .filter(p => {
      if (categoriaFiltro === 'Todas') return true;
      return String(p.categoria || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 
             categoriaFiltro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    })
    .filter(p => !soloBajoStock || Number(p.stock) <= Number(p.stock_minimo));

  return (
    <AdminLayout activeTab="productos">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 text-left">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Gestión de Productos</h2>
            <p className="text-gray-500 text-sm">Administra el inventario y control de stock</p>
          </div>
          <button onClick={() => { setEditando(false); setNuevo({ idproductos: null, nombre: '', categoria: '', precio_venta: '', stock: 0, sku: '', stock_minimo: '', precio_unitario: '', ubicacion: '' }); setShowModal(true); }} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
            + Agregar producto
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-left">
          <StatCard val={productos.length} label="PRODUCTOS EN CATÁLOGO" />
          <StatCard val={totalStock} label="UNIDADES EN STOCK" />
          <StatCard val={lowStockCount} label="BAJO STOCK" color={lowStockCount > 0 ? "text-orange-600" : "text-gray-900"} warn={lowStockCount > 0} />
          <StatCard val={`$${totalValue.toLocaleString()}`} label="VALOR DEL INVENTARIO (COSTO)" />
        </div>

        <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {['Todas', 'Lubricantes', 'Filtros', 'Frenos', 'Encendido', 'Líquidos', 'Autopartes'].map(cat => (
              <button key={cat} onClick={() => setCategoriaFiltro(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${categoriaFiltro === cat ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                {cat === 'Todas' ? 'Todas las categorías' : cat}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 pr-4 text-sm text-gray-600 cursor-pointer whitespace-nowrap ml-4 font-medium">
            <input type="checkbox" className="rounded text-blue-600" checked={soloBajoStock} onChange={(e) => setSoloBajoStock(e.target.checked)} />
            Solo mostrar bajo stock
          </label>
        </div>

        <div className="space-y-4">
          {productosFiltrados.map(p => {
            const stockActual = Number(p.stock || 0);
            const stockMin = Number(p.stock_minimo || 1);
            const costoUnit = Number(p.precio_unitario || 0);
            const pVenta = Number(p.precio_venta || 0);

            return (
              <div key={p.idproductos} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative text-left">
                <div className="absolute right-6 top-6 flex gap-2">
                  {/* BOTÓN EDITAR */}
                  <button onClick={() => { setNuevo(p); setEditando(true); setShowModal(true); }} className="text-gray-400 hover:text-blue-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  {/* BOTÓN ELIMINAR */}
                  <button onClick={() => eliminarProducto(p.idproductos, p.nombre)} className="text-gray-400 hover:text-red-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-9.123a.625.625 0 0 0-1.25 0v9.123" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl shadow-inner">📦</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{p.nombre}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider">{p.categoria || 'S/C'}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SKU: {p.sku || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                  <DataInfo label="STOCK ACTUAL" val={stockActual} bold />
                  <DataInfo label="STOCK MÍNIMO" val={stockMin} />
                  <DataInfo label="COSTO UNITARIO" val={`$${costoUnit.toFixed(2)}`} />
                  <DataInfo label="PRECIO VENTA" val={pVenta > 0 ? `$${pVenta.toFixed(2)}` : 'S/P'} color="text-blue-600" bold />
                  <DataInfo label="PROVEEDOR" val="Distribuidores S.A." />
                  <DataInfo label="UBICACIÓN" val={p.ubicacion || 'Pendiente'} />
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm mt-2">
                  <div className="text-gray-500 w-full md:w-auto font-medium">
                    Valor en inventario: <strong className="text-gray-900 ml-1 font-bold">${(stockActual * costoUnit).toLocaleString()}</strong>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto justify-end">
                    <button onClick={() => ajustarStockRemoto(p)} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-bold hover:bg-blue-700 transition w-full md:w-auto text-xs uppercase tracking-widest">Ajustar stock</button>
                    <button className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-1.5 rounded-lg font-bold hover:bg-gray-100 transition w-full md:w-auto text-xs uppercase tracking-widest">Ver movimientos</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg">📦</div>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{editando ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-8">
              <form id="productForm" onSubmit={manejarEnvio} className="space-y-6 text-left">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">NOMBRE DEL PRODUCTO *</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500 transition-all" required value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} placeholder="Ej: Aceite de motor" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">CATEGORÍA *</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none cursor-pointer focus:border-blue-500" required value={nuevo.categoria} onChange={e => alCambiarCategoria(e.target.value)}>
                      <option value="">Seleccionar...</option>
                      {['Lubricantes', 'Filtros', 'Frenos', 'Encendido', 'Líquidos', 'Autopartes'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">SKU (AUTO)</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold outline-none text-gray-500" required value={nuevo.sku} readOnly />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">STOCK MÍNIMO *</label>
                    <input type="number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500" required value={nuevo.stock_minimo} onChange={e => setNuevo({ ...nuevo, stock_minimo: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">UBICACIÓN *</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500" required value={nuevo.ubicacion} onChange={e => setNuevo({ ...nuevo, ubicacion: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">COSTO (MXN)</label>
                    <input type="number" step="0.01" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold outline-none focus:border-blue-500" value={nuevo.precio_unitario} onChange={e => alCambiarCosto(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">PRECIO VENTA (SUGERIDO +35%)</label>
                    <input type="number" step="0.01" className="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl text-sm font-bold text-blue-600 outline-none" value={nuevo.precio_venta} onChange={e => setNuevo({ ...nuevo, precio_venta: e.target.value })} />
                  </div>
                </div>
              </form>
              <div className="pt-8 flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">CANCELAR</button>
                <button type="submit" form="productForm" className="px-8 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg uppercase tracking-widest transition-all active:scale-95">{editando ? 'GUARDAR CAMBIOS' : 'CONFIRMAR PRODUCTO'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function StatCard({ val, label, color = "text-blue-600", warn = false }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center text-left">
      <div className="flex items-center gap-2"><span className={`text-3xl font-medium ${color}`}>{val}</span>{warn && <span className="text-orange-500 text-sm font-bold">⚠️</span>}</div>
      <span className="text-xs text-gray-500 mt-1 font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}

function DataInfo({ label, val, color = "text-gray-900", bold = false }) {
  return (
    <div>
      <div className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-widest">{label}</div>
      <div className={`text-sm ${bold ? 'font-bold' : 'font-medium'} ${color}`}>{val}</div>
    </div>
  );
}