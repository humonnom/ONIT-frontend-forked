/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useHistory } from 'react-router';
import { getApiEndpoint, setLocalStorage } from '../utils/util';
import { useRequest } from '../hooks/useRequest';
import {
  COLOR_STYLE,
  FlexColCenter,
  InitButtonStyle,
} from '../styles/GlobalStyles';
import { useRequestAuth } from '../hooks/useRequestAuth';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onPasswordChange = (event) =>
    setPasswordValue(event.currentTarget.value);
  const onEmailChange = (event) => setEmailValue(event.currentTarget.value);

  // const [showPassword, setShowPassword] = useState(false);

  // const email = useInput({
  //   inputType: 'email',
  //   id: 'email',
  //   type: 'email',
  // });

  // const password = useInput({
  //   inputType: 'password',
  //   id: 'password',
  //   type: showPassword ? 'text' : 'password',
  //   button: (
  //     <button
  //       type='button'
  //       css={InitButtonStyle}
  //       onClick={() => setShowPassword(!showPassword)}
  //     >
  //       {showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
  //     </button>
  //   ),
  // });

  const endpointLogin = `${getApiEndpoint()}/auth/login/local`;
  const { res, request } = useRequest({
    endpoint: endpointLogin,
    method: 'get',
    data: {
      email: emailValue,
      password: passwordValue,
    },
  });
  const { res: userInfoRes, request: userInfoRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/me`,
    method: 'get',
  });

  const handleKakaoLogin = () => {
    const endpoint = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.assign(endpoint);
  };
  const history = useHistory();

  const handleLocalLogin = () => {
    // 이 밑에 과정을 수정 해야할 듯
    // if (email.state !== 'ok' && password.state !== 'ok') {
    //   alert('아이디와 비밀번호를 입력해주세요.');
    // } else if (email.state !== 'ok') {
    //   alert(email.state);
    // } else if (password.state !== 'ok') {
    //   alert(password.state);
    // } else {
    // }
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
        history.push(userInfoRes.data.data.url);
      }
    }
  }, [userInfoRes]);

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
    <>
      <h1 css={[loginH1]}>로그인</h1>
      <div css={[contentBox]}>
        <form css={[formWidth]} onSubmit={handleLocalLogin}>
          <div css={[commonInputBoxStyle, emailInputBoxStyle]}>
            <input
              css={[commonInputStyle]}
              type='text'
              value={emailValue}
              placeholder='아이디'
              onChange={onEmailChange}
            />
          </div>
          <div css={[commonInputBoxStyle]}>
            <input
              css={[commonInputStyle]}
              type='password'
              value={passwordValue}
              placeholder='비밀번호'
              onChange={onPasswordChange}
            />
          </div>
          <button
            type='button'
            css={[commonLoginButtonStyle, LoginButtonColor]}
            onClick={handleLocalLogin}
          >
            로그인
          </button>
        </form>
        <button
          type='button'
          css={[commonLoginButtonStyle, KakaoLoginButtonStyle]}
          onClick={handleKakaoLogin}
        >
          카카오 로그인
        </button>
        <p css={JoinMessageStyle}>아직 onit의 회원이 아니세요?</p>
        <button
          type='button'
          onClick={handleLocalJoin}
          css={[commonLoginButtonStyle, joinButton]}
        >
          회원가입
        </button>
      </div>
    </>
  );
}

export default Login;

const JoinMessageStyle = css`
  font-size: 0.85rem;
  margin: 20px 0 5px 0;
  font-weight: bold;
  color: ${COLOR_STYLE.brownishGrey};
`;

const formWidth = css`
  width: 100%;
`;

const loginH1 = css`
  width: 100px;
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  margin: 0 auto;
  padding: 45px 0;
`;

const contentBox = css`
  ${FlexColCenter};
  width: 300px;
  margin: 0 auto;
  box-sizing: border-box;
`;

// const Container = {
//   textAlign: 'center',
//   position: 'relative',
//   width: '400px',
//   height: '415px',
//   boxSizing: 'border-box',
//   verticalAlignt: 'middle',
//   borderRadius: '2px',
//   backgroundColor: 'rgba(254, 245, 238, 1)',
//   boxShadow: '15px 15px 42px 0px rgb(190,190,190)',
//   padding: '72px 24px 0',
// };

const commonInputBoxStyle = css`
  width: 100%;
  height: 39px;
  border-radius: 30px;
  border: 1px solid #707070;
  padding: 3px 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const emailInputBoxStyle = css`
  margin-bottom: 10px;
`;

const commonInputStyle = css`
  width: 100%;
  height: 100%;
  outline: none;
  border-radius: 30px;
  border: 0;
`;

const commonLoginButtonStyle = css`
  width: 100%;
  height: 48px;
  border-radius: 30px;
  border: 0;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 10px;
`;

const LoginButtonColor = css`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(239, 100, 8, 1);
  &:hover {
    background-color: rgba(300, 100, 8, 1);
  }
`;

const KakaoLoginButtonStyle = css`
  color: rgba(55, 55, 55, 1);
  background-color: rgba(255, 225, 28, 1);
  &:hover {
    background-color: rgba(255, 235, 28, 1);
  }
  margin-bottom: 65px;
`;

const joinButton = css`
  ${InitButtonStyle}
  font-size: 0.8rem;
  margin: 5px 0 5px 0;
  font-weight: 600;
  background-color: #f2f2f2;
  &:hover {
    background-color: rgba(232, 232, 232, 10);
  }
`;
