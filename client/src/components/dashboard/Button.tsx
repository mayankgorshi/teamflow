type ButtonProps = {
    text: string;
    onClick?: () => void;
    variant?: "primary" | "secondary"
    fullWidth?: boolean;
};

function Button({ text, onClick, variant = "primary", fullWidth = false}: ButtonProps) {
    return (
        <button onClick={onClick}
            className={`${variant === "primary"
                ? "rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-gray-800 hover:scale-105"
                : "rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium transition hover:bg-gray-100"
            }
            ${fullWidth? "w-full" : ""}
            `}>
            {text}
        </button>
    );
}

export default Button;