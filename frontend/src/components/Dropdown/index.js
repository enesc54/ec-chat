import { CiMenuKebab } from "react-icons/ci";

import { useState } from "react";

function Dropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownItems = [];
    props.items.forEach(item => {
        if (dropdownItems.length > 0) {
            dropdownItems.push(<hr className='my-2' />);
        }
        dropdownItems.push(
            <div
                className='flex items-center mx-2'
                onClick={() => {
                    setIsOpen(false);
                    item.onclick();
                }}
            >
                {item.icon && <div className='mr-2'>{item.icon}</div>}
                {item.text}
            </div>
        );
    });
    return (
        <div className='relative inline-block flex'>
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <CiMenuKebab className='h-full' />
            </button>

            {isOpen && (
                <div
                    className='absolute w-max bg-white shadow-2xl rounded-lg p-3 top-full left-0 mt-2 overflow-y-scroll
                p-2'
                >
                    {dropdownItems}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
