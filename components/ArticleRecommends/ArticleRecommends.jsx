import React from "react";
import Link from "next/link";

const ArticleRecommends = ({ articles }) => {
  return (
    <section className="max-w-screen-lg mt-8 w-full ml-auto mr-auto ">
      <p className="mb-4 text-lg font-bold">You might also enjoy...</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.length > 0 &&
          articles
            .filter((p) =>
              process.env.NODE_ENV !== "development"
                ? p.frontmatter.published !== false
                : p
            )

            .map(({ frontmatter, slug }) => (
              <div
                className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row"
                key={frontmatter.title}
              >
                {frontmatter.banner && (
                  <img
                    src={frontmatter.banner}
                    alt=""
                    className="w-48 rounded-lg mr-6 shadow-md object-cover article-thumb"
                  />
                )}

                <main className="flex flex-col">
                  <header className="flex items-center gap-6">
                    <h2>
                      <Link href={"/blog/[slug]"} as={`/blog/${slug}`}>
                        <a className="text-lg font-bold text-gray-800 hover:text-blue-500 transition-all">
                          {frontmatter.title}
                        </a>
                      </Link>
                    </h2>
                  </header>
                </main>
              </div>
            ))}

        <style jsx>{`
          .article-thumb {
            aspect-ratio: 16 / 9;
            width: 150px;
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
      </div>
    </section>
  );
};

export default ArticleRecommends;
