/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { logo } from '../../asset';

function FeedbackHeader() {
  return (
    <header css={[headerCss, spaceBetween]}>
      <img src={logo} />
      <nav>
        <ul css={[spaceBetween]}>
          <li css={liBox}>
            <a href='https://iamonit.kr/login'>로그인</a>
          </li>
          <li css={liBox}>
            <a href='https://iamonit.kr/login'>서비스 소개</a>
          </li>
          <li css={liBox}>
            <a href='https://iamonit.kr/login'>내 페이지로 가기</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const liBox = css`
  width: 150px;
  height: 41.4px;
  border: solid 1px rgba(112, 112, 112, 0.31);
  background-color: rgba(255, 255, 255, 0.31);
  text-align: center;
  line-height: 41.4px;
  font-weight: bold;
`;

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const headerCss = css`
  padding-top: 71.4px;
  padding: 20px;
  margin: 0 auto;
  height: 80px;
`;

export default FeedbackHeader;
