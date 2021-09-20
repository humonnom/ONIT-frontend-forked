import React from "react";
import { css } from "@emotion/css";

const ToolBarWrapper = ({ children }) => {
  return (
    <div
      className={css`
				display: flex;
				max-width: 100%;
				background-color: white;
				flex-direction: row;
				padding: 5px 100px;
				justify-content: start;
				align-items: center;
				border-radius: 3px;
				border: 1px grey solid;
				margin: auto;
			`}>
      {children}
    </div>
  );
};

export default ToolBarWrapper;
