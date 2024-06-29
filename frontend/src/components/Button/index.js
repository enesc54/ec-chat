function Button(props) {
    return (
        <button
            className="h-16 w-11/12 bg-[#007BFF] rounded-xl mx-4 my-2 p-3 hover:bg-[#0056b3] active:scale-95 text-center text-white grid items-center"
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default Button;
