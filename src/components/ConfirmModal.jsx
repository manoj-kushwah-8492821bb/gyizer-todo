import React, { useEffect, useRef } from "react";
import Button from "./Button";

const ConfrimationModal = (props) => {
  const wrapperRef = useRef(null);
  const { handleCancel, handleConfirm } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCancel]);

  return (
    <div className="tracking-wider overflow-hidden absolute z-50 top-0 items-center flex justify-center left-0 w-full h-screen bg-modal">
      <div
        ref={wrapperRef}
        className="transition-all transform rounded-b-lg border bg-secondary border-t-8 border-primary max-w-sm md:max-w-md w-full m-4 p-6 sm:p-10"
      >
        {/* Description */}
        <div className="text-center">Delete this task ?</div>

        {/* Buttons  */}
        <div className="flex mt-10 gap-3 ">
          <Button event={handleConfirm} text="Yes" />
          <Button event={handleCancel} text="NO" />
        </div>
      </div>
    </div>
  );
};

export default ConfrimationModal;
