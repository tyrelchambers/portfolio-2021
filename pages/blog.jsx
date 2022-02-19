import React from "react";
import Wrapper from "../layouts/Wrapper/Wrapper";
import matter from "gray-matter";
import fs from "fs";
import Article from "../components/Article/Article";
import { H1 } from "../components/Headings/Headings";
import { useArticles } from "../hooks/useArticles";
import CommonHead from "../components/CommonHead";

const blog = ({ posts }) => {
  const { state, searchArticles } = useArticles(posts);
  return (
    <Wrapper>
      <CommonHead title="Tyrel Chambers | Blog" />
      <div className="flex items-center justify-between flex-col sm:flex-row gap-6  mb-20">
        <H1>Blog</H1>
        <input
          type="search"
          placeholder="search for an article"
          className="bg-gray-50 p-4 rounded-full shadow-md w-full max-w-lg  text-gray-800"
          onChange={(e) => searchArticles(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {state
          .filter((p) =>
            process.env.NODE_ENV !== "development"
              ? p.frontmatter?.published !== false
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
