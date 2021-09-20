import React from "react";
import { css } from "@emotion/css";

const PageWrapper = ({ children }) => {
  return (
    <div
      className={css`
        display: flex;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
        background-color: rightgrey;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 50px;
      `}>
      {children}
    </div>
  );
};

export default PageWrapper;
