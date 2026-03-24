import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([
    {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      año: '2020',
      placa: 'ABC-123-XYZ',
      vin: '1HGBH41JXMN109186',
      color: 'Blanco',
      motor: '4 cilindros',
      kilometraje: '45,230',
      ultimoServicio: '14/2/2026',
      propietario: {
        nombre: 'María González',
        correo: 'maria@email.com',
        telefono: '555-123-4567'
      }
    },
    {
      id: 2,
      marca: 'Honda',
      modelo: 'Civic',
      año: '2019',
      placa: 'XYZ-789-ABC',
      vin: '2HGBH41JXMN109187',
      color: 'Negro',
      motor: '4 cilindros',
      kilometraje: '38,500',
      ultimoServicio: '28/2/2026',
      propietario: {
        nombre: 'Pedro Martínez',
        correo: 'pedro@email.com',
        telefono: '555-987-6543'
      }
    },
    {
      id: 3,
      marca: 'Nissan',
      modelo: 'Sentra',
      año: '2021',
      placa: 'DEF-456-GHI',
      vin: '3HGBH41JXMN109188',
      color: 'Gris',
      motor: '4 cilindros',
      kilometraje: '22,100',
      ultimoServicio: '19/1/2026',
      propietario: {
        nombre: 'Ana López',
        correo: 'ana@email.com',
        telefono: '555-456-7890'
      }
    }
  ]);

  const [nuevo, setNuevo] = useState({
    id: null,
    marca: '',
    modelo: '',
    año: '',
    placa: '',
    vin: '',
    color: '',
    motor: '',
    kilometraje: '',
    propietarioNombre: '',
    propietarioCorreo: '',
    propietarioTelefono: ''
  });

  const [editando, setEditando] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [showModal, setShowModal] = useState(false);

  const vehiculosFiltrados = vehiculos.filter(v => {
    const terminoBusqueda = busqueda.toLowerCase();
    return (
      v.marca.toLowerCase().includes(terminoBusqueda) ||
      v.modelo.toLowerCase().includes(terminoBusqueda) ||
      v.placa.toLowerCase().includes(terminoBusqueda) ||
      v.propietario.nombre.toLowerCase().includes(terminoBusqueda)
    );
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (editando) {
      setVehiculos(vehiculos.map(v => v.id === nuevo.id ? {
        ...nuevo,
        ultimoServicio: v.ultimoServicio, // Keep existing service date
        propietario: {
          nombre: nuevo.propietarioNombre,
          correo: nuevo.propietarioCorreo,
          telefono: nuevo.propietarioTelefono
        }
      } : v));
      setEditando(false);
    } else {
      const fechaActual = new Date();
      setVehiculos([...vehiculos, {
        id: Date.now(),
        marca: nuevo.marca,
        modelo: nuevo.modelo,
        año: nuevo.año,
        placa: nuevo.placa,
        vin: nuevo.vin,
        color: nuevo.color,
        motor: nuevo.motor,
        kilometraje: nuevo.kilometraje,
        ultimoServicio: `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`,
        propietario: {
          nombre: nuevo.propietarioNombre,
          correo: nuevo.propietarioCorreo,
          telefono: nuevo.propietarioTelefono
        }
      }]);
    }
    cerrarModal();
  };

  const prepararEdicion = (v) => {
    setNuevo({
      id: v.id,
      marca: v.marca,
      modelo: v.modelo,
      año: v.año,
      placa: v.placa,
      vin: v.vin,
      color: v.color,
      motor: v.motor || '',
      kilometraje: v.kilometraje,
      propietarioNombre: v.propietario.nombre,
      propietarioCorreo: v.propietario.correo,
      propietarioTelefono: v.propietario.telefono
    });
    setEditando(true);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEditando(false);
    setNuevo({
      id: null,
      marca: '',
      modelo: '',
      año: '',
      placa: '',
      vin: '',
      color: '',
      motor: '',
      kilometraje: '',
      propietarioNombre: '',
      propietarioCorreo: '',
      propietarioTelefono: ''
    });
  };

  return (
    <AdminLayout activeTab="vehiculos">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Gestión de Vehículos</h2>
            <p className="text-gray-500 text-sm">Administra los vehículos y sus propietarios</p>
          </div>
          <button 
            type="button" 
            onClick={() => { cerrarModal(); setShowModal(true); }} 
            className="bg-[#1a56db] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Registrar vehiculo
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 shadow-sm"
            placeholder="Buscar por marca, modelo, placa o propietario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehiculosFiltrados.map(v => (
            <div key={v.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              
              {/* Card Header (Blue) */}
              <div className="bg-[#1a56db] p-5 text-white relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677h3.351a.75.75 0 01.696.471z" />
                    </svg>
                  </div>
                  <div className="flex gap-2 text-white/80">
                    <button onClick={() => prepararEdicion(v)} className="hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button className="hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{v.marca} {v.modelo}</h3>
                <p className="text-blue-100 text-sm mt-1">{v.año}</p>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Placa</span>
                    <span className="font-medium text-gray-900 text-sm">{v.placa}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">VIN</span>
                    <span className="font-medium text-gray-900 text-[11px] truncate max-w-[150px]">{v.vin}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Color</span>
                    <span className="font-medium text-gray-900 text-sm">{v.color}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-gray-50/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Kilometraje</span>
                    <span className="font-medium text-gray-900 text-sm">{v.kilometraje} km</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 pb-0">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Último servicio</span>
                    <span className="font-medium text-gray-900 text-sm">{v.ultimoServicio}</span>
                  </div>
                </div>
                
                {/* Owner info */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{v.propietario.nombre}</span>
                    <span className="text-xs text-gray-500">{v.propietario.correo}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 flex gap-3">
                  <button className="flex-1 bg-[#1a56db] text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                    Ver historial
                  </button>
                  <button onClick={() => prepararEdicion(v)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677h3.351a.75.75 0 01.696.471z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{editando ? 'Editar vehículo' : 'Registrar nuevo vehículo'}</h2>
              </div>
              <button type="button" onClick={cerrarModal} className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form id="vehiculoForm" onSubmit={manejarEnvio} className="space-y-6">
                
                {/* Información del vehículo section */}
                <div>
                  <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Información del vehículo
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Marca <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.marca} onChange={e => setNuevo({...nuevo, marca: e.target.value})} placeholder="Toyota, Honda, Nissan..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Modelo <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.modelo} onChange={e => setNuevo({...nuevo, modelo: e.target.value})} placeholder="Corolla, Civic, Sentra..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Año <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.año} onChange={e => setNuevo({...nuevo, año: e.target.value})} placeholder="2020" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Placa <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.placa} onChange={e => setNuevo({...nuevo, placa: e.target.value})} placeholder="ABC-123-XYZ" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">VIN (Número de serie) <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.vin} onChange={e => setNuevo({...nuevo, vin: e.target.value})} placeholder="1HGBH41JXMN109186" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Color <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.color} onChange={e => setNuevo({...nuevo, color: e.target.value})} placeholder="Blanco, Negro, Gris..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Motor <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.motor} onChange={e => setNuevo({...nuevo, motor: e.target.value})} placeholder="4 cilindros, V6, V8..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kilometraje actual <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.kilometraje} onChange={e => setNuevo({...nuevo, kilometraje: e.target.value})} placeholder="45,230" />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Información del propietario section */}
                <div>
                  <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Información del propietario
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre completo <span className="text-red-500">*</span></label>
                      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.propietarioNombre} onChange={e => setNuevo({...nuevo, propietarioNombre: e.target.value})} placeholder="Juan Pérez García" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correo electrónico <span className="text-red-500">*</span></label>
                      <input type="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.propietarioCorreo} onChange={e => setNuevo({...nuevo, propietarioCorreo: e.target.value})} placeholder="juan@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teléfono <span className="text-red-500">*</span></label>
                      <input type="tel" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required
                        value={nuevo.propietarioTelefono} onChange={e => setNuevo({...nuevo, propietarioTelefono: e.target.value})} placeholder="123-456-7890" />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-white">
              <button type="button" onClick={cerrarModal} className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
                Cancelar
              </button>
              <button type="submit" form="vehiculoForm" className="px-6 py-2.5 text-sm font-bold text-white bg-[#1a56db] hover:bg-blue-800 rounded-lg transition-colors">
                {editando ? 'Guardar cambios' : 'Registrar vehículo'}
              </button>
            </div>

          </div>
        </div>
      )}
    </AdminLayout>
  );
}
