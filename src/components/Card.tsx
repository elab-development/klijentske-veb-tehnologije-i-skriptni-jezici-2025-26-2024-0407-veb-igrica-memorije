interface CardProps {
    image: string;
    name: string;
    revealed: boolean;
    onClick: () => void;
}

function Card({ image, name, revealed, onClick }: CardProps) {
    return (
        <button
            onClick={onClick}
            className="flex h-full w-full items-center justify-center rounded-xl bg-yellow-400 p-1.5 shadow-lg"
        >
            {revealed ? (
                <img src={image} alt={name} className="h-full w-full object-contain" />
            ) : (
                <span className="font-display text-3xl text-white md:text-4xl">?</span>
            )}
        </button>
    );
}

export default Card;