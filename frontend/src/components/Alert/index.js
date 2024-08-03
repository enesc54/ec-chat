import { IoClose } from "react-icons/io5";

function Alert(props) {
    var colors = () => {
        if (props.type === "success") return "bg-green-500";
        else if (props.type === "warning") return "bg-orange-300";
        else if (props.type === "error") return "bg-red-500";
        else return "bg-blue-500";
    };
    return (
        <div
            className={`absolute flex flex-row bottom-3 right-3 text-white items-center p-5 pr-10 h-20 ${colors()} animate-alertIn rounded-2xl`}
        >
            {props.message}
            <button
                className='absolute right-0 top-0 p-3'
                onClick={() => {
                    props.setVisible();
                }}
            >
                <IoClose />
            </button>
        </div>
    );
}

export default Alert;
