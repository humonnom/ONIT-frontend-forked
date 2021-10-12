import React from 'react';
import { css } from '@emotion/css';
import { HEADER_HEIGHT, COLOR_GREY } from '../../utils/style';

function ToolBarPartition(props) {
  return (
    <div
      className={css`
        height: ${HEADER_HEIGHT};
        margin: 15px;
        border-right: 1px solid ${COLOR_GREY};
      `}
    />
  );
}

export default ToolBarPartition;
