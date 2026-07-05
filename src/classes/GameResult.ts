export interface GameResult {
    player: string;
    opponent: string;
    cols: number;
    rows: number;
    outcome: "win" | "loss" | "draw";
    moves: number;
    perfect: boolean;
    date: string;
}