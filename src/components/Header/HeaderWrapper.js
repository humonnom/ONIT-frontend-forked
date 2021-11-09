import React from 'react';
import { css } from '@emotion/css';
import { COLOR_GREY, HEADER_HEIGHT } from '../../utils/style';

const headerWrapper = ({ children }) => (
  <div
    className={css`
      top: 0;
      z-index: 999;
      background-color: white;
      position: sticky;
      display: flex;
      width: 100vw;
      height: ${HEADER_HEIGHT};
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      border-radius: 3px;
      border: 1px ${COLOR_GREY} solid;
      padding: 0;
    `}
  >
    {children}
  </div>
);

export default headerWrapper;
