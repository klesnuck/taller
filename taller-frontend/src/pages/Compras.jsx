import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function Compras() {
  const [compras, setCompras] = useState([
    {
      id: 1,
      orden: 'ORD-001',
      fecha: '9/3/2026',
      proveedor: 'Distribuidora ABC',
      estadoRecepcion: 'Recibido',
      estadoPago: 'Pagado',
      total: 6400,
      productos: [
        { nombre: 'Aceite sintético 5W-30', cantidad: 20, costoUnitario: 180, total: 3600 },
        { nombre: 'Bujías platino (set 4pz)', cantidad: 10, costoUnitario: 280, total: 2800 }
      ]
    }
  ]);

  const [bajoStock, setBajoStock] = useState([
    { id: 101, nombre: 'Pastillas de freno delanteras', stockActual: 8, minimo: 12, proveedor: 'Auto Partes SA', sugerido: 20, costoTotal: 9000 },
    { id: 102, nombre: 'Líquido de frenos DOT 4', stockActual: 5, minimo: 10, proveedor: 'Refacciones XYZ', sugerido: 15, costoTotal: 1800 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [nuevo, setNuevo] = useState({
    proveedor: '',
    numeroOrden: 'ORD-003',
    estadoPago: 'Pendiente',
    productos: [{ id: Date.now(), productoId: '', cantidad: 1, costo: 0, total: 0 }]
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const calcularTotalOrden = () => {
    return nuevo.productos.reduce((acc, p) => acc + p.total, 0);
  };

  return (
    <AdminLayout activeTab="compras">
      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Header */}
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

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600 mb-2">2</span>
            <span className="text-sm text-gray-500">Órdenes este mes</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-green-500 mb-2">$10,750</span>
            <span className="text-sm text-gray-500">Total en compras</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-3xl font-medium">2</span>
            </div>
            <span className="text-sm text-gray-500">Productos por ordenar</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600 mb-2">$10,800</span>
            <span className="text-sm text-gray-500">Costo estimado pendiente</span>
          </div>
        </div>

        {/* Low Stock Alert Section */}
        {bajoStock.length > 0 && (
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
              {bajoStock.map((prod) => (
                <div key={prod.id} className="bg-white/60 p-4 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4 border border-orange-100/50">
                  <div className="flex gap-4 items-center">
                    <div className="text-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{prod.nombre}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Stock actual: {prod.stockActual} / Mínimo: {prod.minimo} <span className="mx-1.5">•</span> {prod.proveedor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Cantidad sugerida: {prod.sugerido}</p>
                    <p className="font-bold text-gray-900 mt-0.5">${prod.costoTotal}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pl-14">
              <button className="bg-[#f97316] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">
                Generar órdenes de compra
              </button>
            </div>
          </div>
        )}

        {/* Recent Orders List */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Órdenes de compra recientes</h3>
          <div className="space-y-6">
            {compras.map(compra => (
              <div key={compra.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
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
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900 mb-1.5">${compra.total}</div>
                    <div className="flex gap-2 justify-end">
                      <div className="px-2.5 py-0.5 bg-green-100 text-green-700 font-semibold text-[11px] uppercase tracking-wider rounded-full">
                        {compra.estadoRecepcion}
                      </div>
                      <div className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[11px] uppercase tracking-wider rounded-full">
                        {compra.estadoPago}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                 {/* Productos Ordenados */}
                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-gray-500 mb-4">Productos ordenados</h4>
                  <div className="space-y-4">
                    {compra.productos.map((prod, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{prod.nombre}</p>
                          <p className="text-xs text-gray-500">Cantidad: {prod.cantidad} × ${prod.costoUnitario}</p>
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          ${prod.total}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Nueva Orden de Compra */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col my-8">
            
            {/* Header */}
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

            {/* Form Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form id="compraForm" onSubmit={manejarEnvio} className="space-y-8">
                
                {/* Información de la orden */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Información de la orden</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Proveedor <span className="text-red-500">*</span></label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium" required>
                        <option value="" disabled selected hidden>Seleccionar proveedor</option>
                        <option value="Auto Partes SA">Auto Partes SA</option>
                        <option value="Distribuidora ABC">Distribuidora ABC</option>
                        <option value="Refacciones XYZ">Refacciones XYZ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Número de orden <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" required
                        value={nuevo.numeroOrden} onChange={e => setNuevo({...nuevo, numeroOrden: e.target.value})} placeholder="ORD-003" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Estado de pago <span className="text-red-500">*</span></label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white font-medium" required
                         value={nuevo.estadoPago} onChange={e => setNuevo({...nuevo, estadoPago: e.target.value})}>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Pagado">Pagado</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Productos a ordenar */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900">Productos a ordenar</h3>
                    <button type="button" className="bg-[#1a56db] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors flex items-center gap-1">
                      <span>+</span> Agregar producto
                    </button>
                  </div>
                  
                  {nuevo.productos.map((prod, index) => (
                    <div key={prod.id} className="flex flex-col sm:flex-row gap-3 mb-3">
                      <div className="flex-1">
                        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                          <option value="" disabled selected hidden>Seleccionar producto</option>
                          <option value="1">Pastillas de freno delanteras</option>
                          <option value="2">Líquido de frenos DOT 4</option>
                        </select>
                      </div>
                      <div className="w-full sm:w-20">
                        <input type="number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none text-center"
                           value={prod.cantidad} min="1" placeholder="1" />
                      </div>
                      <div className="w-full sm:w-24">
                        <input type="number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none text-center"
                           value={prod.costo} min="0" placeholder="0" />
                      </div>
                      <div className="w-full sm:w-32 flex items-center justify-end px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-900 text-sm">
                        $0.00
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer calculations inline */}
                <div className="flex justify-between items-center py-4 px-6 bg-gray-50/50 rounded-xl border border-gray-100 mt-6">
                  <span className="font-bold text-gray-900">Total de la orden</span>
                  <span className="font-bold text-lg text-[#1a56db]">${calcularTotalOrden().toFixed(2)} MXN</span>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
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