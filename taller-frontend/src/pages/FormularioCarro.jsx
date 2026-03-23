import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormularioCarro() {
  const location = useLocation();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    servicio: location.state?.servicio || "",
    kilometraje: "",
    idmarca: "",
    idmodelo: "",
    idanio: "",
    idmotor: "",
  });

  const [marca, setMarca] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anio, setAnio] = useState([]);
  const [motores, setMotores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos predefinidos
  useEffect(() => {
    async function fetchData() {
      try {
        const [marcaRes, anioRes,motoresRes] = await Promise.all([
          fetch("http://localhost:4000/api/marca"),
          fetch("http://localhost:4000/api/anio"),
          fetch("http://localhost:4000/api/motor"),
        ]);

        const marcaData = await marcaRes.json();
        const anioData = await anioRes.json();
        const motorData = await motoresRes.json();

        setMarca(marcaData);
        setAnio(anioData);
        setMotores(motorData);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Cargar modelos cuando cambia la marca
  useEffect(() => {
    if (!form.idmarca) {
      setModelos([]);
      return;
    }

    async function fetchModelo() {
      try {
        const res = await fetch(`http://localhost:4000/api/modelo/${form.idmarca}`);
        const data = await res.json();
        setModelos(data);
      } catch (err) {
        console.error("Error cargando modelos:", err);
      }
    }

    fetchModelo();
  }, [form.idmarca]);


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch("http://localhost:4000/api/cliente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: form.nombre,
            apellido: form.apellido,
            correo: form.correo,
            telefono: form.telefono,
          }),
        });
        if (!res.ok) throw new Error("Error al guardar");
        const data = await res.json();
        console.log("Cliente guardado:", data);
        alert("Cliente registrado correctamente.");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("No se pudo guardar. Revisa la consola.");
      }
    })();
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Cargando formulario...</div>;
  }

  return (
    <div className="max-w-[1100px] mx-auto w-full px-4 text-left pb-16 pt-6">
      <button 
        onClick={() => navigate(-1)} 
        className="text-blue-600 font-semibold flex items-center gap-2 mb-6 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Volver a servicios
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 items-start">
        
        {/* Columna Izquierda: Formulario */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cotización</h1> 
          <p className="text-gray-500 mb-8 text-sm max-w-[400px]">
            Completa los datos del vehículo para generar el estimado del servicio seleccionado.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Servicio (Solo lectura) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Servicio</label>
              <input
                type="text"
                name="servicio"
                value={form.servicio}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                placeholder="Servicio seleccionado"
              />
            </div>

            {/* Año y Marca */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Año</label>
                <select
                  name="idanio"
                  value={form.idanio}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="">Selecciona un año</option>
                  {anio.map((year) => {
                    const id = year.idanio ?? year.id ?? year.value ?? year.nombre;
                    const label = year.nombre ?? id;
                    return <option key={id} value={id}>{label}</option>;
                  })}
                </select>
              </div> 
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marca</label>
                <select
                  name="idmarca"
                  value={form.idmarca}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="">Selecciona una marca</option>
                  {marca.map((marc) => (
                    <option key={marc.idmarca} value={marc.idmarca}>{marc.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modelo y Motor */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Modelo</label>
                <select
                  name="idmodelo"
                  value={form.idmodelo}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white disabled:bg-gray-50"
                  required
                  disabled={!form.idmarca}
                >
                  <option value="">Selecciona un modelo</option>
                  {modelos.map((modelo) => (
                    <option key={modelo.idmodelo} value={modelo.idmodelo}>{modelo.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Motor</label>
                <select
                  name="idmotor"
                  value={form.idmotor}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="">Selecciona un motor</option>
                  {motores.map((motor) => {
                    const id = motor.idmotor ?? motor.id ?? motor.value;
                    const label = motor.cilindrada ?? id;
                    return <option key={id} value={id}>{label}</option>;
                  })}
                </select>
              </div>
            </div>

            {/* Kilometraje */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Kilometraje</label>
              <div className="relative">
                <input
                  type="text"
                  name="kilometraje"
                  value={form.kilometraje}
                  onChange={handleChange}
                  placeholder="Ingresa el kilometraje aproximado"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white pr-10"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 mt-6">
              <button type="submit" className="flex-1 bg-[#1A56DB] text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Cotizar
              </button>
              <button type="button" className="flex-1 bg-gray-200 text-white font-semibold px-4 py-3 rounded-lg cursor-not-allowed">
                Agendar servicio
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-[0.7] bg-[#EF4444] text-white font-semibold px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                Volver
              </button>
            </div>
          </form>
        </div>

        {/* Columna Derecha: Resumen y Cards */}
        <div className="flex flex-col gap-4">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Resumen estimado</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Cliente</span>
            </div>
            <p className="text-gray-500 mb-8 text-sm">
              Vista previa para clientes antes de confirmar la cotización.
            </p>

            <div className="flex flex-col gap-4 text-sm text-gray-600 mb-10">
              <div className="flex justify-between">
                <span>Servicio</span>
                <span className="font-semibold text-gray-900">{form.servicio || 'Afinación básica'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tiempo estimado</span>
                <span className="font-semibold text-gray-900">2 a 3 horas</span>
              </div>
              <div className="flex justify-between">
                <span>Refacciones</span>
                <span className="font-semibold text-gray-900 text-right">Incluidas</span>
              </div>
              <div className="flex justify-between">
                <span>Mano de obra</span>
                <span className="font-semibold text-gray-900">$650 MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Partes y consumibles</span>
                <span className="font-semibold text-gray-900">$890 MXN</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-semibold">Total estimado</span>
                <span className="text-3xl font-light text-[#1A56DB]">$1540 MXN</span>
              </div>
              <p className="text-xs text-gray-400">
                El total puede ajustarse tras la revisión física del vehículo. El cliente puede consultar esta cotización y decidir si agenda la cita.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Mis citas</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                El cliente puede revisar próximas citas, fechas disponibles y estado de atención.
              </p>
            </div>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Reportes del vehículo</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Acceso de solo lectura al historial y a lo realizado en cada visita al taller.
              </p>
            </div>
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Acceso seguro</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Login con correo y contraseña usando la autenticación principal de la plataforma.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FormularioCarro;

