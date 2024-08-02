function Button(props) {
    return (
        <button
            className={`h-16 w-11/12 ${
                props.color && props.hoverColor
                    ? `${props.color} ${props.hoverColor}`
                    : "bg-[#007BFF] hover:bg-[#0056b3]"
            }  rounded-xl mx-4 my-2 p-3 active:scale-95 text-center text-white grid items-center`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default Button;
