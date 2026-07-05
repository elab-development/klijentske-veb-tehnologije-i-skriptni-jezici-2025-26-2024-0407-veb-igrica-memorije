import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GameSettings from "./pages/GameSettings";
import Game from "./pages/Game";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import { AuthProvider } from "./auth/Authentification";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game-settings" element={<GameSettings />} />
      <Route path="/game" element={<Game />} />
      <Route path="/history" element={<History />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/statistics" element={<Statistics />} />
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;