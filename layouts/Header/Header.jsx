import React from "react";
import Nav from "../Nav/Nav";

const Header = () => {
  return (
    <header className="flex items-center justify-between ">
      <h1 className="text-xl text-gray-200 ">Tyrel Chambers</h1>
      <Nav />
    </header>
  );
};

export default Header;
