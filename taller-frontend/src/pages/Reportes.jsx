import React, { useState } from 'react';

export default function Reportes() {
  const [mes, setMes] = useState("Marzo 2026");
  const [ventas, setVentas] = useState("87,450.00");
  const [servicios, setServicios] = useState("215");

  const manejarGenerar = () => {
    alert("Conectando al servidor de San Jorge... Datos actualizados para " + mes);
    if (mes === "Febrero 2026") {
      setVentas("62,300.00");
      setServicios("180");
    } else {
      setVentas("94,120.00");
      setServicios("240");
    }
  };

  const cerrarSesion = () => {
    if(confirm("¿Estás seguro de que quieres salir?")) {
        window.location.href = "/";
    }
  };

  const exportarPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 text-left">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg no-print">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <span className="font-bold text-xl uppercase tracking-tighter">Panel Administrativo</span>
        </div>
        <div className="flex items-center gap-4 text-right">
          <span className="text-sm bg-blue-600 px-3 py-1 rounded-full font-bold uppercase">Admin</span>
          <button onClick={cerrarSesion} className="text-slate-400 hover:text-white transition cursor-pointer text-sm font-bold">Cerrar Sesión</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="text-left">
            <h1 className="text-4xl font-black text-slate-950">Reportes y Estadísticas</h1>
            <p className="text-slate-500 mt-1">Análisis de desempeño del Autoservicio San Jorge</p>
          </div>
          
          <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 no-print">
            <select 
              className="bg-transparent font-bold text-sm p-2 outline-none cursor-pointer text-blue-600"
              onChange={(e) => setMes(e.target.value)}
            >
                <option value="Marzo 2026">Marzo 2026</option>
                <option value="Febrero 2026">Febrero 2026</option>
            </select>
            <button 
                onClick={manejarGenerar}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-md shadow-blue-200"
            >
                Generar Reporte
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <p className="text-slate-400 font-bold text-xs uppercase mb-1">Ventas Mensuales</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">${ventas}</h3>
            <p className="text-green-500 font-bold text-sm mt-2">↑ +12% vs. mes anterior</p>
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 transition pointer-events-none">💰</div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <p className="text-slate-400 font-bold text-xs uppercase mb-1">Servicios Realizados</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{servicios}</h3>
            <p className="text-slate-500 font-bold text-sm mt-2">Afinación Integral</p>
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 transition pointer-events-none">🛠️</div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
            <p className="text-slate-400 font-bold text-xs uppercase mb-1">Stock Crítico</p>
            <h3 className="text-3xl font-black text-red-600 tracking-tight">8 Productos</h3>
            <p className="text-red-400 font-bold text-sm mt-2">Requiere pedido urgente</p>
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 transition pointer-events-none">⚠️</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h4 className="font-black text-slate-900 mb-8 uppercase text-sm tracking-widest">Ventas por Categoría</h4>
            <div className="flex items-end justify-between h-64 gap-4 px-4">
                <div className="w-full bg-blue-600 rounded-t-xl" style={{height: '90%'}}></div>
                <div className="w-full bg-blue-500 rounded-t-xl" style={{height: '70%'}}></div>
                <div className="w-full bg-blue-400 rounded-t-xl" style={{height: '55%'}}></div>
                <div className="w-full bg-blue-300 rounded-t-xl" style={{height: '40%'}}></div>
                <div className="w-full bg-blue-200 rounded-t-xl" style={{height: '25%'}}></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase">
                <span>Afinación</span> <span>Frenos</span> <span>Aceite</span> <span>Llantas</span> <span>Motor</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <h4 className="font-black text-slate-900 mb-8 uppercase text-sm tracking-widest">Últimos Servicios</h4>
            <div className="space-y-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="flex justify-between items-center p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-xl transition">
                        <div>
                            <p className="font-bold text-slate-800 text-sm">Mantenimiento Preventivo</p>
                            <p className="text-xs text-slate-400">ID: #00{i} • Mecánico: Juan Pérez</p>
                        </div>
                        <span className="bg-blue-50 text-blue-600 font-black text-xs px-3 py-1 rounded-full">$2,450</span>
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4 no-print">
            <button 
                onClick={exportarPDF}
                className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg cursor-pointer"
            >
                Exportar PDF
            </button>
            <button 
                onClick={() => alert("Generando reporte Excel...")}
                className="bg-white text-slate-600 px-8 py-3 rounded-2xl font-bold hover:bg-slate-50 transition shadow-sm border border-slate-200 cursor-pointer"
            >
                Descargar Excel
            </button>
        </div>
      </main>

      <style>{`
        @media print {
          .no-print { display: none ! alienation; }
          body { background: white; }
          .max-w-7xl { max-width: 100%; width: 100%; padding: 0; }
        }
      `}</style>
    </div>
  );
}
