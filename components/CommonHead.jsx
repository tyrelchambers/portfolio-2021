import Head from "next/head";
import React from "react";

const CommonHead = ({ title = "Tyrel Chambers", children }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />

      <meta
        name="description"
        content="Web developer from Peterborough, Ontario."
      />
      {children}
    </Head>
  );
};

export default CommonHead;
