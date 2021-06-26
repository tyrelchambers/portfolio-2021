import React from "react";
import NavLink from "../../components/NavLink/NavLink";

const Nav = () => {
  return (
    <nav className="flex gap-6">
      <NavLink
        href="/"
        className="text-white opacity-70 hover:opacity-100 transition-all"
      >
        Home
      </NavLink>
      <NavLink
        href="/about"
        className="text-white opacity-70 hover:opacity-100 transition-all"
      >
        About
      </NavLink>
    </nav>
  );
};

export default Nav;
