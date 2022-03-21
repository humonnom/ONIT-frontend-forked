/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { HeaderWrapper } from '..';
import { logo, mypage } from '../../asset';
import { getApiEndpoint, logout } from '../../utils/util';
import { useMyInfo } from '../../hooks/myInfo';
import { usePostData } from '../../hooks/widget';
import { createReplacementModalAction } from '../../redux/slice';
import Login from '../Login';

function Header({ userMatch, pageUrl, pageUserName, pageType }) {
  const history = useHistory();
  const { widgets, modal } = useSelector((state) => ({
    widgets: state.info.widgets,
    modal: state.info.modal,
  }));
  const dispatch = useDispatch();

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

  function makeLogInbar() {
    if (modal.popUpLogin) {
      dispatch(
        createReplacementModalAction({
          ...modal,
          popUpLogin: false,
        })
      );
    } else if (!modal.popUpLogin) {
      dispatch(
        createReplacementModalAction({
          ...modal,
          popUpLogin: true,
        })
      );
    }
  }

  const loginWindowCSS = css`
    position: absolute;
    left: 50%;
    transform: translate(-50%, -15%);
    width: 360px;
    height: 500px;
    background-color: #fff;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
  `;

  const loginPosition = css`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const loginPopupWindow = (
    <div css={[loginPosition]}>
      <div css={[loginWindowCSS]}>
        <Login />
      </div>
    </div>
  );

  // 히스토리 푸시
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

  const mainHeader = (
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

  const loggedInFeedbackHeader = useMemo(() => {
    if (loggedIn)
      return (
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
      );
    else
      return (
        <div>
          <button
            type='button'
            css={[commonButtonStyle, confirmButtonWidth, marginRight40]}
            onClick={() => makeLogInbar()}
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
      );
  }, [loggedIn]);

  const feedbackHeader = (
    <>
      <div css={[flex, flexBtw]}>
        <a href='/main' css={[commonButtonStyle, marginLeft17, height21]}>
          <img alt='img' src={logo} css={hieght100p} />
        </a>
        {loggedInFeedbackHeader}
      </div>
      {modal.popUpLogin ? loginPopupWindow : <></>}
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

const rightCloumn = css`
  display: flex;
  flex-direction: row;
`;

export default Header;
