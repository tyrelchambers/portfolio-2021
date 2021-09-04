import React from "react";
import Link from "next/link";

const Article = ({ data: { title, description, date, tags }, slug }) => {
  return (
    <article key={title} className="mb-10 flex w-full max-w-2xl">
      <div className="flex flex-col">
        <header className="flex items-center gap-6">
          <h2>
            <Link href={"/blog/[slug]"} as={`/blog/${slug}`}>
              <a className="text-2xl font-bold text-gray-800">{title}</a>
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
          <div className="text-gray-500 italic mt-2 text-sm">{date}</div>
        </section>
      </div>
    </article>
  );
};

export default Article;
