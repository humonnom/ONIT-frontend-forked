/** @jsxImportSource @emotion/react */
import React, { useRef } from 'react';
import { css } from '@emotion/react';
import { WIDGET_COMMON_RADIUS } from '../../../styles/style';
import { useDetachOutsideClick } from '../../../hooks/widget';

function NewBox({ deleteMyself, index }) {
  const wrapperRef = useRef(null);
  const action = () => deleteMyself(index);
  useDetachOutsideClick(wrapperRef, action);
  return <div ref={wrapperRef} css={newWidget} />;
}

export default NewBox;

const newWidget = css`
  width: 100%;
  height: 100%;
  border-radius: ${WIDGET_COMMON_RADIUS};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
`;
