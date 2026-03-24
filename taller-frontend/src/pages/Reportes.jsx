import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import logo from '../assets/logg.png';

// For the background watermark
const carWatermark = "https://www.transparenttextures.com/patterns/stardust.png"; // Placeholder for an actual texture, since we can't load the real car easily without the asset. Wait, we can just use SVG or no background if we don't have the image.

export default function Reportes() {
  const [activeReportTab, setActiveReportTab] = useState('productos');

  // Datos simulados para Reporte de Ventas
  const dataVentas = [
    { id: "V-001", cliente: "Carlos Méndez", servicio: "Cambio de aceite", fecha: "2024-01-10", total: 1250, metodo: "efectivo" },
    { id: "V-002", cliente: "Ana López", servicio: "Alineación", fecha: "2024-01-11", total: 850, metodo: "tarjeta" },
    { id: "V-003", cliente: "Juan Pérez", servicio: "Frenos", fecha: "2024-01-12", total: 3200, metodo: "transferencia" }
  ];

  // Datos simulados para Rendimiento de Productos
  const rendimientoProductos = [
    { id: 1, nombre: "Aceite sintético", stock: 24, total: "$11,250", ventas: 45, progress: "w-[40%]" },
    { id: 2, nombre: "Filtros", stock: 45, total: "$4560", ventas: 38, progress: "w-[30%]" },
    { id: 3, nombre: "Bujías", stock: 18, total: "$8800", ventas: 22, progress: "w-[20%]" },
    { id: 4, nombre: "Pastillas freno", stock: 8, total: "$9750", ventas: 15, progress: "w-[15%]" }
  ];

  return (
    <AdminLayout activeTab="reportes">
      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Reportes</h1>
            <p className="text-gray-500 text-sm">Análisis general del negocio</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="bg-[#1a56db] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors flex items-center gap-2 print:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Exportar reportes
          </button>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-xl border border-gray-100 p-2 flex gap-2 mb-8 shadow-sm print:hidden">
          <button 
            onClick={() => setActiveReportTab('ventas')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${activeReportTab === 'ventas' ? 'bg-[#1a56db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            Reporte de Ventas
          </button>
          
          <button 
            onClick={() => setActiveReportTab('servicios')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${activeReportTab === 'servicios' ? 'bg-[#1a56db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.217-.266.154-.657-.14-.803l-1.071-.536c-.286-.143-.604-.045-.769.215l-1.574 2.443-1.421-1.421 2.443-1.574c.26-.165.358-.483.215-.769l-.536-1.071c-.146-.294-.537-.357-.803-.14l-3.053 2.492M11.42 15.17l-3.218 3.218A2.652 2.652 0 012.25 15.17l3.218-3.218" />
            </svg>
            Reporte de Servicios
          </button>
          
          <button 
            onClick={() => setActiveReportTab('productos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${activeReportTab === 'productos' ? 'bg-[#1a56db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            Reporte de Productos
          </button>
        </div>

        {/* --- CONTENIDO DE LAS PESTAÑAS --- */}

        {/* PESTAÑA PRODUCTOS (Basada en Screenshot) */}
        {activeReportTab === 'productos' && (
          <div className="space-y-6 print:hidden">
            {/* Top Stat Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Valor Inventario */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 mb-4 font-semibold text-[11px] uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
                  Valor Inventario
                </div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">$5,354</div>
                <div className="text-sm text-gray-500 mt-1">Total en productos</div>
              </div>

              {/* Productos Vendidos */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="flex items-center gap-2 text-green-500 mb-4 font-semibold text-[11px] uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  Productos Vendidos
                </div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">120</div>
                <div className="text-sm text-gray-500 mt-1">Unidades este mes</div>
              </div>

              {/* Ingresos por Productos */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 mb-4 font-semibold text-[11px] uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                  Ingresos por Productos
                </div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">$34,360</div>
                <div className="text-sm text-green-500 mt-1 font-medium">Total generado</div>
              </div>
            </div>

            {/* Rendimiento de Productos List */}
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Rendimiento de Productos</h3>
              
              <div className="space-y-8">
                {rendimientoProductos.map((prod) => (
                  <div key={prod.id}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-[#1a56db] rounded-lg flex items-center justify-center shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{prod.nombre}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">Stock: {prod.stock} unidades</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1a56db] text-sm">{prod.total}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{prod.ventas} ventas</div>
                      </div>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-[#1a56db] rounded-full ${prod.progress}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA VENTAS (Adaptado de ReporteDeVentas.jsx) */}
        {activeReportTab === 'ventas' && (
          <div className="space-y-6 print:hidden">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
               <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Fecha inicio</label>
                  <input type="date" className="w-full border border-gray-300 p-2.5 rounded-lg text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Fecha fin</label>
                  <input type="date" className="w-full border border-gray-300 p-2.5 rounded-lg text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Cliente</label>
                  <select className="w-full border border-gray-300 p-2.5 rounded-lg text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Todos los clientes</option>
                  </select>
               </div>
               <div className="flex items-end">
                  <button className="w-full bg-[#1a56db] text-white p-2.5 rounded-lg text-sm font-bold hover:bg-blue-800 transition-colors">
                    Generar Reporte
                  </button>
               </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Total Ventas</h3>
                <h2 className="text-3xl font-bold text-gray-900">${dataVentas.reduce((acc, v) => acc + v.total, 0)}</h2>
              </div>
              <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Número Ventas</h3>
                <h2 className="text-3xl font-bold text-gray-900">{dataVentas.length}</h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="mb-6 font-bold text-lg text-gray-900">Historial de Ventas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">ID</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">Cliente</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">Servicio</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">Fecha</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">Total</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">Método</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataVentas.map((v) => (
                      <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-2 text-sm font-medium text-gray-900">{v.id}</td>
                        <td className="py-4 px-2 text-sm text-gray-600">{v.cliente}</td>
                        <td className="py-4 px-2 text-sm text-gray-600">{v.servicio}</td>
                        <td className="py-4 px-2 text-sm text-gray-600">{v.fecha}</td>
                        <td className="py-4 px-2 text-sm font-medium text-gray-900">${v.total}</td>
                        <td className="py-4 px-2">
                          <span
                            className={`px-3 py-1 text-white font-semibold rounded-full text-xs uppercase tracking-wide flex w-max ${
                              v.metodo === "efectivo"
                                ? "bg-green-500"
                                : v.metodo === "tarjeta"
                                ? "bg-[#1a56db]"
                                : "bg-purple-500"
                            }`}
                          >
                            {v.metodo}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA SERVICIOS (Basada en Screenshot) */}
        {activeReportTab === 'servicios' && (
          <div className="space-y-6 print:hidden">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Servicios Realizados */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 mb-4 font-semibold text-[11px] uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.492-3.053c.217-.266.154-.657-.14-.803l-1.071-.536c-.286-.143-.604-.045-.769.215l-1.574 2.443-1.421-1.421 2.443-1.574c.26-.165.358-.483.215-.769l-.536-1.071c-.146-.294-.537-.357-.803-.14l-3.053 2.492M11.42 15.17l-3.218 3.218A2.652 2.652 0 012.25 15.17l3.218-3.218" />
                  </svg>
                  Servicios Realizados
                </div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">123</div>
                <div className="text-sm text-gray-500 mt-1">Total histórico</div>
              </div>

              {/* Ingresos por Servicios */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="flex items-center gap-2 text-green-500 mb-4 font-semibold text-[11px] uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  Ingresos por Servicios
                </div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">$188,270</div>
                <div className="text-sm text-green-500 mt-1 font-medium">Total generado</div>
              </div>

              {/* Promedio por Servicio */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="flex items-center gap-2 text-purple-600 mb-4 font-semibold text-[11px] uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.25 2.25 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  Promedio por Servicio
                </div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">$1,531</div>
                <div className="text-sm text-gray-500 mt-1">Ticket promedio</div>
              </div>
            </div>

            {/* Graphics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Distribución de Servicios (Pie Chart) */}
              <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm flex flex-col items-center">
                <h3 className="text-lg font-bold text-gray-900 w-full mb-8">Distribución de Servicios</h3>
                <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
                  
                  {/* The actual pie chart */}
                  <div 
                    className="w-56 h-56 rounded-full"
                    style={{
                      background: 'conic-gradient(#1A56DB 0% 26%, #a855f7 26% 41%, #f59e0b 41% 64%, #10b981 64% 100%)'
                    }}
                  ></div>
                  
                  {/* Inner white circle for donut effect, optional but good. Let's make it a pie, so leave as is */}
                  <div className="absolute w-[3px] h-full bg-white rotate-[-4deg]"></div>
                  <div className="absolute w-[3px] h-full bg-white rotate-[80deg]"></div>
                  
                  {/* Labels floating around */}
                  <div className="absolute top-10 right-4 text-sm font-semibold text-[#1A56DB]">Afinación básica 26%</div>
                  <div className="absolute bottom-10 -right-2 text-sm font-semibold text-[#a855f7]">Afinación integral 15%</div>
                  <div className="absolute bottom-0 left-12 text-sm font-semibold text-[#f59e0b]">Frenos 23%</div>
                  <div className="absolute top-1/2 -left-8 -translate-y-1/2 text-sm font-semibold text-[#10b981] whitespace-nowrap">Cambio de aceite 37%</div>
                </div>
              </div>

              {/* Servicios más solicitados (Progress Bars) */}
              <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-8">Servicios más solicitados</h3>
                
                <div className="space-y-6">
                  {/* Bar 1 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Afinación básica</span>
                      <span className="text-gray-500">32 servicios</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#1A56DB] h-full rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  {/* Bar 2 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Cambio de aceite</span>
                      <span className="text-gray-500">45 servicios</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#10b981] h-full rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  {/* Bar 3 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Frenos</span>
                      <span className="text-gray-500">28 servicios</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#f59e0b] h-full rounded-full" style={{width: '50%'}}></div>
                    </div>
                  </div>
                  {/* Bar 4 */}
                  <div>
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>Afinación integral</span>
                      <span className="text-gray-500">18 servicios</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#a855f7] h-full rounded-full" style={{width: '30%'}}></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Export Bottom Panel */}
            <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm border border-blue-50 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Exportar reportes</h3>
                  <p className="text-sm text-gray-500">Descarga los reportes en diferentes formatos para el análisis externo</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 md:flex-none border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
                >
                  Exportar PDF
                </button>
                <button 
                  onClick={() => alert("Simulando exportación a Excel...")}
                  className="flex-1 md:flex-none border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
                >
                  Exportar Excel
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* HIDDEN PRINT VERSIONS (Only visible when printing) */}
      <div className="hidden print:block w-full bg-[#faf9f5] min-h-screen text-black">
        <style>{`
          @media print {
            body { 
              background-color: #fcfbf8 !important; 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              font-family: Arial, Helvetica, sans-serif;
            }
            @page { margin: 1cm; }
            .print\\:hidden { display: none !important; }
            aside { display: none !important; }
            header { display: none !important; }
          }
        `}</style>
        
        {/* PRINTABLE HEADER (Shared) */}
        <div className="flex justify-between items-start pt-8 pb-6 border-b-2 border-gray-200">
          <div>
            <img src={logo} alt="San Jorge Logo" className="h-28 object-contain -ml-4" />
          </div>
          <div className="text-right text-sm">
            <h3 className="font-black text-lg">Auto Servicio San Jorge S.A. de C.V.</h3>
            <p>Calle 10, No. 505, Col. Centro,</p>
            <p>San Jorge, Mexico</p>
            <p>Teléfono: +52 1 234 567 890</p>
            <p>www.autoserviciosanjorge.com</p>
          </div>
        </div>

        {/* PRINT CONTENT: VENTAS */}
        {activeReportTab === 'ventas' && (
          <div className="mt-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black tracking-tight mb-1">REPORTE DE VENTAS</h2>
              <p className="text-gray-700 font-medium">Historial de Ventas - Detalle Completo (Enero 2024)</p>
              <p className="text-gray-600 text-sm mt-1">Fecha generación: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 mb-6 relative z-10">
              <p className="font-bold text-lg">Total de Ventas (Enero): <span className="font-normal text-gray-800">${dataVentas.reduce((acc, v) => acc + v.total, 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</span></p>
              <p className="font-bold text-lg">Número de Ventas: <span className="font-normal text-gray-800">{dataVentas.length}</span></p>
            </div>

            <table className="w-full text-center border-collapse border border-gray-300 bg-white">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-3 border border-gray-300 font-bold uppercase text-sm">ID VENTA</th>
                  <th className="p-3 border border-gray-300 font-bold uppercase text-sm">CLIENTE</th>
                  <th className="p-3 border border-gray-300 font-bold uppercase text-sm">SERVICIO</th>
                  <th className="p-3 border border-gray-300 font-bold uppercase text-sm">FECHA</th>
                  <th className="p-3 border border-gray-300 font-bold uppercase text-sm">TOTAL</th>
                  <th className="p-3 border border-gray-300 font-bold uppercase text-sm">MÉTODO DE PAGO</th>
                </tr>
              </thead>
              <tbody>
                {dataVentas.map((v, i) => (
                  <tr key={v.id} className="border-b border-gray-300 odd:bg-[#f6fcf8] even:bg-white">
                    <td className="p-3 border border-gray-300 text-sm font-medium">{v.id}</td>
                    <td className="p-3 border border-gray-300 text-sm">{v.cliente}</td>
                    <td className="p-3 border border-gray-300 text-sm">{v.servicio}</td>
                    <td className="p-3 border border-gray-300 text-sm">{v.fecha}</td>
                    <td className="p-3 border border-gray-300 text-sm">${v.total.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                    <td className="p-3 border border-gray-300">
                      <div className={`px-2 py-1 mx-auto w-max rounded-full text-xs font-bold border ${v.metodo === 'efectivo' ? 'bg-[#d1fae5] text-[#059669] border-[#a7f3d0]' : v.metodo === 'tarjeta' ? 'bg-[#dbeafe] text-[#2563eb] border-[#bfdbfe]' : 'bg-[#f3e8ff] text-[#9333ea] border-[#e9d5ff]'}`}>
                        {v.metodo === 'efectivo' && '💵 Efectivo'}
                        {v.metodo === 'tarjeta' && '💳 Tarjeta'}
                        {v.metodo === 'transferencia' && '🏦 Transferencia'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-12 flex justify-between text-sm font-bold text-gray-600 border-t pt-4">
              <p>Página 1 de 1</p>
              <p>Total de ventas mostradas en esta página: {dataVentas.length} de {dataVentas.length}</p>
            </div>
          </div>
        )}

        {/* PRINT CONTENT: INVENTARIO */}
        {activeReportTab === 'productos' && (
          <div className="mt-8 relative">
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-black tracking-tight mb-1">REPORTE DE INVENTARIO</h2>
              <p className="text-gray-700 font-medium">Inventario Actual del Taller - Detalle Completo</p>
            </div>

            <div className="mb-6 relative z-10 text-sm font-bold border-b-2 border-gray-200 pb-2">
              <p>Filtros Aplicados: <span className="font-normal text-gray-800">Ninguno - Inventario General Completo</span></p>
              <p>Fecha de Generación: <span className="font-normal text-gray-800">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
            </div>

            <table className="w-full text-center border-collapse bg-white relative z-10">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-t-2 border-gray-200">
                  <th className="p-4 font-bold uppercase text-xs">ID PRODUCTO</th>
                  <th className="p-4 font-bold uppercase text-xs text-left">NOMBRE</th>
                  <th className="p-4 font-bold uppercase text-xs">CATEGORÍA</th>
                  <th className="p-4 font-bold uppercase text-xs">STOCK ACTUAL</th>
                  <th className="p-4 font-bold uppercase text-xs">STOCK MÍNIMO</th>
                  <th className="p-4 font-bold uppercase text-xs">ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {rendimientoProductos.map((prod, i) => (
                  <tr key={prod.id} className="border-b border-gray-200 odd:bg-[#f8f9fa] even:bg-white">
                    <td className="p-4 text-sm font-medium text-gray-600">PRD-00{prod.id}</td>
                    <td className="p-4 text-sm text-left font-medium">{prod.nombre}</td>
                    <td className="p-4 text-sm text-gray-600">Autopartes</td>
                    <td className="p-4 font-black">{prod.stock}</td>
                    <td className="p-4 text-sm text-gray-500">10</td>
                    <td className="p-4">
                      {prod.stock > 15 ? (
                        <div className="px-3 py-1 bg-[#d1fae5] text-[#065f46] font-bold text-xs rounded-full inline-block">Disponible</div>
                      ) : prod.stock > 8 ? (
                        <div className="px-3 py-1 bg-[#ffedd5] text-[#9a3412] font-bold text-xs rounded-full inline-block">Stock Bajo</div>
                      ) : (
                        <div className="px-3 py-1 bg-[#fee2e2] text-[#991b1b] font-bold text-xs rounded-full inline-block">Crítico</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-12 flex justify-between text-sm font-bold text-gray-600 border-t-2 pt-4">
              <p>Total de productos listados: {rendimientoProductos.length} de {rendimientoProductos.length}</p>
              <p>Página 1 de 1</p>
            </div>
          </div>
        )}

        {/* PRINT CONTENT: SERVICIOS */}
        {activeReportTab === 'servicios' && (
          <div className="mt-8 relative">
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl font-black tracking-tight mb-1">REPORTE DE SERVICIOS</h2>
              <p className="text-gray-700 font-medium">Análisis de Desempeño y Métrica de Servicios (Enero 2024)</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 relative z-10 text-center">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                 <p className="text-gray-500 text-sm font-bold uppercase mb-2">Servicios Realizados</p>
                 <p className="text-4xl font-black text-blue-600">123</p>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                 <p className="text-gray-500 text-sm font-bold uppercase mb-2">Ingresos por Servicios</p>
                 <p className="text-4xl font-black text-[#10b981]">$188,270</p>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                 <p className="text-gray-500 text-sm font-bold uppercase mb-2">Ticket Promedio</p>
                 <p className="text-4xl font-black text-[#a855f7]">$1,531</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
               <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-center border-b pb-2 mb-4">DISTRIBUCIÓN DE SERVICIOS</h3>
                  <ul className="space-y-3 font-semibold text-gray-800">
                    <li className="flex justify-between items-center"><span className="text-[#1A56DB]">Afinación básica</span> <span>26%</span></li>
                    <li className="flex justify-between items-center"><span className="text-[#a855f7]">Afinación integral</span> <span>15%</span></li>
                    <li className="flex justify-between items-center"><span className="text-[#f59e0b]">Frenos</span> <span>23%</span></li>
                    <li className="flex justify-between items-center"><span className="text-[#10b981]">Cambio de aceite</span> <span>37%</span></li>
                  </ul>
               </div>
               <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-center border-b pb-2 mb-4">SERVICIOS MÁS SOLICITADOS</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b"><td className="py-2.5 font-medium">Cambio de aceite</td><td className="text-right font-black text-[#10b981]">45 svcs</td></tr>
                      <tr className="border-b"><td className="py-2.5 font-medium">Afinación básica</td><td className="text-right font-black text-[#1A56DB]">32 svcs</td></tr>
                      <tr className="border-b"><td className="py-2.5 font-medium">Frenos</td><td className="text-right font-black text-[#f59e0b]">28 svcs</td></tr>
                      <tr><td className="py-2.5 font-medium">Afinación integral</td><td className="text-right font-black text-[#a855f7]">18 svcs</td></tr>
                    </tbody>
                  </table>
               </div>
            </div>

            <div className="mt-12 flex justify-between text-sm font-bold text-gray-600 border-t-2 pt-4">
              <p>Generado electrónicamente desde San Jorge Admin</p>
              <p>Página 1 de 1</p>
            </div>
          </div>
        )}
        
      </div>

    </AdminLayout>
  );
}
