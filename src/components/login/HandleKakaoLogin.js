import React, { useEffect } from 'react';
import axios from 'axios';
// import { useDispatch } from 'react-redux';

function HandleKakaoLogin() {
  // const dispatch = useDispatch();
  console.log('HandleKakaoLogin page');
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(`code: ${code}`);

  const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/auth/login/kakao`;
  // function updateUserId(id) {
  //   dispatch(
  //     createReplacementUserAction({
  //       ...user,
  //       id: id,
  //     })
  //   );
  // }
  const fetchTokens = async () => {
    try {
      const headers = { 'Authorization-Code': code };
      if (process.env.NODE_ENV === 'development') {
        headers['X-localhost'] = true;
      }
      const response = await axios.get(endPoint, {
        headers,
      });
      const result = await response.data;
      console.log(result);
      localStorage.setItem('access_token', result.data.tokens.access_token);
      localStorage.setItem('refresh_token', result.data.tokens.refresh_token);
      localStorage.setItem('user_seq', result.data.user_info.user_seq);
      // updateUserId(result.data.user_info.user_seq);
      const user_seq = localStorage.getItem('user_seq');
      window.location.assign(
        `${process.env.REACT_APP_CLIENT_DOMAIN}/${user_seq}/normal`
      );
    } catch (err) {
      window.location.assign('/');
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
