import { useState, useEffect } from "react";
import Mapa from "/src/components/mapa.jsx";

function Inicio() {
  const imagenes= [
  "/src/assets/taller frente1.jpeg",
  "/src/assets/taller frente2.jpeg",
  "/src/assets/refa.jpeg",
  "/src/assets/foto refe.jpeg",
  "/src/assets/refe2.jpeg",
];

const [index, setIndex] = useState(0);
const [fade, setFade] = useState(true);

//cambiar imagen tiempo
useEffect(() => {
const intervalo = setInterval(() => {
  setFade(false);

  setTimeout(() => {
  setIndex((prev) => (prev + 1) % imagenes.length);
  setFade(true);
  },500);
}, 4000);

return () => clearInterval(intervalo);
}, []);

  return (
// carrusel de imagenes 

    <section className="w-full">

      {/* HERO SIN CONTENEDORES LATERALES */}
      <div className="w-full overflow-hidden shadow-lg relative h-[50vh]">
        
        <img
          src={imagenes[index]}
          className={`w-full h-full ¿ object-cover object-center transition-opacity duration-700 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
          alt="Taller San Jorge"
        />
      
        {/*degradado de la imagen*/}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 pointer-events-none"></div>
      
       {/* Bienvenidos */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl  drop-shadow-lg">
         Bienvenido a autoservicio San Jorge 
        </h1> 
     </div>
</div>
{ /*}
 <div className = "w-full overflow-hidden shadow-lg relative h-[10vh] bg-white">
  <div className="absolute inset-0 flex items-center justify-center text-center ">
    <h1 className= "text-4xl font-bold text-blue-800 md:text-5xl drop-shadow-lg">
    { /* Bienvenido a autoservicio San Jorge 
    </h1>
    </div>
 </div>
*/}
  {/* Hero de experiencia */}
<div className= "w-full overflow-hidden shadow-lg relative h-[10vh] bg-blue-900">
<div className= "absolute inset-0 flex items-center justify-center text-center text-white md:text-3x1">
<h1 className = "text-2x1 font-bold text-white drop-shadow-lg">
  Mas de 30 años de experiencia cuidando tu vehículo con pasión y profesionalismo
  </h1>
</div>
</div>
       {/*servicios*/}
       <div className= "text-center mt-10 px-4">
        <h1 className="text-4xl font-bold text-blue-800">
          Nuestros servicios
        </h1>
       </div>
       
      {/* RECUADROS DE SERVICIOS */}
      <div className="w-full bg-gray-100 py-8">
        <div className="w-[90%] sm:w-[80%] max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm md:shadow-md text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-50 rounded-full text-blue-600 mb-4 text-5xl">
             <h3> 🔧</h3>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mecánica General</h3>
            <p className="text-sm text-gray-600">Mantenimiento preventivo y reparaciones con garantía.</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm md:shadow-md text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-orange-50 rounded-full text-orange-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 00-1 1v1H6a2 2 0 00-2 2v2h12V6a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H9z" />
                <path d="M3 13v2a3 3 0 003 3h8a3 3 0 003-3v-2H3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Frenos y Suspensión</h3>
            <p className="text-sm text-gray-600">Diagnóstico y reparación de frenos, amortiguadores y suspensión.</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm md:shadow-md text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-yellow-50 rounded-full text-yellow-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Electricidad y Diagnóstico</h3>
            <p className="text-sm text-gray-600">Electrónica a bordo, diagnosis y corrección de fallas eléctricas.</p>
          </div>
        </div>
      </div>

      {/* INFORMACIÓN Y OPINIONES */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 px-4">
        {/* Opiniones de clientes */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Lo que dicen nuestros clientes</h2>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-semibold text-gray-800 mb-1">dora alicia villasana</div>
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <p className="text-gray-700 text-sm">Excelente servicio, y sobre todo muy confiables. Saben lo que están haciendo. Profesionales.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-semibold text-gray-800 mb-1">angeles anahis gm</div>
              <div className="text-yellow-500 mb-2">★★★★</div>
              <p className="text-gray-700 text-sm">Me gusta. El dueño es muy atento, te da nota. Te informa cuándo toca el siguiente servicio. Acepta tarjeta y efectivo. Si es necesario agendar con tiempo puesto que tiene muchos clientes.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="font-semibold text-gray-800 mb-1">Ascary Hernandez Hernandez</div>
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <p className="text-gray-700 text-sm">Excelente atención y muy buen trato</p>
            </div>
          </div>
        </div>

        {/* Información del taller */}
        
        <div className="flex flex-col justify-center items-center text-center">
          <p className="text-gray-700 max-w-md mb-6 mt-4 text-justify">
           Con más de 30 años de experiencia, nuestro taller se ha consolidado como un referente de confianza, calidad y 
           compromiso en el cuidado automotriz. A lo largo de tres décadas hemos acompañado a generaciones de clientes, 
           evolucionando junto con la tecnología sin perder los valores que nos distinguen: honestidad, profesionalismo y
            atención personalizada. Cada vehículo que llega a nuestras instalaciones es tratado con la misma dedicación y 
            precisión, combinando el conocimiento adquirido con el paso de los años y las herramientas más modernas del sector.
            Nuestra trayectoria no solo se mide en tiempo, sino en la satisfacción de quienes han confiado en nosotros, en soluciones
             efectivas, diagnósticos certeros y un servicio que respalda su seguridad y tranquilidad en cada kilómetro recorrido.

          </p>
    
        </div>
      </div>

      {/* MAPA ABAJO */}
      <div className="w-full max-w-5xl mx-auto mt-10 px-4">
        <Mapa />
      </div>

    </section>
  );
}

export default Inicio;

