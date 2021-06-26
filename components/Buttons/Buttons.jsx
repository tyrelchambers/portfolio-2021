import React from "react";
import styles from "../../styles/buttons.module.css";

export const MainBtn = (props) => {
  return (
    <button
      type="button"
      className={`${styles.wrapper} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </button>
  );
};
