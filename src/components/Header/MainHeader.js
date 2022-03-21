/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { css } from '@emotion/react';

function MainHeader({ loggedIn }) {
  const loggedInMainHeader = useMemo(() => {
    if (loggedIn)
      return (
        <>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
            onClick={() => history.push(`/feedback`)}
          >
            제안하기
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
            onClick={() => history.push(`/${myInfo.url}/`)}
          >
            내 페이지
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight39]}
            onClick={() => logout()}
          >
            로그아웃
          </button>
        </>
      );
    else
      return (
        <>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
            onClick={() => history.push(`/feedback`)}
          >
            제안하기
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
            onClick={() => makeLogInbar()}
          >
            LOG IN
          </button>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
            onClick={() =>
              history.push({
                pathname: '/join',
                state: {
                  endpoint: `${getApiEndpoint()}/auth/join/local`,
                  joinType: 'local',
                  userEmail: null,
                },
              })
            }
          >
            회원가입
          </button>
        </>
      );
  }, [loggedIn]);

  return (
    <>
      <div css={[flex, flexBtw]}>
        <a href='/main' css={[marginLeft17, height21]}>
          <img alt='img' src={logo} css={hieght100p} />
        </a>
        <div css={rightCloumn}>
          {loggedInMainHeader}
          <div />
        </div>
      </div>
      {modal.popUpLogin ? loginPopupWindow : <></>}
    </>
  );
}

const flex = css`
  display: flex;
  height: 100%;
`;

const flexBtw = css`
  justify-content: space-between;
  align-items: center;
`;

const confirmButtonWidth = css`
  width: fit-content;
`;

const rightCloumn = css`
  display: flex;
  flex-direction: row;
`;

const marginLeft17 = css`
  margin-left: 25px;
`;

const height21 = css`
  height: 21px;
`;
