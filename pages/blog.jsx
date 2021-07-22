import React from "react";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Head from "next/head";
import matter from "gray-matter";
import fs from "fs";
import Hero from "../components/Hero/Hero";
import Link from "next/link";
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
              ? p.frontmatter.draft !== true
              : p
          )
          .sort((a, b) =>
            a.frontmatter.updatedAt > b.frontmatter.updatedAt ? -1 : 1
          )
          .map(
            ({
              frontmatter: { title, description, updatedAt, tags, draft },
              slug,
            }) => (
              <article key={title} className="mb-10 flex w-full max-w-2xl">
                <div className="flex flex-col">
                  <header className="flex items-center gap-6">
                    <h2>
                      <Link href={"/blog/[slug]"} as={`/blog/${slug}`}>
                        <a className="text-2xl font-bold text-gray-800">
                          {title}
                        </a>
                      </Link>
                    </h2>
                  </header>
                  <section className="mt-2">
                    <p className="text-gray-500">{description}</p>
                    {tags.length > 0 && (
                      <span className="flex gap-4 mt-4">
                        {tags.map((t) => (
                          <p className="uppercase text-xs border-2 border-green-500 text-green-500 py-1 px-3 rounded-full font-bold">
                            {t}
                          </p>
                        ))}
                      </span>
                    )}
                    <div className="text-gray-500 italic mt-2 text-sm">
                      {updatedAt}
                    </div>
                  </section>
                </div>
              </article>
            )
          )}
      </div>
    </Wrapper>
  );
};

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/blog`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(`blog/${filename}`).toString();

    const { data } = matter(markdownWithMetadata);

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
