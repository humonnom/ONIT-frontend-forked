/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { HeaderWrapper } from '..';
import { getPageUser } from '../../utils/parsing';
import { logo, mypage, search } from '../../asset';
import { logout } from '../../utils/logout';

function Header({ userMatch, pageUserId, pageUserName, pageType }) {
  if (pageType === 'main') {
    const user_seq = localStorage.getItem('user_seq');
    const myPageUrl = `/${user_seq}/normal`;
    return (
      <HeaderWrapper>
        <div css={[flex, flexBtw]}>
          <a href='/main' css={marginLeft36}>
            <img alt='img' src={logo} css={height26} />
          </a>
          <div css={rightCloumn}>
            <button
              type='button'
              css={[commonButtonStyle, confirmButtonWidth]}
              onClick={() => logout()}
            >
              로그아웃
            </button>
            <div />

            <a
              href='#'
              onClick={() => window.location.assign(`/${user_seq}/normal`)}
              css={marginRight36}
            >
              <img alt='img' src={mypage} css={height26} />
            </a>
          </div>
        </div>
        <div css={[abosulteCenter, flex, searchBox]}>
          <div>
            <img alt='img' src={search} css={searchLogo} />
          </div>
          <span css={searchText}>Search</span>
        </div>
      </HeaderWrapper>
    );
  } else {
    const user_seq = localStorage.getItem('user_seq');
    const page_user_seq = getPageUser();
    return (
      <HeaderWrapper>
        <div css={[flex, flexBtw]}>
          <a href='/main' css={marginLeft36}>
            <img alt='img' src={logo} css={height26} />
          </a>
          <div>
            {userMatch && (
              <button
                type='button'
                css={[commonButtonStyle, confirmButtonWidth]}
                onClick={() => window.location.assign(`/${pageUserId}/edit`)}
              >
                페이지 수정
              </button>
            )}
            {!userMatch && (
              <a
                href='#'
                onClick={() => window.location.assign(`/${user_seq}/normal`)}
                css={marginRight36}
              >
                <img alt='img' src={mypage} css={height26} />
              </a>
            )}
          </div>
        </div>
        <div css={[abosulteCenter, flex]}>
          <h3 css={[fontColorBlack]}>{pageUserName}님의 온잇</h3>
        </div>
      </HeaderWrapper>
    );
  }
}
const height26 = css`
  height: 26px;
`;

const fontColorBlack = css`
  color: #424242;
`;

const marginLeft36 = css`
  margin-left: 36px;
`;
const marginRight36 = css`
  margin-right: 36px;
`;

const flex = css`
  display: flex;
  height: 100%;
`;

const flexBtw = css`
  justify-content: space-between;
  align-items: center;
`;

const abosulteCenter = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const confirmButtonWidth = css`
  width: 99px;
  margin-right: 36px;
`;

const commonButtonStyle = css`
  display: inline-block;
  text-align: center;
  height: 26px;
  border-radius: 8px;
  border: none;
  font-size: 12px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #22222;
  background-color: #eee;
  padding: 0px;
  &:hover {
    background-color: #ef6408;
    color: #fff;
  }
`;

const searchLogo = css`
  width: 13px;
  height: 13px;
  margin-left: 14px;
`;

const searchBox = css`
  display: flex;
  width: 450px;
  height: 30px;
  align-items: center;
  border-radius: 17px;
  background-color: #fff9f6;
`;

const searchText = css`
  margin: 0 0 0 12px;
  font-family: NotoSansCJKKR;
  font-size: 14px;
  font-weight: 500;
  color: #888;
`;

const rightCloumn = css`
  display: flex;
  flex-direction: row;
`;

export default Header;
