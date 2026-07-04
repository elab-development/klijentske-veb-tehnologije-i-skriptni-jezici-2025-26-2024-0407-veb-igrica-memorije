import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { User } from "../classes/User";
import { UserStorage } from "../classes/UserStorage";

interface IAuth {
    currentUser: User | null;
    register: (name: string, password: string) => boolean;
    login: (name: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<IAuth | null>(null);
const storage = new UserStorage();

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

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuth {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };