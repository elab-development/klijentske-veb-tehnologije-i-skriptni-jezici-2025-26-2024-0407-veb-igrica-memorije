import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-end gap-2 p-4 md:gap-4 md:p-6">
      <Button variant="nav" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button variant="nav" onClick={() => navigate("/register")}>
        Register
      </Button>
    </nav>
  );
}

export default Navbar;