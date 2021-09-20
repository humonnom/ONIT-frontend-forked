import React from "react";
import { css } from "@emotion/css";

const NormalWrapper = ({ children }) => {
  return (
    <div
      className={css`
	  	max-width: 100%;
		  margin-left: auto;
        margin-right: auto;
      `}>
      {children}
    </div>
  );
};

export default NormalWrapper;
