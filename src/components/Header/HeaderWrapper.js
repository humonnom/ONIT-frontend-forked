import React from 'react';
import { css } from '@emotion/css';
import { HEADER_HEIGHT } from '../../utils/style';

const headerWrapper = ({ children }) => (
  <div
    className={css`
      top: 0;
      z-index: 999;
      background-color: white;
      minwidth: 1124px;
      width: 100vw;
      height: ${HEADER_HEIGHT};
      flex-direction: row;
      position: sticky;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
      padding: 0;
    `}
  >
    {children}
  </div>
);

export default headerWrapper;
