import { useNavigate } from "react-router-dom";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/Authentification";
import { GameResultStorage } from "../classes/GameResultStorage";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

Chart.defaults.color = "white";
Chart.defaults.font.family = '"Luckiest Guy"';
Chart.defaults.font.size = 14;

const storage = new GameResultStorage();

const green = "#00C950";
const red = "#FB2C36";
const yellow = "#fcc800";
const blue = "#51a2ff";

function Statistics() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  if (currentUser === null) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <section className="rounded-3xl bg-sky-300/25 px-8 py-10 text-center shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
          <p className="font-display text-3xl uppercase text-white">
            Please log in to see your statistics.
          </p>
          <Button variant="nav" className="mt-6" onClick={() => navigate("/login")}>
            Login
          </Button>
        </section>
      </div>
    );
  }

  const results = storage.getForPlayer(currentUser.getName());
  const wins = results.filter((r) => r.outcome === "win").length;
  const losses = results.filter((r) => r.outcome === "loss").length;
  const perfectGames = results.filter((r) => r.perfect === true).length;
  const lastGames = results.slice(0, 10).reverse();

  const winLossData = {
    labels: [`Wins (${wins})`, `Losses (${losses})`],
    datasets: [
      {
        data: [wins, losses],
        backgroundColor: [green, red],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const perfectData = {
    labels: ["Perfect games", "Other games"],
    datasets: [
      {
        data: [perfectGames, results.length - perfectGames],
        backgroundColor: [yellow, blue],
        borderRadius: 8,
      },
    ],
  };

  const movesData = {
    labels: lastGames.map((r) => `vs ${r.opponent}`),
    datasets: [
      {
        label: "Moves per game",
        data: lastGames.map((r) => r.moves),
        borderColor: blue,
        backgroundColor: "white",
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  const lineOptions = {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  const chartBox = "rounded-2xl bg-white/10 p-4";
  const chartTitle = "mb-2 text-center font-display text-2xl uppercase text-white";

  return (
    <div className="min-h-screen px-4 pt-32 pb-10 md:pt-24">
      <Navbar />

      <section className="mx-auto mt-4 w-full max-w-4xl rounded-3xl bg-sky-300/25 px-8 py-8 shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
        <h1 className="text-center font-display text-5xl uppercase text-white md:text-6xl">
          Statistics
        </h1>

        {results.length === 0 ? (
          <p className="py-10 text-center font-display text-2xl uppercase text-white">
            Play some games to see your statistics.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className={chartBox}>
              <p className={chartTitle}>Wins / Losses</p>
              <Doughnut data={winLossData} />
            </div>
            <div className={chartBox}>
              <p className={chartTitle}>Perfect games ({perfectGames})</p>
              <Bar data={perfectData} options={barOptions} />
            </div>
            <div className={`${chartBox} md:col-span-2`}>
              <p className={chartTitle}>Moves in last {lastGames.length} games</p>
              <Line data={movesData} options={lineOptions} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Statistics;