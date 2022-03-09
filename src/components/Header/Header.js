/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { HeaderWrapper } from '..';
import { logo, mypage, search } from '../../asset';
import { logout } from '../../utils/util';
import { useMyInfo } from '../../hooks/myInfo';
import { usePostData } from '../../hooks/widget';

function Header({ userMatch, pageUrl, pageUserName, pageType }) {
  const history = useHistory();
  const { widgets } = useSelector((state) => ({
    widgets: state.info.widgets,
  }));
  const { loggedIn, myInfo } = useMyInfo();
  const { post } = usePostData();

  const goToMyPage = useMemo(() => {
    if (myInfo) {
      return (
        <button type='button' onClick={() => history.push(`/${myInfo.url}`)}>
          <img alt='img' src={mypage} css={height21} />
        </button>
      );
    }
    return null;
  }, [myInfo]);

  const mainHeader = (
    <>
      <div css={[flex, flexBtw]}>
        <a href='/main' css={[marginLeft17, height21]}>
          <img alt='img' src={logo} css={hieght100p} />
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
          {loggedIn && goToMyPage}
        </div>
      </div>
      <div css={[abosulteCenter, flex, searchBox]}>
        <div>
          <img alt='img' src={search} css={searchLogo} />
        </div>
        <span css={searchText}>Search</span>
      </div>
    </>
  );

  const normalHeader = (
    <>
      <div css={[flex, flexBtw]}>
        <a href='/main' css={[marginLeft17, height21]}>
          <img alt='img' src={logo} css={hieght100p} />
        </a>
        <div>
          {userMatch && (
            <>
              <button
                type='button'
                css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
                onClick={() => logout()}
              >
                로그아웃
              </button>
              <button
                type='button'
                css={[commonButtonStyle, confirmButtonWidth, marginRight39]}
                onClick={() => history.push(`/${pageUrl}/edit`)}
              >
                페이지 수정
              </button>
            </>
          )}
          {!userMatch && loggedIn && goToMyPage}
        </div>
      </div>
      <div css={[abosulteCenter, flex, height21]}>
        <p css={fontStyle}>{pageUserName}님의 온잇</p>
      </div>
    </>
  );

  const editHeader = (
    <>
      <div css={[flex, flexBtw]}>
        <a href='/main' css={[marginLeft17, height21]}>
          <img alt='img' src={logo} css={hieght100p} />
        </a>
        <div>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
            onClick={() => {
              history.push(`/${pageUrl}`);
            }}
          >
            저장하지 않고 나가기
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight39]}
            onClick={() => post(widgets.list)}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );

  const feedbackHeader = (
    <>
      <div css={[flex, flexBtw]}>
        <a href='/main' css={[commonButtonStyle, marginLeft17, height21]}>
          <img alt='img' src={logo} css={hieght100p} />
        </a>
        {loggedIn === true ? (
          <div>
            <button
              type='button'
              css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
              onClick={() => logout()}
            >
              로그아웃
            </button>
            <button
              type='button'
              css={[commonButtonStyle, confirmButtonWidth, marginRight39]}
              onClick={() => history.push(`/${myInfo.url}`)}
            >
              내 페이지 가기
            </button>
          </div>
        ) : (
          <div>
            <button
              type='button'
              css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
              onClick={() => history.push(`/login`)}
            >
              LOG IN
            </button>
            <button
              type='button'
              css={[commonButtonStyle, confirmButtonWidth, marginRight39]}
              onClick={() => history.push(`/join`)}
            >
              회원가입
            </button>
          </div>
        )}
      </div>
    </>
  );

  function chooseFitHeader() {
    if (pageType === 'main') {
      return mainHeader;
    } else if (pageType === 'normal') {
      return normalHeader;
    } else if (pageType === 'edit') {
      return editHeader;
    } else if (pageType === 'feedback') {
      return feedbackHeader;
    } else {
      return <div>정의되지 않은 타입입니다.</div>;
    }
  }

  return <HeaderWrapper>{chooseFitHeader()}</HeaderWrapper>;
}

export default Header;

const height21 = css`
  height: 21px;
`;

const hieght100p = css`
  height: 100%;
`;

const fontStyle = css`
  font-size: 16.5px;
  font-weight: 500;
  line-height: 26px;
  height: 26px;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;

const marginLeft17 = css`
  margin-left: 25px;
`;

const marginRight39 = css`
  margin-right: 39px;
`;

const marginRight40 = css`
  margin-right: 40px;
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
  width: fit-content;
`;

const commonButtonStyle = css`
  display: inline-block;
  text-align: justify;
  height: 35px;
  border-radius: 17px;
  border: none;
  font-size: 13.5px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000;
  padding: 0px;
  &:hover {
    color: #ef6408;
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
