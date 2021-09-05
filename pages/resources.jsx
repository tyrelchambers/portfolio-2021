import React from "react";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Head from "next/head";
import Hero from "../components/Hero/Hero";
import P from "../components/P/P";
import { H2, H3 } from "../components/Headings/Headings";
import {
  books,
  codeResources,
  communication,
  designSoftware,
  photography,
  projectManagement,
  servers,
  sourceControl,
  tutorials,
} from "../constants/resources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCamera,
  faCloudUploadAlt,
  faCode,
  faComments,
  faDesktop,
  faFile,
  faGraduationCap,
  faPaintBrush,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import Tile from "../components/Tile/Tile";

const resources = () => {
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers | Resources</title>
        <meta
          name="description"
          content="Creator resources that've helped me"
        />
      </Head>
      <Hero>
        <h1 className="text-7xl font-thin text-gray-200 max-w-3xl hero-title mt-10">
          Creator Resources
        </h1>
      </Hero>
      <main className="max-w-screen-lg mt-20 ml-auto mr-auto w-full">
        <H2>A Curated List of Helpful Resources</H2>
        <P>
          Here you will find a list of my own personal bookmarks, books I love
          and think you should get, and anything else I believe you will enjoy.
          I will try to keep this update to date with any new resources I find!
          I hope this helps you out!
        </P>
        <P>
          Have something you think belongs on this list? Send me an email with a
          link and the name of the tool or book/article to{" "}
          <a href="mailto:tychambers3@gmail.com?subject=New Resource">
            tychambers3@gmail.com.
          </a>
        </P>

        <section className="mt-20">
          <div>
            <H3>Photography</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {photography.map((value, key) => (
                <Tile data={value} key={key} icon={faCamera} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Tutorials</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {tutorials.map((data, key) => (
                <Tile data={data} icon={faGraduationCap} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Code Resources</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {codeResources.map((data, key) => (
                <Tile data={data} icon={faCode} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Source Control</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {sourceControl.map((data, key) => (
                <Tile data={data} icon={faCloudUploadAlt} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Cheat Sheets</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {sourceControl.map((data, key) => (
                <Tile data={data} icon={faFile} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Colour Pickers</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {sourceControl.map((data, key) => (
                <Tile data={data} icon={faPaintBrush} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Articles</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {sourceControl.map((data, key) => (
                <Tile data={data} icon={faBook} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Hosting</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {servers.map((data, key) => (
                <Tile data={data} icon={faServer} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Communication</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {communication.map((data, key) => (
                <Tile data={data} icon={faComments} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Design Software</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {designSoftware.map((data, key) => (
                <Tile data={data} icon={faDesktop} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Project Management</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {projectManagement.map((data, key) => (
                <Tile data={data} icon={faComments} key={key} />
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <H3>Books</H3>
            <ul className="grid grid-cols-3 grid-list gap-4 mt-6">
              {books.map((data, key) => (
                <Tile data={data} key={key} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Wrapper>
  );
};

export default resources;
