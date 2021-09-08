import React from "react";
import Link from "next/link";

const Article = ({ data: { title, description, tags, banner }, slug }) => {
  return (
    <article key={title} className="mb-10 flex w-full max-w-2xl article">
      {banner && (
        <img
          src={banner}
          alt=""
          className="w-48 rounded-lg mr-6 shadow-md object-cover article-thumb"
        />
      )}
      <div className="flex flex-col">
        <header className="flex items-center gap-6">
          <h2>
            <Link href={"/blog/[slug]"} as={`/blog/${slug}`}>
              <a className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-all">
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
                <p
                  className="uppercase text-xs text-green-500  rounded-full font-bold"
                  key={t}
                >
                  {t}
                </p>
              ))}
            </span>
          )}
        </section>
      </div>
      <style jsx>{`
        .article-thumb {
          aspect-ratio: 16 / 9;
          width: 240px;
        }

        @media screen and (max-width: 425px) {
          .article {
            flex-direction: column;
          }

          .article-thumb {
            width: 100%;
            margin-bottom: 1em;
          }
        }
      `}</style>
    </article>
  );
};

export default Article;
