import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useAuth } from "../auth/Authentification";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    if (name === "" || password === "") {
      alert("Please enter your name and password.");
      return;
    }
    if (login(name, password)) {
      navigate("/");
    } else {
      alert("Wrong name or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-xl rounded-3xl bg-sky-300/25 px-8 py-8 shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
        <div className="flex items-center justify-between">
          <Button variant="nav" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button variant="nav" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>

        <h1 className="mt-4 text-center font-display text-5xl uppercase text-white md:text-6xl">
          Login
        </h1>

        <div className="mt-8 flex flex-col gap-6">
          <FormField label="Name" value={name} onChange={setName} />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <div className="mt-2 flex justify-center">
            <Button variant="primary" className="text-3xl" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;