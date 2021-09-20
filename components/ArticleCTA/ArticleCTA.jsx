import React from "react";
import NavLink from "../NavLink/NavLink";

const ArticleCTA = () => {
  return (
    <section className="max-w-screen-lg w-full ml-auto mr-auto bg-gray-800 p-4 rounded-lg mt-20">
      <p className="text-gray-100 text-xl font-bold">
        Did you enjoy this article?
      </p>
      <p className="text-gray-300">
        Check out these awesome{" "}
        <NavLink href="/resources" className="styled-link">
          resources
        </NavLink>{" "}
        and follow me on{" "}
        <NavLink
          href="https://twitter.com/imtyrelchambers"
          className="styled-link"
        >
          Twitter!
        </NavLink>
      </p>
    </section>
  );
};

export default ArticleCTA;
