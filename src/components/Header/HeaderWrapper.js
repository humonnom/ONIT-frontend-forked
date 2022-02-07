import React from 'react';
import { css } from '@emotion/css';
import { HEADER_HEIGHT } from '../../styles/style';

const headerWrapper = ({ children }) => (
  <div
    className={css`
      position: fixed;
      top: 30px;
      left: 0px;
      z-index: 999;
      background-color: white;
      min-width: 1124px;
      width: 97%;
      height: ${HEADER_HEIGHT};
      flex-direction: row;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
      padding: 0;
      margin: 0 1.5%;
      border-radius: 15px;
    `}
  >
    {children}
  </div>
);

export default headerWrapper;
