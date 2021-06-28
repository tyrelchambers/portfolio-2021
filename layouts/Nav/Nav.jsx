import React from "react";
import NavLink from "../../components/NavLink/NavLink";

const Nav = () => {
  return (
    <nav className="flex gap-6 nav">
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
      <NavLink
        href="/services"
        className="text-white opacity-70 hover:opacity-100 transition-all"
      >
        How I can help
      </NavLink>
    </nav>
  );
};

export default Nav;
