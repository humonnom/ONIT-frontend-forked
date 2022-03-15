/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';
import { PageWrapper } from '../components';
import { useMyInfo } from '../hooks/myInfo';
import { COLOR_STYLE, FlexColCenter } from '../styles/GlobalStyles';

function SplashPage() {
  const history = useHistory();
  const { loggedIn, myInfo } = useMyInfo();

  const dest = useMemo(() => {
    if (loggedIn === true) {
      return `/${myInfo.url}`;
    } else if (loggedIn === false) {
      return 'main';
    }
    return null;
  }, [loggedIn, myInfo]);

  useEffect(() => {
    if (dest) {
      history.push(dest);
    }
  }, [dest]);

  return (
    <PageWrapper>
      <div css={Container}>
        <div css={FlexColCenter}>
          <span css={Emoji}>🏃‍♀️🏃</span>
          <p>열심히 로딩중입니다.</p>
          <p>잠시만 기다려주세요!</p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default SplashPage;

const Container = css`
  ${FlexColCenter}
  position: fixed;
  top: 30%;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 360px;
  max-height: 300px;
  margin: 0 auto;
  transform: translateY(-50%);
  p {
    color: ${COLOR_STYLE.brownishGrey};
    font-size: 15px;
    margin-bottom: 13px;
  }
`;
const Emoji = css`
  margin-bottom: 20px;
  font-size: 45px;
`;
