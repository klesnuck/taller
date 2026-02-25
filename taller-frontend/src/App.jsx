import { Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import FormularioCarro from "./pages/FormularioCarro";
import Nosotros from "./pages/nosotros";
import logo from "./assets/logg.png";
import "./styles/barra.scss";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-center">
 
      <nav className="bg-blue-950 text-white px-4 py-2 flex gap-4 items-center text-lg justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo San Jorge" className="h-12" />
        </Link>
        <div className="nav-links">
          <Link to="/">Inicio</Link>  
          <Link to="/servicios">Cotizar</Link>
          <Link to="/nosotros">Nosotros</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/formulario" element={<FormularioCarro />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
    </div>
  );
}

export default App;
