function Message({ msg }: { msg: string }) {
    return (
        <div className="w-full">
            {msg.split("\n").map((i, idx) => (
                <p key={idx}>{i}</p>
            ))}
        </div>
    );
}

export default Message;
