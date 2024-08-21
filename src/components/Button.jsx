import React from "react";

const Button = ({ text, event }) => {
  return (
    <button
      onClick={event}
      className="rounded-lg w-full bg-secondary outline-none border p-2 border-primary flex justify-center items-center"
    >
      {text}
    </button>
  );
};

export default Button;
