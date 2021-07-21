import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faBuilding,
  faCamera,
  faMusic,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";
import Hero from "../components/Hero/Hero";
import Footer from "../layouts/Footer/Footer";
import Wrapper from "../layouts/Wrapper/Wrapper";
const services = () => {
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers | Services</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Quicksand:wght@400;700&family=Roboto:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Hero>
        <h1 className="text-7xl font-thin text-gray-200 max-w-3xl hero-title mt-10">
          Can I help you{" "}
          <span className="font-black text-green-400">get started?</span>
        </h1>
      </Hero>

      <div className="max-w-screen-lg w-full ml-auto mr-auto mt-10">
        <div className="grid grid-cols-3 mt-14 gap-14 grid-list">
          <div className="flex flex-col">
            <FontAwesomeIcon
              icon={faMusic}
              className="text-green-400 "
              size="2x"
            />
            <h2 className="font-bold  text-gray-700 text-2xl my-4">Musician</h2>
            <p className="text-gray-500 font-thin max-w-2xl text-lg">
              I can help you setup a website for yourself, or your band. This
              will allow you to consolidate all your social links, tour
              schedules, updates and more.
            </p>
          </div>

          <div className="flex flex-col">
            <FontAwesomeIcon
              icon={faBuilding}
              className="text-green-400 "
              size="2x"
            />
            <h2 className="font-bold  text-gray-700 text-2xl my-4">Business</h2>
            <p className="text-gray-500 font-thin max-w-2xl text-lg">
              Are you a small or large business that needs an online presence? I
              can help you. It's crucial to have a website for your company, but
              where do you start? Start by sending me an email with what you're
              looking for and we can begin our journey!
            </p>
          </div>
          <div className="flex flex-col">
            <FontAwesomeIcon
              icon={faYoutube}
              className="text-green-400 "
              size="2x"
            />
            <h2 className="font-bold  text-gray-700 text-2xl my-4">
              Content Creator
            </h2>
            <p className="text-gray-500 font-thin max-w-2xl text-lg">
              You could be a Youtuber, Twitch streamer, or somewhere in between.
              I can get something set up for you to share with your followers.
            </p>
          </div>
          <div className="flex flex-col">
            <FontAwesomeIcon
              icon={faCamera}
              className="text-green-400 "
              size="2x"
            />
            <h2 className="font-bold  text-gray-700 text-2xl my-4">
              Photographer/Videographer
            </h2>
            <p className="text-gray-500 font-thin max-w-2xl text-lg">
              Every photographer or videographer needs a website to show-off
              their work. Let me build you a website to compliment your
              Instagram (or other platform) and help you show-off your work.
            </p>
          </div>
          <div className="flex flex-col">
            <FontAwesomeIcon
              icon={faStar}
              className="text-green-400 "
              size="2x"
            />
            <h2 className="font-bold  text-gray-700 text-2xl my-4">
              Social Media Influencer
            </h2>
            <p className="text-gray-500 font-thin max-w-2xl text-lg">
              Your personal brand is the pinnicle of who you are online. Let me
              help you build a website that will help you to advertise without
              the hassle of having to worry about the details.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default services;
