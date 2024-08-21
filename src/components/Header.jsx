import React from "react";

const Header = () => {
  return (
    <div className="border-2 h-[82px] bg-secondary border-primary rounded-b-lg">
      <div className="container px-4 mx-auto uppercase flex flex-col h-full justify-center font-semibold">
        <h2 className="text-xl sm:text-2xl">Gyizer</h2>
        <div className="text-sm sm:text-base text-secondary">TODO APP</div>
      </div>
    </div>
  );
};

export default Header;
