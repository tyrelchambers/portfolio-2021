import React from "react";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const Wrapper = (props) => {
  return (
    <div className="flex w-full relative">
      <aside className="flex flex-col border-r-[1px] border-gray-300 w-20  sticky top-0">
        <Nav />
      </aside>
      <main className="p-6 w-full">{props.children}</main>
    </div>
  );
};

export default Wrapper;
