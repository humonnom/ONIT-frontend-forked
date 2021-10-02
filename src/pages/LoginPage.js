import React from 'react';
import { KAKAO_AUTH_URL } from '../utils/constantValue';
// import { PageWrapper } from '../components/Wrapper/PageWrapper';

function LoginPage(props) {
  const kakaoLoginHandler = () => {
    window.location.assign(KAKAO_AUTH_URL);
  };

  return (
    <div>
      <div>
        <p>로그인하세요</p>
      </div>
      <div>
        <button
          className='yellow-btn'
          type='button'
          onClick={kakaoLoginHandler}
        >
          <span>카카오계정으로 로그인</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
