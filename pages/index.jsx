import NavLink from "../components/NavLink/NavLink";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Wrapper from "../layouts/Wrapper/Wrapper";
import Footer from "../layouts/Footer/Footer";
import CommonHead from "../components/CommonHead";
import { projects } from "../constants/projects";
import fs from "fs";
import matter from "gray-matter";
import Article from "../components/Article/Article";
import { useArticles } from "../hooks/useArticles";
import { H1, H2 } from "../components/Headings/Headings";

export default function Home({ posts }) {
  const { state } = useArticles(posts);

  return (
    <Wrapper>
      <CommonHead />

      <section className="max-w-screen-lg  w-full ">
        <H1>Hey, I'm Tyrel Chambers 👋</H1>

        <p className="text-gray-500 mt-4 font-thin max-w-2xl text-2xl">
          I'm a full-stack web developer. In my free-time I enjoy programming
          and photography.
        </p>
      </section>

      <section className="mt-10 border-t-[1px] border-b-[1px] border-gray-200 pt-10 pb-10">
        <H2>Recently Published</H2>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-8 gap-6">
          {state
            .filter((p) =>
              process.env.NODE_ENV !== "development"
                ? p.frontmatter.published !== false
                : p
            )
            .sort((a, b) => {
              return a.frontmatter.date > b.frontmatter.date ? -1 : 1;
            })
            .slice(0, 4)
            .map(({ frontmatter, slug }) => (
              <Article data={frontmatter} slug={slug} key={frontmatter.title} />
            ))}
        </div>
        <NavLink
          href="/blog"
          className="underline flex items-center text-gray-500 hover:text-gray-900 transition-all mt-6"
        >
          <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-4" />
          Read more articles
        </NavLink>
      </section>

      <section className=" w-full mt-20">
        <H2>What I've Done</H2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-6 gap-4 gap-y-8 grid-list">
          {projects.map((p) => (
            <div className="flex w-full" key={p.title}>
              <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start">
                <img
                  src={p.thumbnail ? p.thumbnail : "/Asset 4.svg"}
                  alt={p.title}
                  className="rounded-2xl w-28 h-28 p-4  bg-white shadow-lg"
                />
                <div className="flex flex-col  rounded-md p-4">
                  <NavLink href={p.url}>
                    <h3 className=" text-gray-900 font-bold text-2xl underline">
                      {p.title}
                    </h3>
                  </NavLink>
                  <p className="text-gray-600 mt-2 font-thin">{p.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .main-title {
          font-size: 3rem;
          text-align: center;
          margin-top: 2em;
        }
      `}</style>
    </Wrapper>
  );
}

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
