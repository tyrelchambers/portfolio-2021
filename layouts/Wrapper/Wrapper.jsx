import React, { useEffect, useState } from "react";
import MobileNav from "../../components/MobileNav/MobileNav";
import Socials from "../../components/Socials/Socials";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const Wrapper = (props) => {
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
    <div className="flex w-full relative min-h-screen h-full">
      <div
        className={`toggle-wrapper flex flex-col gap-4 w-10`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="line bg-slate-500 h-[3px] rounded-full w-full"></span>
        <span className="line bg-slate-500 h-[3px] rounded-full w-full"></span>
        <span className="line bg-slate-500 h-[3px] rounded-full w-full"></span>
      </div>
      <MobileNav isOpen={isOpen} />
      <aside className="flex flex-col w-20 sticky top-4 h-full m-4 items-center header-sidebar">
        <Nav />
        <div className="mt-8">
          <Socials direction="col" />
        </div>
      </aside>
      <main className="p-6 w-full">{props.children}</main>
    </div>
  );
};

export default Wrapper;
