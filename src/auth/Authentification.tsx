import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { User } from "../classes/User";
import { UserStorage } from "../classes/UserStorage";
import { GameResultStorage } from "../classes/GameResultStorage";

interface AuthContextType {
    currentUser: User | null;
    register: (name: string, password: string) => boolean;
    login: (name: string, password: string) => boolean;
    logout: () => void;
    changeName: (newName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
const storage = new UserStorage();
const resultStorage = new GameResultStorage();

function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(storage.getCurrent());

    const register = (name: string, password: string): boolean => {
        if (storage.exists(name)) {
            return false;
        }
        storage.save(new User(name, password));
        return true;
    };

    const login = (name: string, password: string): boolean => {
        const user = storage.findByName(name);
        if (user === null || !user.checkPassword(password)) {
            return false;
        }
        storage.setCurrent(user);
        setCurrentUser(user);
        return true;
    };

    const logout = (): void => {
        storage.clearCurrent();
        setCurrentUser(null);
    };

    const changeName = (newName: string): boolean => {
        if (currentUser === null || storage.exists(newName)) {
            return false;
        }
        const oldName = currentUser.getName();
        storage.rename(oldName, newName);
        resultStorage.renamePlayer(oldName, newName);
        setCurrentUser(new User(newName, currentUser.password));
        return true;
    };

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout, changeName }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };