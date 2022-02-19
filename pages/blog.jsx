import React from "react";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Head from "next/head";
import matter from "gray-matter";
import fs from "fs";
import Hero from "../components/Hero/Hero";
import Article from "../components/Article/Article";
import { H2 } from "../components/Headings/Headings";
import { useArticles } from "../hooks/useArticles";
import CommonHead from "../components/CommonHead";

const blog = ({ posts }) => {
  const { state, searchArticles } = useArticles(posts);
  return (
    <Wrapper>
      <CommonHead title="Tyrel Chambers | Blog" />
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-5xl font-bold">Blog</h1>
        <input
          type="search"
          placeholder="search for an article"
          className="bg-gray-200 p-4 rounded-full shadow-md w-full max-w-lg  text-gray-800"
          onChange={(e) => searchArticles(e.target.value)}
        />
      </div>

      <div className="max-w-screen-lg  w-full mt-10">
        {state
          .filter((p) =>
            process.env.NODE_ENV !== "development"
              ? p.frontmatter.published !== false
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
