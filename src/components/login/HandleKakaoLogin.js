import React, { useEffect } from 'react';
import axios from 'axios';

function HandleKakaoLogin() {
  console.log('HandleKakaoLogin page');
  const code = new URL(window.location.href).searchParams.get('code');
  const user_seq = localStorage.getItem('user_seq');
  console.log(`code: ${code}`);

  const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/auth/login/kakao`;
  const fetchTokens = async () => {
    try {
      const response = await axios.get(endPoint, {
        headers: {
          'Authorization-Code': code,
        },
      });
      const result = await response.data;
      console.log(result);
      localStorage.setItem('access_token', result.data.tokens.access_token);
      localStorage.setItem('refresh_token', result.data.tokens.refresh_token);
      localStorage.setItem('user_seq', result.data.user_info.user_seq);
      window.location.assign(`/${user_seq}/normal`);
    } catch (err) {
      window.location.assign(`/${user_seq}`);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return <div>로딩중..</div>;
}

export default HandleKakaoLogin;

// 로그인 중에 에러가 나면 로그인 페이지로 이동하도록 수정했습니다.
// 필요없는 setState 사용을 줄였습니다.
// => "Nothing was returned from render" 에러를 해결하기 위한 조치
