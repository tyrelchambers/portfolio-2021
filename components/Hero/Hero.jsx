import React from "react";
import Header from "../../layouts/Header/Header";
const Hero = (props) => {
  return (
    <div className="hero relative flex flex-col items-center p-6 pb-12 bg-gray-900 z-20">
      <div className="hero-body max-w-screen-lg w-full">
        <Header />
        {props.children}
      </div>
    </div>
  );
};

export default Hero;
