import { useState, useEffect } from "react";

function Entry(props) {
    const [value, setValue] = useState("");
    useEffect(() => {
        if (!props.text) {
            setValue("");
        }
    }, [props.text]);
    return (
        <input
            className={`${
                props.height ? props.height : "h-16"
            } w-11/12 border-2 ${
                props.text ? "border-[#007BFF]" : ""
            } rounded-xl mx-4 my-2 p-3 focus:border-[#007BFF] focus:outline-none`}
            placeholder={props.placeholder}
            value={value}
            onChange={e => {
                setValue(e.target.value);
                props.setText(e.target.value);
            }}
            type={props.password ? "password" : "email"}
        />
    );
}

export default Entry;
