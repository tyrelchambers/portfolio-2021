import React from "react";
import NavLink from "../../components/NavLink/NavLink";

const Nav = () => {
  return (
    <nav className="flex">
      <NavLink
        href="/"
        className="text-white opacity-70 hover:opacity-100 transition-all"
      >
        Home
      </NavLink>
    </nav>
  );
};

export default Nav;
