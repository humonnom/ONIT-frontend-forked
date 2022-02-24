/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const btnSize = 30;

function ToolBarButton(props) {
  return (
    <button type='button' onClick={props.action} css={commonBtn}>
      <div css={btnHover}>
        <img alt='img' width={btnSize} src={props.emoji} />
      </div>
    </button>
  );
}

export default ToolBarButton;

const commonBtn = css`
  position: relative;
  width: ${btnSize}px;
  height: ${btnSize}px;
  appearance: none;
  border: none;
  overflow: hidden;
`;

const btnHover = css`
  position: absolute;
  top: 0px;
  left: 0px;
  &:hover {
    top: -${btnSize}px;
  }
`;
