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
    <section className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Cotizacion</h1> 
     
      <h2 className="text-xl font-bold text-blue-800 mb-4 text-center">Datos del vehiculo</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">


        {/* Datos del vehículo */}
        
        <div>
          <label className="block text-sm font-semibold mb-1">Año</label>
          <select
            name="idanio"
            value={form.idanio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona un año</option>
            {anio.map((year) => {
              const id = year.idanio ?? year.id ?? year.value ?? year.nombre;
              const label = year.nombre ?? id;
              return (
                <option key={id} value={id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div> 

        <div>
          <label className="block text-sm font-semibold mb-1">Marca</label>
          <select
            name="idmarca"
            value={form.idmarca}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona una marca</option>
            {marca.map((marc) => (
              <option key={marc.idmarca} value={marc.idmarca}>
                {marc.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Modelo</label>
          <select
            name="idmodelo"
            value={form.idmodelo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={!form.idmarca}
          >
            <option value="">Selecciona un modelo</option>
            {modelos.map((modelo) => (
              <option key={modelo.idmodelo} value={modelo.idmodelo}>
                {modelo.nombre}
              </option>
            ))}
          </select>
        </div>

 <div>
          <label className="block text-sm font-semibold mb-1">Motor</label>
          <select
            name="idmotor"
            value={form.idmotor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona un motor</option>
            {motores.map((motor) => {
              const id = motor.idmotor ?? motor.id ?? motor.value;
              const label = motor.cilindrada ?? id;
              return (
                <option key={id} value={id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>


        <div className="flex gap-3 mt-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Cotizar
          </button>
          <button type="submit" className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Agendar servicio
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-red-500 px-4 py-2 rounded hover:bg-gray-300 text-white"
          >
            Volver
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioCarro;

