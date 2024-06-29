function Entry(props) {
    return (
        <input
            className={`h-16 w-11/12 border-2 ${
                props.text ? "border-[#007BFF]" : ""
            } rounded-xl mx-4 my-2 p-3 focus:border-[#007BFF] focus:outline-none`}
            placeholder={props.placeholder}
            onChange={e => {
                props.setText(e.target.value);
            }}
            type={props.password ? "password" : "email"}
        />
    );
}

export default Entry;
