/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';
import Tape from '../asset/tape.svg';
import { getApiEndpoint } from '../utils/util';
// HACK: dongslee 컴포넌트 이름을 이해하기가 힘들어요.

function SigninRight() {
  const signInWithKakao = () => {
    const endpoint = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(endpoint);
  };
  const history = useHistory();

  const handleLocalJoin = () => {
    history.push({
      pathname: '/join',
      state: {
        endpoint: `${getApiEndpoint()}/auth/join/local`,
        joinType: 'local',
        userEmail: null,
      },
    });
  };
  const signinRightStyle = {
    textAlign: 'center',
    position: 'relative',
    width: '400px',
    height: '415px',
    boxSizing: 'border-box',
    verticalAlignt: 'middle',
    borderRadius: '2px',
    backgroundColor: 'rgba(254, 245, 238, 1)',
    boxShadow: '15px 15px 42px 0px rgb(190,190,190)',
    padding: '72px 24px 0',
  };

  const inputStyle = {
    height: '50px',
    boxSizing: 'border-box',
    display: 'block',
    width: '100%',
    fontSize: '14px',
    color: 'rgba(187, 187, 187, 1)',
    borderRadius: '8px',
    border: '2px solid rgba(178, 178, 178, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    textIndent: '15px',
  };

  const signupButtonStyle = {
    width: '352px',
    height: '56px',
    borderRadius: '8px',
    border: '2px solid rgba(239, 100, 8, 1)',
    backgroundColor: 'rgba(239, 100, 8, 1)',
    margin: '3px',
    color: 'rgba(255, 255, 255,1)',
    fontWeight: 'bold',
    fontSize: '15px',
  };
  const signupButtonStyleKakao = {
    width: '352px',
    height: '56px',
    borderRadius: '8px',
    border: '2px solid rgba(255, 225, 28, 1)',
    backgroundColor: 'rgba(255, 225, 28, 1)',
    margin: '3px',
    color: 'rgba(55, 55, 55,1)',
    fontWeight: 'bold',
    fontSize: '15px',
  };

  return (
    <div style={signinRightStyle}>
      <img
        css={css`
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
        `}
        src={Tape}
      />
      <input
        style={{ ...inputStyle, marginBottom: '15px' }}
        placeholder='Type Your Email ID'
      />
      <input
        style={{ ...inputStyle, marginBottom: '12px' }}
        placeholder='Type Your Password'
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input id='persist-login-checkbox' type='checkbox' />
          <label htmlFor='persist-login-checkbox'>로그인 유지</label>
        </div>
        <div>
          <label>비밀번호찾기</label>
        </div>
      </div>
      <button type='button' style={signupButtonStyle}>
        Sign up
      </button>
      <button
        type='button'
        style={signupButtonStyleKakao}
        onClick={signInWithKakao}
      >
        Kakao Login
      </button>
      <p css={joinMessege}>아직 onit의 회원이 아니세요?</p>
      <button type='button' onClick={handleLocalJoin} css={joinButton}>
        회원가입
      </button>
    </div>
  );
}

export default SigninRight;

const joinMessege = css`
  font-size: 11px;
  margin: 20px 0 0 0;
  font-weight: 400;
  color: #6d6771;
  ${'' /* font-style: italic; */}
`;
const joinButton = css`
  font-size: 12px;
  margin: 5px 0 5px 0;
  font-weight: 600;
`;
