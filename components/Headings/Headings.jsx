import React from "react";
import styles from "../../styles/headings.module.css";

export const H1 = (props) => (
  <h1
    className={`text-5xl font-thin text-gray-800 max-w-3xl mt-10 ${
      props.className ? props.className : ""
    }`}
  >
    {props.children}
  </h1>
);

export const H2 = (props) => <h2 className={styles.h2}>{props.children}</h2>;

export const H3 = (props) => <h3 className={styles.h3}>{props.children}</h3>;
