import React from 'react';
import { css } from '@emotion/css';

const PageWrapper = ({ children }) => (
  <div
    className={css`
      display: flex;
      width: 100vw;
      margin-left: auto;
      margin-right: auto;
      background-color: rightgrey;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 30px;
    `}
  >
    {children}
  </div>
);

export default PageWrapper;
