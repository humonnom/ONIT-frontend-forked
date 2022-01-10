/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import SigninRight from './SigninRight';
import LeftOnit from '../asset/LeftOnit.png';
import { Footer } from '../components';
// HACK: dongslee 다른 파일처럼 css를 JSX 바깥으로 빼주세요.
function RenderLoginPage() {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          padding: 32px;
          font-size: 24px;
          height: 93vh;
          box-sizing: border-box;
        `}
      >
        <div
          css={css`
            display: inline-flex;
            padding: 32px;
            font-size: 24px;
            margin: 0 100;
            text-align: center;
            width: 50%;
          `}
        >
          <img
            css={css`
              height: 70%;
              display: block;
              margin: auto;
            `}
            src={LeftOnit}
          />
        </div>

        <div
          css={css`
            padding-left: 8%;
            display: flex;
            align-items: center;
            font-size: 24px;
            width: 50%;
          `}
        >
          <SigninRight />
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default RenderLoginPage;
