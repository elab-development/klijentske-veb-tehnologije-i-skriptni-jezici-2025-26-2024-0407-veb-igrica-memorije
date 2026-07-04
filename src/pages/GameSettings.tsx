import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";

const gridSizes = [
  { label: "4 x 4", cols: 4, rows: 4 },
  { label: "6 x 4", cols: 6, rows: 4 },
  { label: "6 x 5", cols: 6, rows: 5 },
];

function GameSettings() {
  const navigate = useNavigate();
  const [opponent, setOpponent] = useState("");
  const [sizeIndex, setSizeIndex] = useState(0);

  const handleContinue = () => {
    if (opponent === "") {
      alert("Please enter the opponent's username.");
      return;
    }
    const size = gridSizes[sizeIndex];
    navigate("/game", {
      state: { opponent, cols: size.cols, rows: size.rows },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-2xl rounded-3xl bg-sky-300/25 px-8 py-10 shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
        <h1 className="text-center font-display text-5xl uppercase text-white md:text-6xl">
          Game Settings
        </h1>

        <div className="mx-auto mt-8 max-w-md">
          <FormField
            label="Opponent Username"
            value={opponent}
            onChange={setOpponent}
          />
        </div>

        <div className="mt-8 text-center">
          <p className="font-display text-2xl uppercase text-white">Grid Size</p>
          <div className="mt-3 flex flex-wrap justify-center gap-4">
            {gridSizes.map((size, index) => (
              <Button
                key={size.label}
                variant="nav"
                className={index === sizeIndex ? "" : "opacity-60"}
                onClick={() => setSizeIndex(index)}
              >
                {size.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Button variant="nav" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button variant="nav" onClick={handleContinue}>
            Continue to Game
          </Button>
        </div>
      </section>
    </div>
  );
}

export default GameSettings;