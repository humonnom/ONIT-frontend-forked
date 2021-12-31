/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { logo_gray } from '../asset';

function Footer() {
  return (
    <div
      css={css`
        font-size: 24px;
        background-color: #eee;
        height: 7vh;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <img
          css={css`
            height: 24px; //수정
            margin-left: 160px;
          `}
          src={logo_gray}
        />
      </div>
      <div
        css={css`
          display: flex;
          font-size: 15px;
          color: darkgrey;
        `}
      >
        <span
          css={css`
            margin: 0px 42px 0px 42px;
          `}
        >
          서비스소개
        </span>
        <span
          css={css`
            margin: 0px 42px 0px 42px;
          `}
        >
          공지사항
        </span>
        <span
          css={css`
            margin: 0px 42px 0px 42px;
          `}
        >
          개인정보처리방침
        </span>
        <span
          css={css`
            margin: 0px 42px 0px 42px;
          `}
        >
          운영정책
        </span>
      </div>
      <div
        css={css`
          display: flex;
          font-size: 15px;
          color: darkgrey;
          margin-right: 120px;
        `}
      >
        copyrightⓒ 2021 All rights reserved by Maaps
      </div>
    </div>
  );
}

export default Footer;
