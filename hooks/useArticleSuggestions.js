import { useEffect, useState } from "react";
import { getRandomInt } from "../libs/randomInt";

export const useArticleSuggestions = (articles) => {
  const [suggestions, setSuggestions] = useState(articles);

  useEffect(() => {
    const articleIndex1 = getRandomInt(0, articles.length - 1);
    let articleIndex2 = getRandomInt(0, articles.length - 1);

    if (articleIndex1 === articleIndex2) {
      articleIndex2 = getRandomInt(0, articles.length - 1);
    }

    setSuggestions([articles.at(articleIndex1), articles.at(articleIndex2)]);
  }, [articles]);

  return {
    suggestions,
  };
};
