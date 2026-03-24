import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function Ventas() {
  const [ventas, setVentas] = useState([
    {
      id: 1,
      factura: 'VTA-001',
      fecha: '14/3/2026',
      cliente: 'María González',
      estado: 'Pagado',
      metodoPago: 'Tarjeta',
      subtotal: 370,
      iva: 59,
      total: 429,
      productos: [
        { nombre: 'Aceite sintético 5W-30', cantidad: 1, precioUnitario: 250, total: 250 },
        { nombre: 'Filtro de aceite universal', cantidad: 1, precioUnitario: 120, total: 120 }
      ]
    },
    {
      id: 2,
      factura: 'VTA-002',
      fecha: '13/3/2026',
      cliente: 'Pedro Martínez',
      estado: 'Pagado',
      metodoPago: 'Efectivo',
      subtotal: 400,
      iva: 64,
      total: 464,
      productos: [
        { nombre: 'Bujías platino (set 4pz)', cantidad: 1, precioUnitario: 400, total: 400 }
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [nuevo, setNuevo] = useState({
    clienteNombre: '',
    clienteTelefono: '',
    clienteCorreo: '',
    productos: [{ id: Date.now(), productoId: '', cantidad: 1, descuento: 0, total: 0 }],
    metodoPago: ''
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Simulate register sale
    setShowModal(false);
  };

  const calcularSubtotal = () => {
    return nuevo.productos.reduce((acc, p) => acc + p.total, 0);
  };

  const calcularIVA = () => {
    return calcularSubtotal() * 0.16;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularIVA();
  };

  return (
    <AdminLayout activeTab="ventas">
      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Gestión de Ventas</h2>
            <p className="text-gray-500 text-sm">Administra las ventas de productos y servicios</p>
          </div>
          <button 
            type="button" 
            onClick={() => setShowModal(true)} 
            className="bg-[#1a56db] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Nueva venta
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="text-3xl font-medium">2</span>
            </div>
            <span className="text-sm text-gray-500">Ventas registradas</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-green-500 mb-2">$893</span>
            <span className="text-sm text-gray-500">Total en ventas</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600 mb-2">$447</span>
            <span className="text-sm text-gray-500">Ticket promedio</span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-1 text-purple-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <span className="text-3xl font-medium">+15%</span>
            </div>
            <span className="text-sm text-gray-500">vs mes anterior</span>
          </div>
        </div>

        {/* Invoices List */}
        <div className="space-y-6">
          {ventas.map(venta => (
            <div key={venta.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">Factura: {venta.factura}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      {venta.fecha} <span className="mx-2">•</span> {venta.cliente}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">${venta.total}</div>
                  <div className="inline-block mt-1 px-2.5 py-0.5 bg-green-100 text-green-700 font-semibold text-xs rounded-full">
                    {venta.estado}
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 mb-6" />

               {/* Productos List */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-500 mb-4">Productos vendidos</h4>
                <div className="space-y-4">
                  {venta.productos.map((prod, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{prod.nombre}</p>
                        <p className="text-xs text-gray-500">Cantidad: {prod.cantidad} × ${prod.precioUnitario}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        ${prod.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 mb-4" />
              
              {/* Amounts */}
              <div className="flex flex-col items-end gap-2 mb-6">
                <div className="flex justify-between w-full max-w-[200px] text-sm text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>${venta.subtotal}</span>
                </div>
                <div className="flex justify-between w-full max-w-[200px] text-sm text-gray-600 font-medium">
                  <span>IVA (16%)</span>
                  <span>${venta.iva}</span>
                </div>
                <div className="flex justify-between w-full max-w-[200px] font-bold text-lg text-blue-600 mt-2">
                  <span>Total</span>
                  <span>${venta.total}</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-gray-500 font-medium">
                  Método de pago: <span className="text-gray-900 font-bold">{venta.metodoPago}</span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-[#1a56db] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors">
                    Ver factura
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors border border-gray-200">
                    Imprimir
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Modal Nueva Venta */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col my-8">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Registrar nueva venta</h2>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form id="ventaForm" onSubmit={manejarEnvio} className="space-y-8">
                
                {/* Información del cliente */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Información del cliente</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre del cliente <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" required
                        value={nuevo.clienteNombre} onChange={e => setNuevo({...nuevo, clienteNombre: e.target.value})} placeholder="Juan Pérez" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teléfono <span className="text-red-500">*</span></label>
                      <input type="tel" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none" required
                        value={nuevo.clienteTelefono} onChange={e => setNuevo({...nuevo, clienteTelefono: e.target.value})} placeholder="123-456-7890" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correo (opcional)</label>
                      <input type="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                        value={nuevo.clienteCorreo} onChange={e => setNuevo({...nuevo, clienteCorreo: e.target.value})} placeholder="juan@email.com" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Productos */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-900">Productos</h3>
                    <button type="button" className="bg-[#1a56db] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors flex items-center gap-1">
                      <span>+</span> Agregar producto
                    </button>
                  </div>
                  
                  {nuevo.productos.map((prod, index) => (
                    <div key={prod.id} className="flex flex-col sm:flex-row gap-3 mb-3">
                      <div className="flex-1">
                        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white">
                          <option value="" disabled selected hidden>Seleccionar producto</option>
                          <option value="1">Aceite sintético 5W-30</option>
                          <option value="2">Filtro de aceite universal</option>
                        </select>
                      </div>
                      <div className="w-full sm:w-20">
                        <input type="number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none text-center"
                           value={prod.cantidad} min="1" placeholder="1" />
                      </div>
                      <div className="w-full sm:w-24">
                        <input type="number" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none text-center"
                           value={prod.descuento} min="0" placeholder="0" />
                      </div>
                      <div className="w-full sm:w-32 flex items-center justify-end px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-900 text-sm">
                        $0.00
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-100" />

                {/* Método de pago y Total */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                  <div className="w-full lg:w-1/2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Método de pago <span className="text-red-500">*</span></label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white" required>
                      <option value="" disabled selected hidden>Seleccionar método</option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Tarjeta">Tarjeta</option>
                      <option value="Transferencia">Transferencia</option>
                    </select>
                  </div>

                  <div className="w-full lg:w-1/3 space-y-2 text-sm font-medium text-gray-600 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${calcularSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (16%)</span>
                      <span>${calcularIVA().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-green-600 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${calcularTotal().toFixed(2)} MXN</span>
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-white">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                Cancelar
              </button>
              <button type="submit" form="ventaForm" className="px-6 py-2.5 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                Registrar venta
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}