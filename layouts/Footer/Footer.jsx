import React from "react";
import { MainBtn } from "../../components/Buttons/Buttons";
import Socials from "../../components/Socials/Socials";
const Footer = () => {
  return (
    <footer className="hero relative flex flex-col items-center py-12 p-6 pb-12 bg-gray-900 mt-20">
      <div className="max-w-screen-lg flex flex-col ">
        <p className="text-gray-200 text-2xl font-thin text-center flex flex-col">
          <span className="text-green-400 font-bold text-5xl">
            Send me an email
          </span>
          and let's get started on building you a website.
        </p>
        <a
          href="mailto:tychambers3@gmail.com?subject=Hey there!"
          className="flex justify-center"
        >
          <MainBtn className="mt-12 shadow-lg w-full">Let's chat</MainBtn>
        </a>
        <div className="mt-20 flex justify-center">
          <Socials />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
