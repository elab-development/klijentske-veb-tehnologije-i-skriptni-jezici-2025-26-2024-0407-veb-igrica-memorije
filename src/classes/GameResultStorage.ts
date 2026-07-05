import type { GameResult } from "./GameResult";

const RESULTS_KEY = "gameResults";

export class GameResultStorage {
  private getAll(): GameResult[] {
    const data = localStorage.getItem(RESULTS_KEY);
    if (data === null) {
      return [];
    }
    return JSON.parse(data) as GameResult[];
  }

  save(result: GameResult): void {
    const results = this.getAll();
    const updated = [...results, result];
    localStorage.setItem(RESULTS_KEY, JSON.stringify(updated));
  }

  getForPlayer(name: string): GameResult[] {
    const results = this.getAll();
    const mine = results.filter((r) => r.player === name);
    return mine.reverse();
  }

  renamePlayer(oldName: string, newName: string): void {
    const results = this.getAll();
    const updated = results.map((r) =>
      r.player === oldName ? { ...r, player: newName } : r
    );
    localStorage.setItem(RESULTS_KEY, JSON.stringify(updated));
  }
}