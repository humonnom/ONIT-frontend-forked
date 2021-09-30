import React from 'react';
import { css } from '@emotion/css';

const headerWrapper = ({ children }) => (
  <div
    className={css`
      position: absolute;
      top: 0;
      display: flex;
      width: 100vw;
      background-color: white;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      border-radius: 3px;
      border: 1px lightgrey solid;
      margin: auto;
    `}
  >
    {children}
  </div>
);

export default headerWrapper;
