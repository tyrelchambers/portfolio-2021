import {
  faBook,
  faBox,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import NavLink from "../../components/NavLink/NavLink";

const Nav = () => {
  return (
    <nav className="flex flex-col gap-6 nav mt-10">
      <NavLink
        href="/"
        className="text-slate-900 opacity-70 hover:opacity-100 transition-all nav-item flex flex-col items-center"
      >
        <span className="icon-wrapper h-8 w-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faHouse} />
        </span>
        <p className="text-xs  ">Home</p>
      </NavLink>
      <NavLink
        href="/about"
        className="text-slate-900 opacity-70 hover:opacity-100 transition-all nav-item flex flex-col items-center"
      >
        <span className="icon-wrapper h-8 w-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <p className="text-xs ">Me</p>
      </NavLink>

      <NavLink
        href="/blog"
        className="text-slate-900 opacity-70 hover:opacity-100 transition-all nav-item flex flex-col items-center"
      >
        <span className="icon-wrapper h-8 w-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faBook} />
        </span>
        <p className="text-xs  ">Blog</p>
      </NavLink>
      <NavLink
        href="/resources"
        className="text-slate-900 opacity-70 hover:opacity-100 transition-all nav-item flex flex-col items-center"
      >
        <span className="icon-wrapper h-8 w-8 flex justify-center items-center">
          <FontAwesomeIcon icon={faBox} />
        </span>
        <p className="text-xs  ">Resources</p>
      </NavLink>
    </nav>
  );
};

export default Nav;
