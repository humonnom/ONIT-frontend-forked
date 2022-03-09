/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import {
  commonBtn,
  FlexColCenter,
  getAbsoluteBtn,
  InitButtonStyle,
  OrangeColorButton,
  RoundButtonSmall,
  SHADOW_STYLE,
} from '../../../styles/GlobalStyles';
import { closeSet } from '../../../asset';

const { btn, img } = getAbsoluteBtn(25, 42, 25);
function PopNonType(props) {
  return (
    <div css={[Container]}>
      <button
        type='button'
        css={[commonBtn, btn]}
        onClick={() => {
          props.endPop();
        }}
      >
        <div css={img}>
          <img alt='img' height='50px' src={closeSet} />
        </div>
      </button>
      <div css={TempMessage}>개발중인 위젯입니다</div>
      <button
        type='button'
        css={[InitButtonStyle, OrangeColorButton, RoundButtonSmall]}
        onClick={() => {
          props.endPop();
        }}
      >
        확인
      </button>
    </div>
  );
}
const TempMessage = css`
  margin-top: 50px;
  margin-bottom: 40px;
`;

const Container = css`
  ${FlexColCenter}
  ${SHADOW_STYLE.pale}
  width: 100%;
  margin: 30px 0 20px 0;
`;

export default PopNonType;
