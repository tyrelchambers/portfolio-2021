import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import Hero from "../../components/Hero/Hero";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Footer from "../../layouts/Footer/Footer";
import NavLink from "../../components/NavLink/NavLink";
const post = ({ source, frontmatter }) => {
  return (
    <Wrapper>
      <Head>
        <title>Tyrel Chambers | {frontmatter.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Quicksand:wght@400;700&family=Lobster&family=Roboto:wght@300;400;700;900&display=swap"
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
        <p className="text-green-500 font-bold mt-4">{frontmatter.date}</p>
      </Hero>
      <article className="prose ml-auto mr-auto mt-10 prose-blue w-full">
        <MDXRemote {...source} />
      </article>
      <section className="bg-gray-800 p-4 rounded-lg mt-20">
        <div className="max-w-screen-lg w-full ml-auto mr-auto">
          <p className="text-gray-100 text-xl font-bold">
            Did you enjoy this article?
          </p>
          <p className="text-gray-300">
            Check out these awesome{" "}
            <NavLink href="/resources" className="styled-link">
              resources
            </NavLink>{" "}
            and follow me on{" "}
            <NavLink
              href="https://twitter.com/imtyrelchambers"
              className="styled-link"
            >
              Twitter!
            </NavLink>
          </p>
        </div>
      </section>
      <Footer />
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

  const formattedTags = data.tags ? data.tags.split(",") : [];

  const frontmatter = {
    ...data,
    tags: formattedTags,
  };

  return {
    props: {
      source: mdxSource,
      frontmatter,
    },
  };
}

export default post;
