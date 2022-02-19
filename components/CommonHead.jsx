import Head from "next/head";
import React from "react";

const CommonHead = ({ title = "Tyrel Chambers" }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Quicksand:wght@400;700&family=Lobster&family=Roboto:wght@300;400;700;900&display=swap"
        rel="stylesheet"
      ></link>

      <meta
        name="description"
        content="Web developer from Peterborough, Ontario."
      />
    </Head>
  );
};

export default CommonHead;
