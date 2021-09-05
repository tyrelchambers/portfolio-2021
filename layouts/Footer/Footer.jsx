import React from "react";
import { MainBtn } from "../../components/Buttons/Buttons";
import Socials from "../../components/Socials/Socials";
const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();
  console.log(currentYear);
  return (
    <footer className="hero flex flex-col py-12 p-6 pb-12 bg-gray-50 mt-4">
      <div className="max-w-screen-lg flex flex-col items-center ml-auto mr-auto w-full">
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-2 font-bold">Tyrel Chambers</p>
          <p className="text-gray-700">
            Thank you for visiting. I hope to see you again soon.
          </p>
          <a
            href="mailto:tychambers3@gmail.com?subject=Hey There!"
            className="styled-link mt-6"
          >
            Want to connect? Send me an email and say hello!
          </a>
        </div>
        <div className="mt-10 flex flex-col items-center w-full">
          <Socials />
          <p className="font-thin text-gray-600 text-sm mt-6">
            © 2021 - {currentYear}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
