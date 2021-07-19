import Head from "next/head";
import { MainBtn } from "../components/Buttons/Buttons";
import styles from "../styles/headings.module.css";
import NavLink from "../components/NavLink/NavLink";
import Link from "next/link";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hero from "../components/Hero/Hero";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Footer from "../layouts/Footer/Footer";
export default function Home() {
  const projects = [
    {
      title: "Reddex",
      thumbnail: "/logo green.svg",
      summary:
        "Filter and search posts from Reddit. Filter by keywords, upvote count or read time. Made for Narrators.",
      url: "https://reddex.app",
    },
    {
      title: "Kanlen",
      thumbnail: "/dark.svg",
      summary:
        "Connect with developers and store your code snippets. Develop with peace.",
      url: "https://kanlen.ca",
    },
    {
      title: "Alysha Kyle",
      summary: "Built for Alysha Kyle. A Peterborough musical artist.",
      url: "https://alysha-kyle.vercel.app",
    },
    {
      title: "Packagr",
      summary: "Create and modify your next package.json",
      url: "https://packager-gamma.vercel.app/",
    },
    {
      title: "GetNuklear",
      summary:
        "Sort, search your own Reddit inbox, and send messages just by logging in with Reddit.",
      url: "https://getnucklear.netlify.app/",
    },
    {
      title: "Southern Cannibal",
      summary: "Created for a Youtube horror narrator.",
      url: "https://southerncannibal.com/",
    },
    {
      title: "Stories After Midnight",
      thumbnail: "/SAM - MOON - LIGHT.png",
      summary: "Created for a Youtube horror narrator.",
      url: "https://storiesaftermidnight.com/",
    },
    {
      title: "What's My Following",
      summary:
        "A little tool to give you perspective on how large your following is in comparison to tangible things.",
      url: "https://xenodochial-colden-95e6b2.netlify.app/",
    },
    {
      title: "GitHub User Search",
      summary:
        "A coding exercise to allow a user to search GitHub's API for users.",
      url: "https://jolly-goldberg-76884f.netlify.app",
    },
  ];
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers</title>
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
          Establish your online presence{" "}
          <span className="font-black text-green-400">
            without worrying about the details
          </span>
        </h1>
        <a href="mailto:tychambers3@gmail.com?subject=Hey There!">
          <MainBtn className="mt-12 shadow-lg">Find out how</MainBtn>
        </a>
      </Hero>

      <section className="max-w-screen-lg ml-auto mr-auto w-full mt-20">
        <h1 className={styles.h1}>It's Nice to Meet You...</h1>
        <p className="text-gray-500 mt-2 font-thin max-w-2xl text-lg">
          I'm not into building things I don't believe in. That's all you'll
          find here. Each and every project I've made is something I believe in.
          I learned to code so I could take these ideas and make them a reality;
          I'd like to help you do the same.
        </p>

        <p className="text-gray-500 mt-2 font-thin max-w-2xl text-lg">
          My focus is on creating websites for those who make a living online.
          I'd like to help small businesses and creatives by creating them
          something they can use and be proud of.
        </p>
        <p className="text-gray-500 mt-2 font-thin max-w-2xl text-lg">
          If you're a social media influencer, a small business, youtuber,
          photographer, musician, or any other creative, send me an email and
          let's build something together.
        </p>
        <div className="mt-4">
          <Link href="/about">
            <a className="underline text-blue-500">
              <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-4" />
              Want to know more?
            </a>
          </Link>
        </div>
      </section>
      <section className="h-96 overflow-hidden max-w-screen-lg ml-auto mr-auto w-full rounded-lg flex items-center mt-20  ">
        <img
          src="/mtn.jpeg"
          className="w-full object-cover rounded-lg"
          alt=""
        />
      </section>

      <section className="max-w-screen-lg ml-auto mr-auto w-full mt-20">
        <h1 className={styles.h1}>What I've Done</h1>
        <p className="text-gray-500 mt-2 font-thin max-w-2xl">
          Solving problems is what I do. Below are some apps I've built in order
          to solve said problems. They range from producitivty/developer apps to
          websites for Youtubers.
        </p>

        <div className="grid grid-cols-2 mt-10 gap-4 gap-y-8 grid-list">
          {projects.map((p) => (
            <div className="flex w-full bg-gray-50 flex-col  rounded-2xl  relative">
              <div className="w-full h-20 bg-gray-900 absolute rounded-lg"></div>
              <div className="z-10 mt-6">
                <img
                  src={p.thumbnail ? p.thumbnail : "/Asset 4.svg"}
                  alt={p.title}
                  className="rounded-2xl w-28 h-28 p-4 mr-auto ml-auto bg-white shadow-lg"
                />
                <div className="flex flex-col mt-4  rounded-md p-4">
                  <NavLink href={p.url}>
                    <h2 className=" text-green-400 font-bold text-2xl underline">
                      {p.title}
                    </h2>
                  </NavLink>
                  <p className="text-gray-600 mt-2 font-thin">{p.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </Wrapper>
  );
}
