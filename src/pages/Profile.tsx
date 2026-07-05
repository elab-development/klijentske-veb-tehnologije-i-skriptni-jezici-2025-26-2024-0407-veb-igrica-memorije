import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import FormField from "../components/FormField";
import { useAuth } from "../auth/Authentification";
import { GameResultStorage } from "../classes/GameResultStorage";

const storage = new GameResultStorage();

function Profile() {
    const navigate = useNavigate();
    const { currentUser, changeName } = useAuth();
    const [newName, setNewName] = useState("");

    if (currentUser === null) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <section className="rounded-3xl bg-sky-300/25 px-8 py-10 text-center shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
                    <p className="font-display text-3xl uppercase text-white">
                        Please log in to see your profile.
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

    const handleSave = () => {
        if (newName === "") {
            alert("Please enter a new name.");
            return;
        }
        if (changeName(newName)) {
            setNewName("");
            alert("Name changed!");
        } else {
            alert("Name already taken.");
        }
    };

    return (
        <div className="min-h-screen px-4 pt-32 pb-10 md:pt-24">
            <Navbar />

            <section className="mx-auto mt-4 w-full max-w-2xl rounded-3xl bg-sky-300/25 px-8 py-10 shadow-2xl backdrop-blur-sm ring-1 ring-white/20">
                <h1 className="text-center font-display text-5xl uppercase text-white md:text-6xl">
                    Profile
                </h1>

                <p className="mt-6 text-center font-display text-3xl uppercase text-white">
                    {currentUser.getName()}
                </p>

                <div className="mt-8 flex justify-center gap-6">
                    <div className="rounded-full bg-green-500 px-10 py-3 font-display text-2xl uppercase text-white">
                        Wins: {wins}
                    </div>
                    <div className="rounded-full bg-red-500 px-10 py-3 font-display text-2xl uppercase text-white">
                        Losses: {losses}
                    </div>
                </div>

                <div className="mx-auto mt-10 max-w-md">
                    <FormField label="New Name" value={newName} onChange={setNewName} />
                </div>

                <div className="mt-8 text-center">
                    <Button variant="nav" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default Profile;