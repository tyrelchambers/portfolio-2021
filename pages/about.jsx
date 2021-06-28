import React from "react";
import Head from "next/head";
import styles from "../styles/headings.module.css";
import Hero from "../components/Hero/Hero";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Footer from "../layouts/Footer/Footer";
const about = () => {
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers | About</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Hero>
        <h1 className="text-7xl font-thin text-gray-200 max-w-3xl hero-title mt-10">
          Hi, my name is,
          <span className="font-black text-green-400">Tyrel Chambers</span>
        </h1>
      </Hero>

      <div className="max-w-screen-lg mt-20 ml-auto mr-auto w-full">
        <div className="flex flex-col sm:flex-row gap-10">
          <img
            src="/me.jpg"
            alt=""
            className="object-cover  max-w-md rounded-lg shadow-lg "
          />
          <div className="flex flex-col">
            <h1 className={styles.h1}>
              Who is your daddy and what does he do?
            </h1>
            <p className="text-gray-500 mt-4 font-thin max-w-2xl text-lg">
              I'm not a dad, but if you've seen kindergarten cop, then you know
              what I'm talking about! I'm a Web Developer from Peterborough,
              Ontario and making websites are a passion of mine.
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
              <a
                href="https://youtube.com/storiesaftermidnight"
                className="text-blue-400"
              >
                Stories After Midnight
              </a>
              . I also enjoy playing video games with my friends and strumming
              on my guitar. I'm a big fan of the outdoors.
            </p>
          </div>
        </div>

        <div className="mt-20 flex flex-col sm:flex-row gap-10">
          <div className="flex flex-col">
            <h1 className={styles.h1}>I love taking photos!</h1>
            <p className="text-gray-500 mt-2 font-thin max-w-2xl text-lg">
              You've already seen one of my pictures on the main page of my
              site. I took it in Thunday Bay while hiking the Ouimet Canyon. If
              you find yourself in Thunder Bay, I'd highly recommend visiting
              that canyon.
            </p>
            <p className="text-gray-500 mt-2 font-thin max-w-2xl text-lg">
              I'd also highly recommend hiking the Sleeping Giant! It has the
              tallest cliffs in Ontario.
            </p>
          </div>
          <img
            src="/mtn.jpeg"
            alt="Mountain"
            className=" max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default about;
