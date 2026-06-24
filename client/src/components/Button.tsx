type ButtonProps = {
    text: string;
    color: string;
    size: string
};

function Button({ text, color, size }: ButtonProps) {
    return (
        <button
            onClick={() => {
                alert(text)
            }}>
            {text} - {color} - {size}
        </button >
    );
}

export default Button;