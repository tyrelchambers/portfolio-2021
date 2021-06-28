import {
  faHome,
  faSmile,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import NavLink from "../NavLink/NavLink";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`toggle-wrapper light grid grid-cols-3 grid-rows-3 ${
          isOpen && "open"
        } `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`dot arrow`}></span>
        <span className="dot white"></span>
        <span className="dot white"></span>
        <span className={`dot arrow`}></span>
        <span className={`dot arrow`}></span>
        <span className="dot white"></span>
        <span className={`dot arrow`}></span>
        <span className="dot white"></span>
        <span className="dot white"></span>
      </div>

      <div
        className={`mobile-nav-wrapper relative light ${isOpen ? "open" : ""}`}
      >
        <nav className="mobile-nav p-4 mt-10">
          <NavLink
            href="/"
            className="text-gray-600 flex items-center  opacity-100 transition-all text-xl mb-10"
          >
            <FontAwesomeIcon icon={faHome} className="mr-4 text-gray-700" />{" "}
            Home
          </NavLink>
          <NavLink
            href="/about"
            className="text-gray-600 flex items-center  opacity-100 transition-all text-xl mb-10"
          >
            <FontAwesomeIcon
              icon={faUserAstronaut}
              className="mr-4 text-gray-700"
            />{" "}
            About
          </NavLink>
          <NavLink
            href="/services"
            className="text-gray-600 flex items-center  opacity-100 transition-all text-xl"
          >
            <FontAwesomeIcon icon={faSmile} className="mr-4 text-gray-700" />{" "}
            How I can help
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
