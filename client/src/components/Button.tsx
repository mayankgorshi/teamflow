type ButtonProps = {
    text: string;
    color?: string;
    size?: string;
    onClick?: () => void;
};

function Button({ text, color, size, onClick }: ButtonProps) {
    return (
        <button onClick={onClick}>
            {text} - {color} - {size}
        </button>
    );
}

export default Button;