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
                        ? "bg-blue-300 rounded-bl-2xl"
                        : "bg-gray-200 rounded-br-2xl"
                }`}
            >
                {props.text}
            </div>
        </div>
    );
}

export default MessageView;
