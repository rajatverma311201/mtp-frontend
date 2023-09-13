function Message({ msg }: { msg: string }) {
    return (
        <div className="w-full">
            {msg.split("\n").map((i) => (
                <p>{i}</p>
            ))}
        </div>
    );
}

export default Message;
