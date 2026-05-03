import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function Compras() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [alertas, setAlertas] = useState({ bajoStock: [], productosPorOrdenar: 0, costoEstimado: 0 });
  const [expandidas, setExpandidas] = useState({});

  const cargarDatos = () => {
    fetch('http://localhost:3000/api/proveedores')
      .then(res => res.json())
      .then(data => setListaProveedores(data));

    fetch('http://localhost:3000/api/productos')
      .then(res => res.json())
      .then(data => setListaProductos(data));

    fetch('http://localhost:3000/api/compras')
      .then(res => res.ok ? res.json() : [])
      .then(data => setCompras(Array.isArray(data) ? data : []))
      .catch(() => setCompras([]));

    fetch('http://localhost:3000/api/compras/alertas')
      .then(res => res.ok ? res.json() : { bajoStock: [], productosPorOrdenar: 0, costoEstimado: 0 })
      .then(data => setAlertas(data))
      .catch(() => setAlertas({ bajoStock: [], productosPorOrdenar: 0, costoEstimado: 0 }));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [nuevo, setNuevo] = useState({
    proveedor: '',
    numeroOrden: 'ORD-NUEVA',
    estadoPago: 'PENDIENTE',
    productos: [{ id: Date.now(), productoId: '', cantidad: 1, costo: 0, total: 0 }]
  });

  const toggleExpandir = (id) => {
    setExpandidas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!nuevo.proveedor) {
      alert("Por favor selecciona un proveedor.");
      return;
    }
    if (nuevo.productos.some(p => !p.productoId)) {
      alert("Por favor selecciona un producto válido en todas las filas.");
      return;
    }

    const datosAEnviar = {
      idProveedor: parseInt(nuevo.proveedor),
      estado_pago: nuevo.estadoPago,
      total: calcularTotalOrden(),
      productos: nuevo.productos.map(p => ({
        idProductos: parseInt(p.productoId),
        cantidad: parseInt(p.cantidad),
        precio_unitario: parseFloat(p.costo),
        subtotal: p.total
      }))
    };

    try {
      const response = await fetch('http://localhost:3000/api/compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosAEnviar)
      });

      if (response.ok) {
        alert("¡Orden guardada con éxito! 🚀");
        setShowModal(false);
        cargarDatos();
        setNuevo({
          proveedor: '',
          numeroOrden: 'ORD-NUEVA',
          estadoPago: 'PENDIENTE',
          productos: [{ id: Date.now(), productoId: '', cantidad: 1, costo: 0, total: 0 }]
        });
      } else {
        const errorData = await response.json();
        alert("El backend reportó un error: " + (errorData.error || "Desconocido"));
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor Node.js");
    }
  };

  const calcularTotalOrden = () => nuevo.productos.reduce((acc, p) => acc + p.total, 0);

  const agregarProducto = () => {
    setNuevo({
      ...nuevo,
      productos: [...nuevo.productos, { id: Date.now(), productoId: '', cantidad: 1, costo: 0, total: 0 }]
    });
  };

  const eliminarProducto = (index) => {
    if (nuevo.productos.length === 1) return;
    const nuevosProductos = nuevo.productos.filter((_, i) => i !== index);
    setNuevo({ ...nuevo, productos: nuevosProductos });
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...nuevo.productos];
    nuevosProductos[index][campo] = valor;

    if (campo === 'productoId') {
      const productoSeleccionado = listaProductos.find(p => p.idproductos.toString() === valor.toString());
      if (productoSeleccionado) {
        nuevosProductos[index].costo = parseFloat(productoSeleccionado.precio_unitario) || 0;
      }
    }
    const cantidad = parseFloat(nuevosProductos[index].cantidad) || 0;
    const costo = parseFloat(nuevosProductos[index].costo) || 0;
    nuevosProductos[index].total = cantidad * costo;

    setNuevo({ ...nuevo, productos: nuevosProductos });
  };

  return (
    <AdminLayout activeTab="compras">
      <div className="p-8 max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Gestión de Compras</h2>
            <p className="text-gray-500 text-sm">Administra las órdenes de compra y proveedores</p>
          </div>
          <button 
            type="button" 
            onClick={() => setShowModal(true)} 
            className="bg-[#1a56db] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Nueva orden de compra
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600 mb-2">{compras.length}</span>
            <span className="text-sm text-gray-500">Órdenes totales</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-green-500 mb-2">
              ${compras.reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0).toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">Total en compras</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-3xl font-medium">{alertas.productosPorOrdenar}</span>
            </div>
            <span className="text-sm text-gray-500">Productos por ordenar</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600 mb-2">${parseFloat(alertas.costoEstimado || 0).toFixed(2)}</span>
            <span className="text-sm text-gray-500">Costo estimado pendiente</span>
          </div>
        </div>

        {alertas.bajoStock.length > 0 && (
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 mb-10 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Productos con bajo stock</h3>
                <p className="text-sm text-gray-600 mt-1">Los siguientes productos están por debajo del stock mínimo y requieren reabastecimiento.</p>
              </div>
            </div>

            <div className="space-y-3 pl-14 mb-6">
              {alertas.bajoStock.map((prod) => (
                <div key={prod.id} className="bg-white/60 p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4 border border-orange-100/50">
                  <div className="flex gap-4 items-center">
                    <div className="text-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{prod.nombre}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Stock actual: {prod.stockActual} / Mínimo: {prod.minimo} <span className="mx-1.5">•</span> {prod.proveedor || 'Sin proveedor'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Cantidad sugerida: {prod.sugerido}</p>
                    <p className="font-bold text-gray-900 mt-0.5">${parseFloat(prod.costoTotal || 0).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pl-14">
              <button 
                type="button" 
                onClick={() => setShowModal(true)} 
                className="bg-[#f97316] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
              >
                Generar órdenes de compra
              </button>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Órdenes de compra recientes</h3>
          <div className="space-y-4">
            {compras.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center text-gray-500">
                Aún no hay órdenes de compra registradas.
              </div>
            ) : (
              compras.map(compra => (
                <div key={compra.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  
                  <div 
                    onClick={() => toggleExpandir(compra.id)}
                    className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">Orden: {compra.orden}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          {compra.fecha} <span className="mx-2">•</span> {compra.proveedor}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 mb-1.5">${parseFloat(compra.total || 0).toFixed(2)}</div>
                        <div className="flex gap-2 justify-end">
                          <div className={`px-2.5 py-0.5 font-semibold text-[11px] uppercase tracking-wider rounded-full ${compra.estadoRecepcion === 'RECIBIDO' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {compra.estadoRecepcion || 'PENDIENTE'}
                          </div>
                          <div className={`px-2.5 py-0.5 font-semibold text-[11px] uppercase tracking-wider rounded-full ${compra.estadoPago === 'PAGADO' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {compra.estadoPago || 'PENDIENTE'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-gray-400">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={2} 
                          stroke="currentColor" 
                          className={`w-6 h-6 transition-transform duration-200 ${expandidas[compra.id] ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {expandidas[compra.id] && (
                    <div className="px-6 pb-6 pt-2 bg-gray-50/50 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-500 mb-4 mt-2">Productos ordenados</h4>
                      <div className="space-y-4">
                        {compra.productos && compra.productos.map((prod, idx) => (
                          <div key={idx} className="flex justify-between items-start bg-white p-3 rounded-lg border border-gray-200/60 shadow-sm">
                            <div>
                              <p className="text-sm font-bold text-gray-900">{prod.nombre}</p>
                              <p className="text-xs text-gray-500 mt-0.5">Cantidad: {prod.cantidad} × ${parseFloat(prod.costoUnitario || 0).toFixed(2)}</p>
                            </div>
                            <div className="text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md">
                              ${parseFloat(prod.total || 0).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col my-8">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Nueva orden de compra</h2>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form id="compraForm" onSubmit={manejarEnvio} className="space-y-8">
                
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Información de la orden</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Proveedor <span className="text-red-500">*</span></label>
                      <select 
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium" 
                        required
                        value={nuevo.proveedor}
                        onChange={e => setNuevo({...nuevo, proveedor: e.target.value})}
                      >
                        <option value="" disabled hidden>Seleccionar proveedor</option>
                        {listaProveedores.map(prov => (
                          <option key={prov.idproveedor} value={prov.idproveedor}>{prov.nombre}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Número de orden <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none" 
                        value="Autogenerado por el sistema" disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estado de pago <span className="text-red-500">*</span></label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium" required
                         value={nuevo.estadoPago} onChange={e => setNuevo({...nuevo, estadoPago: e.target.value})}>
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="PAGADO">Pagado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900">Productos a ordenar</h3>
                    <button type="button" onClick={agregarProducto} className="bg-[#1a56db] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors flex items-center gap-1">
                      <span>+</span> Agregar producto
                    </button>
                  </div>

                  <div className="hidden sm:flex gap-3 mb-2 px-1">
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</label>
                    </div>
                    <div className="w-20 text-center">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Cantidad</label>
                    </div>
                    <div className="w-24 text-center">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Precio</label>
                    </div>
                    <div className="w-32 text-center">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subtotal</label>
                    </div>
                    {nuevo.productos.length > 1 && <div className="w-9"></div>}
                  </div>
                  
                  {nuevo.productos.map((prod, index) => (
                    <div key={prod.id} className="flex flex-col sm:flex-row gap-3 mb-3 items-center">
                      <div className="flex-1">
                        <select 
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                          value={prod.productoId}
                          onChange={(e) => actualizarProducto(index, 'productoId', e.target.value)}
                        >
                          <option value="" disabled hidden>Seleccionar producto</option>
                          {listaProductos.map(p => (
                            <option key={p.idproductos} value={p.idproductos}>{p.nombre}</option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full sm:w-20">
                        <input type="number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none text-center"
                           value={prod.cantidad} 
                           onChange={(e) => actualizarProducto(index, 'cantidad', e.target.value)}
                           min="1" placeholder="1" />
                      </div>
                      <div className="w-full sm:w-24">
                        <input type="number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none text-center"
                           value={prod.costo} 
                           readOnly
                           placeholder="0" />
                      </div>
                      <div className="w-full sm:w-32 flex items-center justify-end px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-900 text-sm">
                        ${prod.total.toFixed(2)}
                      </div>

                      {nuevo.productos.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => eliminarProducto(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title="Eliminar fila"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center py-4 px-6 bg-gray-50/50 rounded-xl border border-gray-100 mt-6">
                  <span className="font-bold text-gray-900">Total de la orden</span>
                  <span className="font-bold text-lg text-[#1a56db]">${calcularTotalOrden().toFixed(2)} MXN</span>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-white">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                Cancelar
              </button>
              <button type="submit" form="compraForm" className="px-6 py-2.5 text-sm font-bold text-white bg-[#f97316] hover:bg-orange-600 rounded-lg transition-colors">
                Crear orden de compra
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}