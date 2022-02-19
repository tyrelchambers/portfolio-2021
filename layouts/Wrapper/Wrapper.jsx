import React from "react";
import Socials from "../../components/Socials/Socials";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

const Wrapper = (props) => {
  return (
    <div className="flex w-full relative min-h-screen h-full">
      <aside className="flex flex-col w-20 sticky top-4 h-full m-4 items-center">
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
