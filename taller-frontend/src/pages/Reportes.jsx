import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import logo from '../assets/logg.png';

const carWatermark = "https://www.transparenttextures.com/patterns/stardust.png";

export default function Reportes() {
  const [rendimientoReal, setRendimientoReal] = useState([]);
  const [activeReportTab, setActiveReportTab] = useState('productos');
  const [datosVentas, setDatosVentas] = useState({ totalMonto: 0, totalCantidad: 0, historial: [] });

  useEffect(() => {
    fetch('http://localhost:3000/api/reportes/ventas')
      .then(res => res.json())
      .then(data => setDatosVentas(data))
      .catch(err => console.error("Error al conectar con el backend:", err));
  }, []);
useEffect(() => {
  fetch('http://localhost:3000/api/reportes/productos-rendimiento')
    .then(res => res.json())
    .then(data => setRendimientoReal(data))
    .catch(err => console.error("Error productos:", err));
}, []);

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
            Reporte de Ventas
          </button>
          <button 
            onClick={() => setActiveReportTab('servicios')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${activeReportTab === 'servicios' ? 'bg-[#1a56db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            Reporte de Servicios
          </button>
          <button 
            onClick={() => setActiveReportTab('productos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors ${activeReportTab === 'productos' ? 'bg-[#1a56db] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            Reporte de Productos
          </button>
        </div>

        {/* --- CONTENIDO DE PRODUCTOS --- */}
        {activeReportTab === 'productos' && (
          <div className="space-y-6 print:hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="text-blue-600 mb-4 font-semibold text-[11px] uppercase tracking-wider">Valor Inventario</div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">$5,354</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="text-green-500 mb-4 font-semibold text-[11px] uppercase tracking-wider">Productos Vendidos</div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">120</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-center shadow-sm">
                <div className="text-purple-600 mb-4 font-semibold text-[11px] uppercase tracking-wider">Ingresos Totales (BD)</div>
                <div className="text-[2rem] font-bold text-gray-900 leading-tight">${datosVentas.totalMonto.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Rendimiento de Productos</h3>
              <div className="space-y-8">
                {rendimientoProductos.map((prod) => (
                  <div key={prod.id}>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-[#1a56db] rounded-lg flex items-center justify-center font-bold">P</div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{prod.nombre}</h4>
                          <p className="text-xs text-gray-500">Stock: {prod.stock} unidades</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1a56db] text-sm">{prod.total}</div>
                        <div className="text-xs text-gray-500">{prod.ventas} ventas</div>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full bg-[#1a56db] rounded-full ${prod.progress}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CONTENIDO DE VENTAS --- */}
        {activeReportTab === 'ventas' && (
          <div className="space-y-6 print:hidden">
            <div className="flex gap-6">
              <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">Total Ventas (Base de Datos)</h3>
                <h2 className="text-3xl font-bold text-gray-900">${datosVentas.totalMonto.toLocaleString()}</h2>
              </div>
              <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase">Número de Ventas</h3>
                <h2 className="text-3xl font-bold text-gray-900">{datosVentas.totalCantidad}</h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="mb-6 font-bold text-lg text-gray-900">Historial Real</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">ID</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">FECHA</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">TOTAL</th>
                      <th className="pb-3 text-sm font-semibold text-gray-500 px-2">MÉTODO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosVentas.historial.map((v, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-2 text-sm font-medium text-gray-900">V-{v.idventa}</td>
                        <td className="py-4 px-2 text-sm text-gray-600">{new Date(v.fecha_venta).toLocaleDateString()}</td>
                        <td className="py-4 px-2 text-sm font-bold text-gray-900">${v.total}</td>
                        <td className="py-4 px-2 text-sm text-blue-600 font-bold uppercase">{v.metodo_pago}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTENIDO DE SERVICIOS (Gráfica de Pastel) --- */}
        {activeReportTab === 'servicios' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:hidden">
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm flex flex-col items-center">
              <h3 className="text-lg font-bold text-gray-900 w-full mb-8">Distribución de Servicios</h3>
              <div className="w-56 h-56 rounded-full" style={{ background: 'conic-gradient(#1A56DB 0% 26%, #a855f7 26% 41%, #f59e0b 41% 64%, #10b981 64% 100%)' }}></div>
              <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                <div className="flex items-center gap-2 text-xs font-bold"><span className="w-3 h-3 bg-[#1A56DB] rounded-full"></span> Afinación 26%</div>
                <div className="flex items-center gap-2 text-xs font-bold"><span className="w-3 h-3 bg-[#10b981] rounded-full"></span> Aceite 37%</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Servicios más solicitados</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2"><span>Cambio de aceite</span> <span>45 svcs</span></div>
                  <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-[#10b981] h-full rounded-full w-[85%]"></div></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- SECCIÓN DE IMPRESIÓN (PDF) --- */}
      <div className="hidden print:block p-10 bg-white">
        <div className="flex justify-between border-b-2 pb-4 mb-8">
          <img src={logo} alt="Logo" className="h-20" />
          <div className="text-right text-xs">
            <h2 className="font-bold text-lg">Auto Servicio San Jorge S.A. de C.V.</h2>
            <p>Reporte Oficial del Sistema</p>
            <p>Fecha: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <h1 className="text-2xl font-black text-center mb-8 uppercase">Reporte de {activeReportTab}</h1>
        <div className="p-4 bg-gray-100 rounded mb-6">
           <p className="font-bold">Total Reportado: ${datosVentas.totalMonto.toLocaleString()}</p>
           <p className="font-bold">Registros: {datosVentas.totalCantidad}</p>
        </div>
      </div>

    </AdminLayout>
  );
}