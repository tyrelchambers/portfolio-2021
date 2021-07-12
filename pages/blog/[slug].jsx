import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import Hero from "../../components/Hero/Hero";
import ReactMarkdown from "react-markdown";

const post = ({ content, frontmatter }) => {
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers | Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Quicksand:wght@300&family=Roboto:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Hero>
        <h1 className="text-7xl font-thin text-gray-200 max-w-3xl hero-title mt-10">
          {frontmatter.title}
        </h1>
        <p className="text-green-500 font-bold">{frontmatter.updatedAt}</p>
      </Hero>
      <article className="prose ml-auto mr-auto mt-10 prose-blue w-full">
        <ReactMarkdown children={content} />
      </article>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync("blog");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("blog", slug + ".mdx"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format: Month day, Year
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = data.updatedAt.toLocaleDateString("en-US", options);
  const formattedTags = data.tags ? data.tags.split(",") : [];

  const frontmatter = {
    ...data,
    updatedAt: formattedDate,
    tags: formattedTags,
  };

  return {
    props: {
      content: `# ${data.title}\n${content}`,
      frontmatter,
    },
  };
}

export default post;
