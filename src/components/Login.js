/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';
import Tape from '../asset/tape.svg';
import { getApiEndpoint, setLocalStorage } from '../utils/util';
import useRequestJoin from '../hooks/useRequestJoin';
import { useInput } from '../hooks/useInput';
import { COLOR_STYLE, InitButtonStyle } from '../styles/GlobalStyles';
import { useRequestAuth } from '../hooks/useRequestAuth';
// import useSaveUserInfo from '../hooks/useSaveUserInfo';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const email = useInput({
    inputType: 'email',
    id: 'email',
    type: 'email',
  });

  const password = useInput({
    inputType: 'password',
    id: 'password',
    type: showPassword ? 'text' : 'password',
    button: (
      <button type='button' onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? '비밀번호 숨기기' : '비밀번호 보이기'}
      </button>
    ),
  });

  const endpointLogin = `${getApiEndpoint()}/auth/login/local`;
  const { res, request } = useRequestJoin({
    endpoint: endpointLogin,
    method: 'get',
    data: {
      email: email.value,
      password: password.value,
    },
  });
  const { res: userInfoRes, request: userInfoRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/me`,
    method: 'get',
  });

  // const { res: savedUserInfo, request: saveUserInfoToRedux } = useSaveUserInfo({
  //   url: 'normal',
  //   nickname: '주은',
  //   userSeq: 73,
  //   field: ['painting'],
  // });

  const handleKakaoLogin = () => {
    const endpoint = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(endpoint);
  };
  const history = useHistory();

  const handleLocalLogin = () => {
    console.log('로그인 요청');
    request();
  };

  useEffect(() => {
    if (res && res.data) {
      if (
        res.data.code === 'unauthorized' &&
        res.data.message === 'password incorrect'
      ) {
        alert('비밀번호를 잘못 입력하셨습니다.');
      } else if (res.data.code === 'unauthorized') {
        alert('존재하지 않는 아이디입니다.');
      } else if (res.data.code === 'ok') {
        setLocalStorage(res.data.data);
        userInfoRequest();
      }
    }
  }, [res, userInfoRequest]);

  useEffect(() => {
    if (userInfoRes && userInfoRes.data) {
      if (userInfoRes.data.code !== 'ok') {
        alert('정보를 가져오는 과정에서 오류가 발생하였습니다.');
      } else {
        console.log(userInfoRes.data.data);
        // TODO: save to redux
        // saveUserInfoToRedux();
        history.push(userInfoRes.data.data.url);
      }
    }
  }, [userInfoRes]);

  // useEffect(() => {
  //   console.log(savedUserInfo);
  // }, [savedUserInfo]);

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

  return (
    <div style={Container}>
      <img css={TapeStyle} src={Tape} />
      <form onSubmit={handleLocalLogin}>
        {email.component}
        {password.component}
        <button
          type='button'
          style={LoginButtonStyle}
          onClick={handleLocalLogin}
        >
          Sign In
        </button>
      </form>
      <button
        type='button'
        style={KakaoLoginButtonStyle}
        onClick={handleKakaoLogin}
      >
        Kakao Login
      </button>
      <p css={JoinMessageStyle}>아직 onit의 회원이 아니세요?</p>
      <button type='button' onClick={handleLocalJoin} css={joinButton}>
        회원가입
      </button>
    </div>
  );
}

export default Login;

const JoinMessageStyle = css`
  font-size: 0.7rem;
  margin: 20px 0 0 0;
  font-weight: bold;
  color: ${COLOR_STYLE.brownishGrey};
`;
const joinButton = css`
  ${InitButtonStyle}
  font-size: 0.8rem;
  margin: 5px 0 5px 0;
  font-weight: 600;
`;
const Container = {
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

// const inputStyle = {
//   height: '50px',
//   boxSizing: 'border-box',
//   display: 'block',
//   width: '100%',
//   fontSize: '14px',
//   color: 'rgba(187, 187, 187, 1)',
//   borderRadius: '8px',
//   border: '2px solid rgba(178, 178, 178, 1)',
//   backgroundColor: 'rgba(255, 255, 255, 1)',
//   textIndent: '15px',
// };

const LoginButtonStyle = {
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
const KakaoLoginButtonStyle = {
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
const TapeStyle = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
`;
