import { useState } from "react";

export const useArticles = (initialState) => {
  const [state, setstate] = useState(initialState);

  const setArticles = (articles) => {
    setstate(articles);
  };

  const searchArticles = (query) => {
    const arr = initialState.filter((a) => {
      return (
        a.frontmatter.title.toLowerCase().includes(query.toLowerCase()) ||
        a.frontmatter.tags.includes(query)
      );
    });
    setstate(arr);
  };

  return { state, setArticles, searchArticles };
};
