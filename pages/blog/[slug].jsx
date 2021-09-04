import React, { useEffect } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import Hero from "../../components/Hero/Hero";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const post = ({ source, frontmatter }) => {
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers | Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Quicksand:wght@300;400;600;700&family=Roboto:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        ></link>
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="tyrelchambers"
          data-description="Support me on Buy me a coffee!"
          data-message="If you enjoyed this post and found it useful, feel free to buy me a pizza or share on social media 😀"
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
        <meta property="og:url" content="https://tyrelchambers.com/blog" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={frontmatter.title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta property="og:image" content="/public/Asset 4.svg" />
        <meta property="twitter:creator" content="@imtyrelchambers" />

        <meta property="og:description" content={frontmatter.description} />
      </Head>
      <Hero>
        <h1 className="text-7xl font-thin text-gray-200 max-w-3xl hero-title mt-10">
          {frontmatter.title}
        </h1>
        <p className="text-green-500 font-bold">{frontmatter.date}</p>
      </Hero>
      <article className="prose ml-auto mr-auto mt-10 prose-blue w-full">
        <MDXRemote {...source} />
      </article>
    </Wrapper>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync("blog");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("blog", slug + ".md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);
  const mdxSource = await serialize(content);
  // Convert post date to format: Month day, Year
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = data.date.toLocaleDateString("en-US", options);
  const formattedTags = data.tags ? data.tags.split(",") : [];

  const frontmatter = {
    ...data,
    date: formattedDate,
    tags: formattedTags,
    rawMarkdown: markdownWithMetadata,
  };

  return {
    props: {
      source: mdxSource,
      frontmatter,
    },
  };
}

export default post;
