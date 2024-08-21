import React from "react";

const IconBtn = ({ icon, event }) => {
    return (
        <button onClick={event} className="rounded-lg bg-secondary border p-2 border-primary flex justify-center items-center">
            {icon}
        </button>
    );
};

export default IconBtn;
