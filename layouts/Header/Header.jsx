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
    <header className="flex items-center justify-between">
      <p className="text-xl text-gray-200 ">Tyrel Chambers</p>
      <Nav />
      <MobileNav />
    </header>
  );
};

export default Header;
