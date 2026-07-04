import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../auth/Authentification";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-end gap-2 p-4 md:gap-4 md:p-6">
      {currentUser === null ? (
        <>
          <Button variant="nav" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="nav" onClick={() => navigate("/register")}>
            Register
          </Button>
        </>
      ) : (
        <Button variant="nav" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </nav>
  );
}

export default Navbar;