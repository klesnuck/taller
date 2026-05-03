import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas las categorías');
  
  const [nuevo, setNuevo] = useState({
    folio: '',
    clienteNombre: '',
    metodoPago: 'Efectivo',
    productosSeleccionados: [],
    subtotal: 0,
    iva: 0,
    total: 0
  });

  const cargarDatos = async () => {
    try {
      const resProd = await fetch('http://localhost:3000/api/productos_completo');
      if (resProd.ok) {
        const dataProd = await resProd.json();
        setProductos(Array.isArray(dataProd) ? dataProd : (dataProd.productos || []));
      }
      const resVentas = await fetch('http://localhost:3000/api/ventas_completo');
      if (resVentas.ok) {
        const dataVentas = await resVentas.json();
        setVentas(Array.isArray(dataVentas) ? dataVentas : (dataVentas.ventas || []));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const verFactura = (venta) => {
    alert(`Visualizando detalles de la Factura: ${venta.folio}\nCliente: ${venta.cliente}`);
  };

  const imprimirVenta = (venta) => {
    window.print();
  };

  const eliminarVenta = async (id) => {
    if (!id) return;
    if (!window.confirm("¿Estás seguro de eliminar esta venta?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/ventas_gestion/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setVentas(prev => prev.filter(v => v.idventa !== id));
      }
    } catch (error) {
      alert("Error de conexión al servidor.");
    }
  };

  const prepararEdicion = (venta) => {
    setEditandoId(venta.idventa);
    setNuevo({
      folio: venta.folio,
      clienteNombre: venta.cliente,
      metodoPago: venta.metodo_pago,
      productosSeleccionados: [],
      subtotal: venta.subtotal,
      iva: venta.iva,
      total: venta.total
    });
    setShowModal(true);
  };

  const abrirModal = () => {
    setEditandoId(null);
    const fechaHoy = new Date();
    const nuevoFolio = `VTA-${fechaHoy.getFullYear()}${String(fechaHoy.getMonth() + 1).padStart(2, '0')}${String(fechaHoy.getDate()).padStart(2, '0')}-${String(ventas.length + 1).padStart(3, '0')}`;
    setNuevo({
      folio: nuevoFolio, clienteNombre: '', metodoPago: 'Efectivo',
      productosSeleccionados: [], subtotal: 0, iva: 0, total: 0
    });
    setCategoriaSeleccionada('Todas las categorías');
    setShowModal(true);
  };

  const agregarProductoALista = (idProd) => {
    if (!idProd) return;
    const idNumerico = Number(idProd);
    const prodInfo = productos.find(p => Number(p.idproductos) === idNumerico);
    if (!prodInfo) return;

    const existe = nuevo.productosSeleccionados.find(p => Number(p.idproductos) === prodInfo.idproductos);
    let nuevaLista;

    if (existe) {
      nuevaLista = nuevo.productosSeleccionados.map(p => 
        Number(p.idproductos) === prodInfo.idproductos 
          ? { ...p, cantidad: p.cantidad + 1, total: (p.cantidad + 1) * p.precio } 
          : p
      );
    } else {
      nuevaLista = [...nuevo.productosSeleccionados, {
        idproductos: prodInfo.idproductos,
        nombre: prodInfo.nombre,
        precio: parseFloat(prodInfo.precio_venta),
        cantidad: 1,
        total: parseFloat(prodInfo.precio_venta)
      }];
    }
    actualizarTotales(nuevaLista);
  };

  const actualizarTotales = (lista) => {
    const sub = lista.reduce((acc, p) => acc + p.total, 0);
    const ivaCalculado = sub * 0.16;
    setNuevo({
      ...nuevo,
      productosSeleccionados: lista,
      subtotal: sub,
      iva: ivaCalculado,
      total: sub + ivaCalculado
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!editandoId && nuevo.productosSeleccionados.length === 0) return alert("El carrito está vacío");
    
    const url = editandoId 
      ? `http://localhost:3000/api/ventas_gestion/${editandoId}` 
      : 'http://localhost:3000/api/ventas_gestion';
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      if (response.ok) {
        setShowModal(false);
        cargarDatos(); 
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  const productosFiltrados = productos.filter(p => {
    if (categoriaSeleccionada === 'Todas las categorías') return true;
    return p.categoria === categoriaSeleccionada;
  });

  return (
    <AdminLayout activeTab="ventas">
      <div className="p-8 max-w-7xl mx-auto font-sans">
        <div className="flex justify-between items-center mb-6 text-left no-print">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Gestión de Ventas</h2>
            <p className="text-gray-500 text-xs">Administra las ventas del taller</p>
          </div>
          <button onClick={abrirModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md">+ Nueva venta</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-left no-print">
          <StatCard val={ventas.length} label="VENTAS REGISTRADAS" />
          <StatCard val={`$${ventas.reduce((acc, v) => acc + Number(v.total || 0), 0).toLocaleString()}`} label="TOTAL EN VENTAS" color="text-green-500" />
          <StatCard val={`$${ventas.length > 0 ? (ventas.reduce((acc, v) => acc + Number(v.total || 0), 0) / ventas.length).toFixed(0) : 0}`} label="TICKET PROMEDIO" />
          <StatCard val="+15%" label="VS MES ANTERIOR" color="text-purple-600" />
        </div>

        <div className="space-y-4">
          {ventas.map((venta) => (
            <div key={venta.idventa} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg no-print">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Factura: {venta.folio}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                      <span>{new Date(venta.fecha).toLocaleDateString('es-MX')}</span>
                      <span>•</span>
                      <span>{venta.cliente || 'Público General'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-gray-900">${Number(venta.total).toLocaleString()}</div>
                  <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Pagado</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                <p className="text-xs text-gray-500 font-medium">Método de pago: <span className="font-bold text-gray-800">{venta.metodo_pago}</span></p>
                <div className="flex gap-2 no-print">
                  <button onClick={() => verFactura(venta)} className="text-blue-600 text-xs font-bold px-3 py-1.5 hover:bg-blue-50 rounded-lg transition">Ver factura</button>
                  <button onClick={() => imprimirVenta(venta)} className="text-gray-600 text-xs font-bold px-3 py-1.5 hover:bg-gray-100 rounded-lg transition">Imprimir</button>
                  <button onClick={() => prepararEdicion(venta)} className="text-amber-600 p-1.5 hover:bg-amber-50 rounded-lg transition"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                  <button onClick={() => eliminarVenta(venta.idventa)} className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL COMPACTA DE REGISTRO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header Compacto */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-md font-bold text-gray-800 uppercase tracking-tight">{editandoId ? 'Editar Venta' : 'Nueva Venta'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Body Compacto */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Folio</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 outline-none" value={nuevo.folio} readOnly />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Pago *</label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500" value={nuevo.metodoPago} onChange={e => setNuevo({...nuevo, metodoPago: e.target.value})}>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta</option>
                  </select>
                </div>
              </div>

              <div className="text-left">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Cliente *</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium outline-none focus:ring-1 focus:ring-blue-500" value={nuevo.clienteNombre} onChange={e => setNuevo({...nuevo, clienteNombre: e.target.value})} placeholder="Público General" />
              </div>

              {!editandoId && (
                <div className="space-y-3 pt-2 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Añadir Productos</label>
                    <select className="text-[10px] bg-transparent border-none font-bold text-blue-600 outline-none" value={categoriaSeleccionada} onChange={e => setCategoriaSeleccionada(e.target.value)}>
                      {['Todas las categorías', 'Lubricantes', 'Filtros', 'Frenos', 'Encendido', 'Líquidos', 'Autopartes'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  
                  <select className="w-full px-3 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700 outline-none" onChange={(e) => agregarProductoALista(e.target.value)} value="">
                    <option value="">Seleccionar producto...</option>
                    {productosFiltrados.map(p => <option key={p.idproductos} value={p.idproductos}>{p.nombre} - ${p.precio_venta}</option>)}
                  </select>

                  {/* Lista de productos seleccionados con scroll si es larga */}
                  <div className="max-h-32 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {nuevo.productosSeleccionados.map((p) => (
                      <div key={p.idproductos} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex-1">
                          <p className="text-[11px] font-bold text-gray-700">{p.nombre}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase">{p.cantidad} x ${p.precio}</p>
                        </div>
                        <div className="text-xs font-black text-gray-800">${p.total.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Totales Compactos */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-1">
                <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                  <span>SUBTOTAL:</span> <span>${Number(nuevo.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                  <span>IVA (16%):</span> <span>${Number(nuevo.iva).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-gray-200">
                  <span className="text-blue-600 font-black">TOTAL:</span>
                  <span className="font-black text-blue-600">${Number(nuevo.total).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer Compacto */}
            <div className="p-4 border-t flex justify-end gap-3 bg-white">
              <button onClick={() => setShowModal(false)} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600">Cancelar</button>
              <button onClick={manejarEnvio} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm uppercase text-[10px] tracking-widest">
                {editandoId ? 'Guardar' : 'Finalizar Venta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function StatCard({ val, label, color = "text-blue-600" }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center no-print">
      <span className={`text-xl font-bold ${color}`}>{val}</span>
      <span className="text-[9px] text-gray-500 mt-1 font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}