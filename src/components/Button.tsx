import type { ReactNode } from "react";

type ButtonVariant = "primary" | "nav";

interface ButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const baseStyle =
  "font-display uppercase text-white " +
  "bg-yellow-400 hover:bg-yellow-500 " +
  "rounded-2xl " +
  "cartoon-shadow cursor-pointer " +
  "active:translate-y-1";

const sizeStyle = {
  primary: "px-10 py-4 text-4xl",
  nav: "px-4 py-2 text-base md:px-6 md:text-xl",
};

function Button({
  variant = "primary",
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      className={`${baseStyle} ${sizeStyle[variant]} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
