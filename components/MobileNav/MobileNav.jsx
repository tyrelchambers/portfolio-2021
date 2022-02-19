import {
  faBoxes,
  faHome,
  faPen,
  faSmile,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import NavLink from "../NavLink/NavLink";

const MobileNav = ({ isOpen }) => {
  return (
    <div
      className={`mobile-nav-wrapper relative light ${isOpen ? "open" : ""}`}
    >
      <nav className="mobile-nav p-4 mt-10 flex flex-col">
        <NavLink
          href="/"
          className="text-gray-600 flex items-center  opacity-100 transition-all text-xl"
        >
          <FontAwesomeIcon icon={faHome} className="mr-4 text-gray-700" /> Home
        </NavLink>
        <NavLink
          href="/about"
          className="text-gray-600 flex items-center  opacity-100 transition-all text-xl"
        >
          <FontAwesomeIcon
            icon={faUserAstronaut}
            className="mr-4 text-gray-700"
          />{" "}
          About
        </NavLink>

        <NavLink
          href="/blog"
          className="text-gray-600 flex items-center  opacity-100 transition-all text-xl"
        >
          <FontAwesomeIcon icon={faPen} className="mr-4 text-gray-700" /> Blog
        </NavLink>
        <NavLink
          href="/resources"
          className="text-gray-600 flex items-center  opacity-100 transition-all text-xl"
        >
          <FontAwesomeIcon icon={faBoxes} className="mr-4 text-gray-700" />{" "}
          Resources
        </NavLink>
      </nav>
    </div>
  );
};

export default MobileNav;
