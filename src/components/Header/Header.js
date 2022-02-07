/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { HeaderWrapper } from '..';
import { logo, mypage, search } from '../../asset';
import { logout } from '../../utils/router';

function Header({ userMatch, pageUserId, pageUserName, pageType }) {
  if (pageType === 'main') {
    const user_seq = localStorage.getItem('user_seq');
    return (
      <HeaderWrapper>
        <div css={[flex, flexBtw]}>
          <a href='/main' css={marginLeft17}>
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
              onClick={() => window.location.assign(`/${user_seq}`)}
              css={marginRight17}
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
    return (
      <HeaderWrapper>
        <div css={[flex, flexBtw]}>
          <a href='/main' css={marginLeft17}>
            <img alt='img' src={logo} css={height26} />
          </a>
          <div>
            {userMatch && (
              <>
                <button
                  type='button'
                  css={[commonButtonStyle, confirmButtonWidth, marginRight12]}
                  onClick={() => logout()}
                >
                  로그아웃
                </button>
                <button
                  type='button'
                  css={[commonButtonStyle, confirmButtonWidth, marginRight17]}
                  onClick={() => window.location.assign(`/${pageUserId}/edit`)}
                >
                  페이지 수정
                </button>
              </>
            )}
            {!userMatch && (
              <a
                href='#'
                onClick={() => window.location.assign(`/${user_seq}`)}
                css={marginRight17}
              >
                <img alt='img' src={mypage} css={height26} />
              </a>
            )}
          </div>
        </div>
        <div css={[abosulteCenter, flex, height26]}>
          <p css={fontStyle}>{pageUserName}님의 온잇</p>
        </div>
      </HeaderWrapper>
    );
  }
}

export default Header;
const height26 = css`
  height: 26px;
`;

const fontStyle = css`
  font-size: 16.5px;
  font-weight: 500;
  line-height: 26px;
  padding-top: 1px;
  height: 26px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;

const marginLeft17 = css`
  margin-left: 17px;
`;

const marginRight17 = css`
  margin-right: 17px;
`;

const marginRight12 = css`
  margin-right: 12px;
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
  width: 130px;
`;

const commonButtonStyle = css`
  display: inline-block;
  text-align: center;
  height: 35px;
  border-radius: 17px;
  border: none;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #707070;
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
