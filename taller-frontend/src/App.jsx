import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import FormularioCarro from "./pages/FormularioCarro";
import Nosotros from "./pages/nosotros";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import logo from "./assets/logg.png";
import "./styles/barra.scss";

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center">
 
      {isAuthenticated && !isAdminRoute && (
        <nav className="bg-blue-950 text-white px-4 py-2 flex gap-4 items-center text-lg justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo San Jorge" className="h-12" />
          </Link>
          <div className="nav-links">
            <Link to="/">Inicio</Link>  
            <Link to="/servicios">Cotizar</Link>
            <Link to="/nosotros">Nosotros</Link>
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
        <Route path="/servicios" element={<ProtectedRoute><Servicios /></ProtectedRoute>} />
        <Route path="/formulario" element={<ProtectedRoute><FormularioCarro /></ProtectedRoute>} />
        <Route path="/nosotros" element={<ProtectedRoute><Nosotros /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
