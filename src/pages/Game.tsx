import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAuth } from "../auth/Authentification";
import type { Animal } from "../classes/Animal";
import { GameResultStorage } from "../classes/GameResultStorage";

const resultStorage = new GameResultStorage();

interface GameSettingsState {
  opponent: string;
  cols: number;
  rows: number;
}

interface CardData {
  key: number;
  name: string;
  image: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

function Game() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const settings = location.state as GameSettingsState | null;

  const playerNames = [
    currentUser === null ? "Player 1" : currentUser.getName(),
    settings === null ? "Player 2" : settings.opponent,
  ];

  const [cards, setCards] = useState<CardData[]>([]);
  const [firstIndex, setFirstIndex] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [moves, setMoves] = useState([0, 0]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (settings === null) {
      return;
    }
    const loadCards = async () => {
      const response = await fetch("/animalsData.json");
      const data = await response.json();
      const animals: Animal[] = data.animals;

      const pairsNeeded = (settings.cols * settings.rows) / 2;
      const chosen = shuffle(animals).slice(0, pairsNeeded);

      const deck: CardData[] = [];
      chosen.forEach((animal, index) => {
        deck.push({ key: index * 2, name: animal.name, image: animal.image, flipped: false, matched: false });
        deck.push({ key: index * 2 + 1, name: animal.name, image: animal.image, flipped: false, matched: false });
      });

      setCards(shuffle(deck));
    };
    loadCards();
  }, [settings]);

  useEffect(() => {
    if (finished || cards.length === 0 || !cards.every((c) => c.matched)) {
      return;
    }
    if (settings !== null && currentUser !== null) {
      let outcome: "win" | "loss" | "draw" = "draw";
      if (scores[0] > scores[1]) {
        outcome = "win";
      } else if (scores[1] > scores[0]) {
        outcome = "loss";
      }
      const totalPairs = (settings.cols * settings.rows) / 2;
      const perfect = scores[0] === totalPairs && moves[0] === totalPairs;
      resultStorage.save({
        player: currentUser.getName(),
        opponent: settings.opponent,
        cols: settings.cols,
        rows: settings.rows,
        outcome,
        moves: moves[0],
        perfect,
        date: new Date().toISOString(),
      });
    }
    setFinished(true);
  }, [cards, finished, settings, currentUser, scores, moves]);

  const handleCardClick = (index: number) => {
    if (busy || finished) {
      return;
    }
    const clicked = cards[index];
    if (clicked.flipped || clicked.matched) {
      return;
    }

    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );

    if (firstIndex === null) {
      setFirstIndex(index);
      return;
    }

    const first = firstIndex;
    setFirstIndex(null);
    setMoves((m) => {
      const next = [...m];
      next[current] += 1;
      return next;
    });

    if (cards[first].name === clicked.name) {
      setCards((prev) =>
        prev.map((c, i) =>
          i === first || i === index ? { ...c, matched: true, flipped: true } : c
        )
      );
      setScores((s) => {
        const next = [...s];
        next[current] += 1;
        return next;
      });
    } else {
      setBusy(true);
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === first || i === index ? { ...c, flipped: false } : c
          )
        );
        setCurrent((c) => (c === 0 ? 1 : 0));
        setBusy(false);
      }, 800);
    }
  };

  if (settings === null) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <section className="rounded-3xl bg-sky-300/25 px-8 py-10 text-center shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
          <p className="font-display text-3xl uppercase text-white">
            No game settings found.
          </p>
          <Button variant="nav" className="mt-6" onClick={() => navigate("/game-settings")}>
            Back
          </Button>
        </section>
      </div>
    );
  }

  const nameBox = "rounded-xl px-3 py-1.5 font-display text-lg uppercase text-white md:px-6 md:py-2 md:text-3xl";
  const activeFrame = "ring-4 ring-yellow-400";

  let resultMessage = "It's a draw!";
  if (scores[0] > scores[1]) {
    resultMessage = playerNames[0] + " wins in " + moves[0] + " moves!";
  } else if (scores[1] > scores[0]) {
    resultMessage = playerNames[1] + " wins in " + moves[1] + " moves!";
  }

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden p-4">
      <section className="relative flex h-full w-full max-w-5xl flex-col rounded-3xl bg-sky-300/25 px-6 py-6 shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          <div className={`${nameBox} bg-sky-500 ${current === 0 && !finished ? activeFrame : ""}`}>
            {playerNames[0]}
          </div>
          <div className="flex gap-4 font-display text-2xl text-white md:text-3xl">
            <span>{scores[0]}</span>
            <span>{scores[1]}</span>
          </div>
          <div className={`${nameBox} bg-red-500 ${current === 1 && !finished ? activeFrame : ""}`}>
            {playerNames[1]}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-6 font-display text-lg uppercase text-white">
          <span>Moves: {moves[0]}</span>
          <span>Moves: {moves[1]}</span>
        </div>

        <div className="mt-4 flex min-h-0 flex-1 items-center justify-center">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${settings.cols}, 1fr)`,
              gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
              aspectRatio: `${settings.cols} / ${settings.rows}`,
              height: "100%",
              maxWidth: "100%",
            }}
          >
            {cards.map((card, index) => (
              <Card
                key={card.key}
                image={card.image}
                name={card.name}
                revealed={card.flipped || card.matched}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>

        {finished && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-black/40 px-4 text-center">
            <p className="font-display text-4xl uppercase text-white md:text-5xl">
              {resultMessage}
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="nav" onClick={() => navigate("/game-settings")}>
                Play Again
              </Button>
              <Button variant="nav" onClick={() => navigate("/history")}>
                History
              </Button>
              <Button variant="nav" onClick={() => navigate("/")}>
                Home
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Game;