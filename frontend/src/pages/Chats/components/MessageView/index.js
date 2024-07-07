function MessageView(props) {
    const q = props.senderId === localStorage.getObject("currentUser").userId;

    return (
        <div
            className={`mx-3 mt-3 grid ${
                q ? "justify-items-end" : "justify-items-start"
            } `}
        >
            <div
                className={`h-10 rounded-t-2xl  text-white px-6 grid items-center ${
                    q
                        ? "bg-[#007BFF] rounded-bl-2xl"
                        : "bg-gray-400 rounded-br-2xl"
                }`}
            >
                {props.text}
            </div>
        </div>
    );
}

export default MessageView;
