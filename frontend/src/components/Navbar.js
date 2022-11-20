import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy 🥵</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Cerrar Sesión</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/signup">Crear Cuenta</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
