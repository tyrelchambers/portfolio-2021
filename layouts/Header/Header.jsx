import React from "react";
import Nav from "../Nav/Nav";
import dynamic from "next/dynamic";
const MobileNav = dynamic(
  () => import("../../components/MobileNav/MobileNav"),
  {
    ssr: false,
  }
);
const Header = () => {
  return (
    <header className="flex items-center justify-between ">
      <h1 className="text-xl text-gray-200 ">Tyrel Chambers</h1>
      <Nav />
      <MobileNav />
    </header>
  );
};

export default Header;
