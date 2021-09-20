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
import ArticleCTA from "../../components/ArticleCTA/ArticleCTA";
import ArticleRecommends from "../../components/ArticleRecommends/ArticleRecommends";
const post = ({ source, frontmatter, posts }) => {
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
      <img
        src={frontmatter.banner}
        alt=""
        className="max-w-screen-sm w-full ml-auto mr-auto rounded-lg mt-10 shadow-lg"
      />
      <article className="prose ml-auto mr-auto mt-10 prose-blue w-full">
        <MDXRemote {...source} />
      </article>
      <ArticleCTA />
      <ArticleRecommends articles={posts} />
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
  const files = fs.readdirSync(`${process.cwd()}/blog`);

  const markdownWithMetadata = fs
    .readFileSync(path.join("blog", slug + ".md"))
    .toString();

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
      posts,
    },
  };
}

export default post;
