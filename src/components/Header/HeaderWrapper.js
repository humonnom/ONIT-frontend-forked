import React from 'react';
import { css } from '@emotion/css';
import { COLOR_GREY, HEADER_HEIGHT } from '../../utils/style';

const headerWrapper = ({ children }) => (
  <div
    className={css`
      position: absolute;
      top: 0;
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
