/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import { createReplacementWidgetsAction } from '../../../redux/slice';
import {
  ACTION_CREATE,
  ACTION_NONE,
  TYPE_VIDEO,
} from '../../../utils/constantValue';
import { popButtonsWrapper } from '../../../styles/popWindowStyle';

function PopNonType(props) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.endPop();
    }
  };

  return (
    <>
      <div css={[urlInputStyle]} onKeyDown={handleKeyDown}>
        개발중인 위젯입니다
      </div>
      <div css={popButtonsWrapper}>
        <button
          type='button'
          css={[commonButtonStyle, cancelButtonStyle]}
          onClick={() => {
            props.endPop();
          }}
        >
          취소
        </button>
        <button
          type='button'
          css={[commonButtonStyle, confirmButtonStyle]}
          onClick={() => {
            props.endPop();
          }}
        >
          확인
        </button>
      </div>
    </>
  );
}

const urlInputStyle = css`
  display: block;
  width: 440px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin: 28px auto 32px auto;
  border-radius: 8px;
  background-color: #fff;
  padding: 12px 20px;
`;

const commonButtonStyle = css`
  display: inline-block;
  height: 48px;
  width: 160px;
  border-radius: 24px;
  border: none;
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.9;
  letter-spacing: normal;
  color: #bbb;
  background-color: #fff;
  padding: 0px;
  &:hover {
    background-color: #ef6408;
    color: #fff;
  }
`;
const confirmButtonStyle = css`
  margin: 0 0 0 10px;
`;

const cancelButtonStyle = css`
  margin: 0 0 0 190px;
`;

export default PopNonType;
