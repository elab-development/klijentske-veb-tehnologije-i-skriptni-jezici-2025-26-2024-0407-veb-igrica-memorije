import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useAuth } from "../auth/Authentification";
import { GameResultStorage } from "../classes/GameResultStorage";

const storage = new GameResultStorage();

const outcomeOptions = ["all", "win", "loss"];
const gridOptions = ["all", "4x4", "6x4", "6x5"];
const resultsPerPage = 4;

function History() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [showFilter, setShowFilter] = useState(false);
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [gridFilter, setGridFilter] = useState("all");
  const [opponentFilter, setOpponentFilter] = useState("");
  const [page, setPage] = useState(1);

  if (currentUser === null) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <section className="rounded-3xl bg-sky-300/25 px-8 py-10 text-center shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
          <p className="font-display text-3xl uppercase text-white">
            Please log in to see your history.
          </p>
          <Button
            variant="nav"
            className="mt-6"
            onClick={() => navigate("/login")}>
            Login
          </Button>
        </section>
      </div>
    );
  }

  const allResults = storage.getForPlayer(currentUser.getName());

  const filteredResults = allResults.filter((result) => {
    if (outcomeFilter !== "all" && result.outcome !== outcomeFilter) {
      return false;
    }
    if (
      gridFilter !== "all" &&
      `${result.cols}x${result.rows}` !== gridFilter
    ) {
      return false;
    }
    if (
      opponentFilter !== "" &&
      !result.opponent.toLowerCase().includes(opponentFilter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const pageCount = Math.max(
    1,
    Math.ceil(filteredResults.length / resultsPerPage),
  );
  const currentPage = Math.min(page, pageCount);
  const pageResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage,
  );

  const rowColors = {
    win: "bg-green-500",
    loss: "bg-red-500",
    draw: "bg-gray-400",
  };

  return (
    <div className="min-h-screen px-4 pt-32 pb-10 md:pt-24">
      <Navbar />

      <section className="mx-auto mt-4 w-full max-w-4xl rounded-3xl bg-sky-300/25 px-8 py-8 shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
        <Button variant="nav" onClick={() => setShowFilter(!showFilter)}>
          Filter
        </Button>

        {showFilter && (
          <div className="mt-4 flex flex-wrap items-center gap-6 rounded-2xl bg-white/10 p-4">
            <div className="flex items-center gap-2">
              {outcomeOptions.map((option) => (
                <Button
                  key={option}
                  variant="nav"
                  className={option === outcomeFilter ? "" : "opacity-60"}
                  onClick={() => {
                    setOutcomeFilter(option);
                    setPage(1);
                  }}>
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {gridOptions.map((option) => (
                <Button
                  key={option}
                  variant="nav"
                  className={option === gridFilter ? "" : "opacity-60"}
                  onClick={() => {
                    setGridFilter(option);
                    setPage(1);
                  }}>
                  {option}
                </Button>
              ))}
            </div>
            <input
              value={opponentFilter}
              placeholder="Opponent name"
              className="rounded-md bg-white px-4 py-2 text-lg text-gray-800 outline-none focus:ring-4 focus:ring-white/60"
              onChange={(e) => {
                setOpponentFilter(e.target.value);
                setPage(1);
              }}
            />
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {pageResults.length === 0 ? (
            <p className="py-10 text-center font-display text-2xl uppercase text-white">
              No games found.
            </p>
          ) : (
            pageResults.map((result, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 items-center rounded-full px-4 py-2 font-display text-lg uppercase text-white md:px-8 md:py-3 md:text-2xl ${rowColors[result.outcome]}`}>
                <span>
                  {result.cols}x{result.rows}
                </span>
                <span className="text-center">{result.opponent}</span>
                <span className="text-right">{result.outcome}</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="nav"
            onClick={() => setPage(Math.max(1, currentPage - 1))}>
            {"<"}
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`font-display text-2xl text-white cursor-pointer ${number === currentPage ? "" : "opacity-60"}`}
              onClick={() => setPage(number)}>
              {number}
            </button>
          ))}
          <Button
            variant="nav"
            onClick={() => setPage(Math.min(pageCount, currentPage + 1))}>
            {">"}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default History;