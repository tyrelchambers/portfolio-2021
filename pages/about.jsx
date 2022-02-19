import React from "react";
import Head from "next/head";
import styles from "../styles/headings.module.css";
import Hero from "../components/Hero/Hero";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Footer from "../layouts/Footer/Footer";
import NavLink from "../components/NavLink/NavLink";
import CommonHead from "../components/CommonHead";
import { H1 } from "../components/Headings/Headings";

const about = () => {
  return (
    <Wrapper>
      <CommonHead title="Tyrel Chambers | About"></CommonHead>
      <H1>Hey, I'm Tyrel Chambers 👋</H1>

      <div className=" mt-20  w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          <img
            src="/me.jpg"
            alt=""
            className="object-cover  max-w-md rounded-lg shadow-lg "
          />
          <div className="flex flex-col">
            <h2 className={styles.h1}>A little about me</h2>
            <p className="text-gray-500 mt-4 font-thin max-w-2xl text-lg">
              I'm a Web Developer from Peterborough, Ontario and making websites
              are a passion of mine.
            </p>
            <p className="text-gray-500 mt-4 font-thin max-w-2xl text-lg">
              I've been programming on the side since around 2013. It started
              when my dad asked me to help him build a website for someone in
              our church. Since then I fell in love with programming; I had
              plans to go to university for Computer Hardware Engineering, but
              scrapped those plans when I made my first webpage.
            </p>

            <p className="text-gray-500 mt-4 font-thin max-w-2xl text-lg">
              Aside from programming, I enjoy making Youtube videos for my
              narration channel{" "}
              <NavLink
                href="https://youtube.com/storiesaftermidnight"
                className="styled-link"
              >
                Stories After Midnight
              </NavLink>{" "}
              and I'm a big fan of the outdoors.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col sm:flex-row gap-10">
          <img
            src="/mtn.jpeg"
            alt="Mountain"
            className="w-full rounded-lg shadow-lg h-[600px] object-cover"
          />
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default about;
