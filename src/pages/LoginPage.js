/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import onit_illust from '../asset/onit_illust.png';
import { Footer, Login } from '../components';
// HACK: dongslee 다른 파일처럼 css를 JSX 바깥으로 빼주세요.
function LoginPage() {
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
            src={onit_illust}
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
          <Login />
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default LoginPage;
