import React from "react";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Head from "next/head";
import matter from "gray-matter";
import fs from "fs";
import Hero from "../components/Hero/Hero";

import Article from "../components/Article/Article";

const blog = ({ posts }) => {
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers | Blog</title>
        <meta
          name="description"
          content="Learn web development fundamentals."
        />
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
          Blog
        </h1>
      </Hero>
      <div className="max-w-screen-lg ml-auto mr-auto w-full mt-10">
        {posts
          .filter((p) =>
            process.env.NODE_ENV !== "development"
              ? p.frontmatter.published !== true
              : p
          )
          .sort()
          .map(({ frontmatter, slug }) => (
            <Article data={frontmatter} slug={slug} key={frontmatter.title} />
          ))}
      </div>
    </Wrapper>
  );
};

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/blog`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(`blog/${filename}`).toString();

    const { data } = matter(markdownWithMetadata);

    const formattedTags = data.tags ? data.tags.split(",") : [];
    const frontmatter = {
      ...data,
      tags: formattedTags,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default blog;
