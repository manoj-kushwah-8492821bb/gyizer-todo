import React from "react";

const InputField = (props) => {
  const { type } = props;

  const renderComponent = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            {...props}
            required
            className="rounded-lg bg-secondary border outline-none px-4 py-1.5 sm:py-2.5 border-primary w-full"
          />
        );

      default:
        return (
          <input
            type="text"
            {...props}
            required
            className="rounded-lg bg-secondary border outline-none px-4 py-1.5 sm:py-2.5 border-primary w-full"
          />
        );
        break;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default InputField;
