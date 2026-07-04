import type { IUser } from "./User";
import { User } from "./User";

export interface IUserStorage {
  exists(name: string): boolean;
  save(user: User): void;
  findByName(name: string): User | null;
  setCurrent(user: IUser): void;
  getCurrent(): User | null;
  clearCurrent(): void;
}

const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

export class UserStorage implements IUserStorage {
  private getAll(): User[] {
    const data = localStorage.getItem(USERS_KEY);
    if (data === null) {
      return [];
    }
    const parsed = JSON.parse(data) as { name: string; password: string }[];
    return parsed.map((u) => new User(u.name, u.password));
  }

  findByName(name: string): User | null {
    const users = this.getAll();
    const found = users.find((u) => u.getName() === name);
    return found ?? null;
  }

  exists(name: string): boolean {
    return this.findByName(name) !== null;
  }

  save(user: User): void {
    const users = this.getAll();
    const updated = [...users, user];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
  }

  setCurrent(user: IUser): void {
    localStorage.setItem(CURRENT_KEY, JSON.stringify({ name: user.getName() }));
  }

  getCurrent(): User | null {
    const data = localStorage.getItem(CURRENT_KEY);
    if (data === null) {
      return null;
    }
    const parsed = JSON.parse(data) as { name: string };
    return this.findByName(parsed.name);
  }

  clearCurrent(): void {
    localStorage.removeItem(CURRENT_KEY);
  }
}