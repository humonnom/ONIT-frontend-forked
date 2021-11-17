/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, jsx } from '@emotion/react';
import { HeaderWrapper } from '..';
import { getPageUser } from '../../utils/parsing';
import { logo } from '../../asset';

function Header({ userMatch, pageUserId, pageUserName }) {
  // const { user } = useSelector((state) => ({
  //   user: state.info.user,
  // }));
  const user_seq = localStorage.getItem('user_seq');
  const page_user_seq = getPageUser();
  console.log('=====header=====');
  console.log(pageUserId);
  // TODO: user가 localStorage를 조작할 수 있으므로 확인할 방법이 필요함.
  // 해결책: editpage 렌더할때 확인한다.

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
        </div>
      </div>
      <div css={[abosulteCenter, flex]}>
        <h3 css={[fontColor]}>{pageUserName}님의 온잇</h3>
      </div>
    </HeaderWrapper>
  );
}
const height26 = css`
  height: 26px;
`;

const fontColor = css`
  color: #424242;
`;

const marginLeft36 = css`
  margin-left: 36px;
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

export default Header;
