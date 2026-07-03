export interface IUser {
  getName(): string;
  checkPassword(password: string): boolean;
}

export class User implements IUser {
  name: string;
  password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }

  getName(): string {
    return this.name;
  }

  checkPassword(password: string): boolean {
    return this.password === password;
  }
}