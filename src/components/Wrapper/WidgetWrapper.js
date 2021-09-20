import React from "react";
import { css } from "@emotion/css";

const WidgetWrapper = ({ children }) => {
  return (
    <div
      className={css`
				display: 'flex';
				padding: 10px;
				justify-content: 'center';
				align-items: 'center';
				flex-direction: 'column';
				border-radius: 10px;
				border: 1px grey solid;
			`}>
      {children}
    </div>
  );
};

export default WidgetWrapper;
