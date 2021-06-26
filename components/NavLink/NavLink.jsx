import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ children, href, className }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${className} link `}
        aria-current={router.pathname === href ? "page" : null}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
