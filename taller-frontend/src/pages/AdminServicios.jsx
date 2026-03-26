import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminServicios() {
  const [servicios, setServicios] = useState([
    {
      id: 1,
      nombre: 'Cambio de aceite y filtro',
      categoria: 'Mantenimiento preventivo',
      manoObra: 450,
      refacciones: 400,
      tiempoEstimado: '1 hora',
      vecesRealizado: 45,
      ingresosGenerados: 38250
    },
    {
      id: 2,
      nombre: 'Afinación básica',
      categoria: 'Afinación',
      manoObra: 650,
      refacciones: 890,
      tiempoEstimado: '2-3 horas',
      vecesRealizado: 32,
      ingresosGenerados: 49280
    },
    {
      id: 3,
      nombre: 'Servicio de frenos básico',
      categoria: 'Frenos',
      manoObra: 800,
      refacciones: 1000,
      tiempoEstimado: '2-3 horas',
      vecesRealizado: 28,
      ingresosGenerados: 50400
    }
  ]);

  const [nuevo, setNuevo] = useState({
    id: null,
    nombre: '',
    categoria: '',
    manoObra: '',
    tiempoEstimado: '',
    descripcion: ''
  });

  const [editando, setEditando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState('Todas las categorías');

  const categorias = ['Todas las categorías', 'Mantenimiento preventivo', 'Afinación', 'Frenos'];

  const serviciosFiltrados = categoriaActiva === 'Todas las categorías' 
    ? servicios 
    : servicios.filter(s => s.categoria === categoriaActiva);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (editando) {
      setServicios(servicios.map(s => s.id === nuevo.id ? {
        ...s,
        nombre: nuevo.nombre,
        categoria: nuevo.categoria,
        manoObra: Number(nuevo.manoObra),
        tiempoEstimado: nuevo.tiempoEstimado,
        // Mantener las refacciones existentes si estamos editando, o 0
        refacciones: s.refacciones || 0
      } : s));
      setEditando(false);
    } else {
      setServicios([...servicios, {
        id: Date.now(),
        nombre: nuevo.nombre,
        categoria: nuevo.categoria,
        manoObra: Number(nuevo.manoObra),
        refacciones: 0, // Como se quitó el campo, asumimos 0 por defecto
        tiempoEstimado: nuevo.tiempoEstimado,
        vecesRealizado: 0,
        ingresosGenerados: 0
      }]);
    }
    cerrarModal();
  };

  const prepararEdicion = (s) => {
    setNuevo({
      id: s.id,
      nombre: s.nombre,
      categoria: s.categoria,
      manoObra: s.manoObra,
      tiempoEstimado: s.tiempoEstimado,
      descripcion: '' // No lo guardamos en el mock, pero se limpia aquí
    });
    setEditando(true);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditando(false);
    setNuevo({
      id: null,
      nombre: '',
      categoria: '',
      manoObra: '',
      tiempoEstimado: '',
      descripcion: ''
    });
  };

  const totalActivos = servicios.length;
  const totalRealizados = servicios.reduce((acc, s) => acc + s.vecesRealizado, 0);
  const ingresosTotales = servicios.reduce((acc, s) => acc + s.ingresosGenerados, 0);
  const precioPromedio = servicios.length > 0 
    ? Math.round(servicios.reduce((acc, s) => acc + (s.manoObra + (s.refacciones || 0)), 0) / servicios.length) 
    : 0;

  const getBadgeColor = (categoria) => {
    switch(categoria) {
      case 'Mantenimiento preventivo': return 'bg-purple-100 text-purple-700';
      case 'Afinación': return 'bg-purple-100 text-purple-700';
      case 'Frenos': return 'bg-purple-100 text-purple-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <AdminLayout activeTab="servicios">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Gestión de Servicios</h2>
            <p className="text-gray-500 text-sm">Administra el catálogo de servicios y precios</p>
          </div>
          <button 
            type="button" 
            onClick={() => { cerrarModal(); setShowModal(true); }} 
            className="bg-[#1a56db] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Nuevo servicio
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600">{totalActivos}</span>
            <span className="text-sm text-gray-500 mt-2">Servicios activos</span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600">{totalRealizados}</span>
            <span className="text-sm text-gray-500 mt-2">Servicios realizados</span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600">${ingresosTotales.toLocaleString()}</span>
            <span className="text-sm text-gray-500 mt-2">Ingresos totales</span>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-medium text-blue-600">${precioPromedio.toLocaleString()}</span>
            <span className="text-sm text-gray-500 mt-2">Precio promedio</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-6 overflow-x-auto">
          {categorias.map(cat => (
            <button 
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                categoriaActiva === cat 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content List */}
        <div className="space-y-4">
          {serviciosFiltrados.map(s => {
            const precioTotal = s.manoObra + (s.refacciones || 0);

            return (
              <div key={s.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative flex flex-col">
                <button onClick={() => prepararEdicion(s)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
                
                {/* Upper Section */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-1.42-1.42m1.42 1.42l-5.83-5.83A2.652 2.652 0 116.75 3l5.83 5.83m-1.42-1.42l1.42-1.42" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{s.nombre}</h3>
                    <div className="mt-1.5 inline-block">
                      <span className={`px-2.5 py-1 ${getBadgeColor(s.categoria)} rounded text-[11px] font-semibold tracking-wide`}>
                        {s.categoria}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-medium">Mano de obra</div>
                    <div className="text-gray-900 font-medium">${s.manoObra}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-medium">Refacciones</div>
                    <div className="text-gray-900 font-medium">${s.refacciones || 0}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-medium">Precio total</div>
                    <div className="text-blue-600 font-bold">${precioTotal}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-medium">Tiempo estimado</div>
                    <div className="text-gray-900 font-medium">{s.tiempoEstimado}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-medium">Veces realizado</div>
                    <div className="flex items-center gap-1.5 text-gray-900 font-medium">
                      <span className="text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                      </span>
                      {s.vecesRealizado}
                    </div>
                  </div>
                </div>

                {/* Footer of the card */}
                <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
                  <div className="text-xs text-gray-500 w-full md:w-auto">
                    Ingresos generados: <strong className="text-gray-900 font-semibold ml-1">${s.ingresosGenerados.toLocaleString()}</strong>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto justify-end">
                    <button onClick={() => {
                      const newPrice = window.prompt(`Ingresa el nuevo precio (Mano de obra) para ${s.nombre}:`, s.manoObra);
                      if (newPrice !== null && !isNaN(newPrice) && newPrice.trim() !== '') {
                        setServicios(servicios.map(serv => serv.id === s.id ? { ...serv, manoObra: Number(newPrice) } : serv));
                      }
                    }} className="bg-[#1a56db] text-white px-4 py-2 rounded-lg font-medium text-xs hover:bg-blue-800 transition-colors w-full md:w-auto text-center">
                      Actualizar precios
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-xs hover:bg-gray-200 transition-colors w-full md:w-auto text-center">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col my-8">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-1.42-1.42m1.42 1.42l-5.83-5.83A2.652 2.652 0 116.75 3l5.83 5.83m-1.42-1.42l1.42-1.42" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{editando ? 'Editar servicio' : 'Nuevo servicio'}</h2>
              </div>
              <button type="button" onClick={cerrarModal} className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form id="servicioForm" onSubmit={manejarEnvio} className="space-y-5">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre del servicio <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required
                    value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} placeholder="Cambio de aceite y filtro" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Categoría <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium appearance-none" required
                      value={nuevo.categoria} onChange={e => setNuevo({...nuevo, categoria: e.target.value})}>
                      <option value="" disabled hidden>Seleccionar categoría</option>
                      {categorias.filter(c => c !== 'Todas las categorías').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {/* MODIFIED: Removed 'Refacciones estimadas' field as requested */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mano de obra (MXN) <span className="text-red-500">*</span></label>
                    <input type="number" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required
                      value={nuevo.manoObra} onChange={e => setNuevo({...nuevo, manoObra: e.target.value})} placeholder="450" min="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tiempo estimado <span className="text-red-500">*</span></label>
                    <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" required
                      value={nuevo.tiempoEstimado} onChange={e => setNuevo({...nuevo, tiempoEstimado: e.target.value})} placeholder="1-2 horas" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Descripción (opcional)</label>
                  <textarea className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3"
                    value={nuevo.descripcion} onChange={e => setNuevo({...nuevo, descripcion: e.target.value})} placeholder="Breve descripción del servicio..."></textarea>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 bg-white">
              <div className="flex items-center gap-2 bg-blue-50/50 px-4 py-2 rounded-lg w-full sm:w-auto justify-between sm:justify-start border border-blue-50">
                <span className="text-sm font-semibold text-gray-700">Precio total estimado</span>
                {/* Ahora el precio total es solo la mano de obra ya que no hay refacciones */}
                <span className="text-lg font-bold text-[#1a56db]">${nuevo.manoObra ? Number(nuevo.manoObra).toLocaleString() : '0'} MXN</span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto min-w-max">
                <button type="button" onClick={cerrarModal} className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                  Cancelar
                </button>
                <button type="submit" form="servicioForm" className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-white bg-[#1a56db] hover:bg-blue-800 rounded-lg transition-colors">
                  {editando ? 'Guardar cambios' : 'Agregar servicio'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}
