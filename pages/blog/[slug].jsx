import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Footer from "../../layouts/Footer/Footer";
import ArticleCTA from "../../components/ArticleCTA/ArticleCTA";
import ArticleRecommends from "../../components/ArticleRecommends/ArticleRecommends";
import CommonHead from "../../components/CommonHead";
import { H1 } from "../../components/Headings/Headings";
const post = ({ source, frontmatter, posts }) => {
  return (
    <Wrapper>
      <CommonHead title={`Tyrel Chambers | ${frontmatter.title}`}>
        <meta property="og:url" content="https://tyrelchambers.com/blog" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={frontmatter.title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta property="og:image" content="/public/Asset 4.svg" />
        <meta property="twitter:creator" content="@imtyrelchambers" />

        <meta property="og:description" content={frontmatter.description} />
      </CommonHead>
      <H1 className="text-center ml-auto mr-auto">{frontmatter.title}</H1>
      <p className="text-gray-500 mt-4 font-thin max-w-2xl text-2xl ml-auto mr-auto text-center">
        {frontmatter.date}
      </p>
      {frontmatter?.banner && (
        <img
          src={frontmatter.banner}
          alt=""
          className="max-w-screen-sm w-full ml-auto mr-auto rounded-lg mt-20 shadow-lg"
        />
      )}
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
