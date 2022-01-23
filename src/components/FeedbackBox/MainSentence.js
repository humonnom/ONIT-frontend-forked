/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

function MainSentence() {
  return (
    <div css={sentenceBox}>
      <h2 css={[paddingTop, main, colorWhite]}>I&#39;M ON IT!</h2>
      <p css={[sub, colorWhite]}>
        함께 성장을 향한 여정을 떠나요! Onit에게 바라는 점을 보내주세요.
      </p>
    </div>
  );
}

const sentenceBox = css`
  padding-left: 20px;
`;

const paddingTop = css`
  padding-top: 43.86px;
`;

const colorWhite = css`
  color: #000;
`;

const main = css`
  height: 97.8px;
  font-size: 72px;
  font-weight: bold;
  line-height: 1.3;
  text-align: left;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 6px;
`;

const sub = css`
  height: 28.2px;
  font-size: 19.2px;
  font-weight: bolder;
  font-size: 22px;
  font-weight: 400;
  line-hiehgt: 1.5;
  text-align: left;
`;

export default MainSentence;
