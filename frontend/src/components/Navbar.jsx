import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Plataforma IA</h2>

      <div>
        <Link to="/">Inicio</Link>
        <Link to="/courses">Cursos</Link>
      </div>
    </nav>
  );
}

export default Navbar;