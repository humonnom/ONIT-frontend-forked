import React from "react";
import { css } from "@emotion/css";

const EditWrapper = ({ children }) => {
  return (
    <div
      className={css`
	  	max-width: 100%;
		  margin-left: auto;
        margin-right: auto;
        background-image: url('https://thumbs.dreamstime.com/b/dotted-grid-white-background-seamless-pattern-dots-dot-dotted-grid-white-background-seamless-pattern-dots-dot-grid-124305963.jpg');
      `}>
      {children}
    </div>
  );
};

export default EditWrapper;
