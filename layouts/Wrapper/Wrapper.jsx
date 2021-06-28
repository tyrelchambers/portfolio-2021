import React from "react";

const Wrapper = (props) => {
  return (
    <div className="flex flex-col ml-auto mr-auto p-4">{props.children}</div>
  );
};

export default Wrapper;
