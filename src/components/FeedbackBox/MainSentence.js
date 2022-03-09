/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import feedbackheader from './feedbackheader.svg';

function MainSentence() {
  return (
    <div css={[paddingLeft, paddingTop]}>
      <img src={feedbackheader} width='570' />
    </div>
  );
}

const paddingLeft = css`
  padding-left: 30px;
`;

const paddingTop = css`
  padding-top: 43.86px;
`;

export default MainSentence;
