import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 text-left overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col h-full shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            {/* Logo de carro (placeholder simple) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677h3.351a.75.75 0 01.696.471z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">San Jorge</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest">Panel Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {/* Active Item */}
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Dashboard
          </button>

          {/* Other Items */}
          {[
            { icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5', label: 'Citas' },
            { icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677h3.351a.75.75 0 01.696.471z', label: 'Vehículos' },
            { icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75', label: 'Servicios' },
            { icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9', label: 'Productos' },
            { icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z', label: 'Ventas' },
            { icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z', label: 'Compras' },
            { icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z', label: 'Cotizaciones' },
            { icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z', label: 'Reportes' },
            { icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', label: 'Usuarios' },
            { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', label: 'Roles' },
          ].map((item, i) => (
             <button key={i} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-200 hover:bg-blue-800/50 hover:text-white font-medium text-sm transition-colors cursor-not-allowed">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 opacity-70">
                 <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
               </svg>
               {item.label}
             </button>
          ))}
        </nav>
        
        <div className="p-4 mt-auto">
           <button 
             onClick={() => navigate('/login')}
             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-200 hover:bg-red-800/50 hover:text-white font-medium text-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Cerrar sesión
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50/50">
        
        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="text-sm text-gray-500 font-medium">
            domingo, 22 de marzo de 2026
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h2>
            <p className="text-gray-500 text-sm">Análisis general del negocio</p>
          </div>

          {/* Tarjetas Superiores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Valor Inventario</span>
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$5354</div>
              <div className="text-xs text-gray-400">Total en productos</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Ventas</span>
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$1,318</div>
              <div className="text-xs font-medium text-green-500">+282% vs mes anterior</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Compras</span>
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" /></svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
              <div className="text-xs text-gray-400">Este mes</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ingresos Taller</span>
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-1.39-1.39m0 0l-3.9 3.9a2.38 2.38 0 01-3.32-3.32l3.9-3.9m0 0l-1.39-1.39m1.39 1.39L6.5 4.67M2.38 2.38a2.38 2.38 0 013.32 0l7.52 7.52m0 0l1.39-1.39" /></svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
              <div className="text-xs text-gray-400">Servicios realizados</div>
            </div>

          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Gráfica */}
            <div className="flex-[2] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Ventas por Mes (últimos 6 meses)</h3>
              <div className="flex gap-2 mb-8">
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium">Ventas</button>
                <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Inventario</button>
                <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Servicios</button>
              </div>
              
              {/* Fake Chart */}
              <div className="h-64 flex items-end justify-between px-2 gap-4 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-400 font-medium">
                  <span>800</span>
                  <span>600</span>
                  <span>400</span>
                  <span>200</span>
                  <span>0</span>
                </div>
                {/* Horizontal lines */}
                <div className="absolute left-10 right-0 top-0 bottom-6 flex flex-col justify-between">
                  <div className="border-b border-gray-100 border-dashed w-full h-[1px]"></div>
                  <div className="border-b border-gray-100 border-dashed w-full h-[1px]"></div>
                  <div className="border-b border-gray-100 border-dashed w-full h-[1px]"></div>
                  <div className="border-b border-gray-100 border-dashed w-full h-[1px]"></div>
                  <div className="border-b border-gray-200 w-full h-[1px]"></div>
                </div>

                {/* Bars */}
                <div className="ml-10 flex-1 flex items-end justify-between px-2 z-10 gap-2">
                  <div className="w-full flex-col flex items-center gap-2">
                    <div className="w-full bg-[#3B82F6] rounded-t-lg transition-all duration-500" style={{height: '15%'}}></div>
                    <span className="text-xs text-gray-500 font-medium">Oct 25</span>
                  </div>
                  <div className="w-full flex-col flex items-center gap-2">
                    <div className="w-full bg-[#3B82F6] rounded-t-lg transition-all duration-500" style={{height: '10%'}}></div>
                    <span className="text-xs text-gray-500 font-medium">Nov 25</span>
                  </div>
                  <div className="w-full flex-col flex items-center gap-2">
                    <div className="w-full bg-[#3B82F6] rounded-t-lg transition-all duration-500" style={{height: '20%'}}></div>
                    <span className="text-xs text-gray-500 font-medium">Dic 25</span>
                  </div>
                  <div className="w-full flex-col flex items-center gap-2">
                    <div className="w-full bg-[#3B82F6] rounded-t-lg transition-all duration-500" style={{height: '12%'}}></div>
                    <span className="text-xs text-gray-500 font-medium">Ene 26</span>
                  </div>
                  <div className="w-full flex-col flex items-center gap-2">
                    <div className="w-full bg-[#3B82F6] rounded-t-lg transition-all duration-500" style={{height: '25%'}}></div>
                    <span className="text-xs text-gray-500 font-medium">Feb 26</span>
                  </div>
                  <div className="w-full flex-col flex items-center gap-2">
                    <div className="w-full bg-[#3B82F6] rounded-t-lg transition-all duration-500" style={{height: '85%'}}></div>
                    <span className="text-xs text-gray-500 font-medium">Mar 26</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumen rápido */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Resumen rápido</h3>
              <div className="flex flex-col gap-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                  <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
                  <div className="text-xs font-medium text-gray-600">Citas pendientes</div>
                </div>
                <div className="bg-green-50/50 p-4 rounded-xl border border-green-50">
                  <div className="text-2xl font-bold text-green-600 mb-1">45</div>
                  <div className="text-xs font-medium text-gray-600">Productos en stock</div>
                </div>
                <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-50">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">8</div>
                  <div className="text-xs font-medium text-gray-600">Servicios completados</div>
                </div>
                <div className="bg-fuchsia-50/50 p-4 rounded-xl border border-fuchsia-50">
                  <div className="text-2xl font-bold text-fuchsia-600 mb-1">24</div>
                  <div className="text-xs font-medium text-gray-600">Vehículos registrados</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}

export default AdminDashboard;
