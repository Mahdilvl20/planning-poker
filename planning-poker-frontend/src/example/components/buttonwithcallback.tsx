function ButtonWithCallback({onClick,label='click2'}) {
    return (
        <button onClick={onClick}>{label}</button>
    );
}
export default ButtonWithCallback;