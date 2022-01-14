import React, { useEffect } from 'react';
import axios from 'axios';
import LoadingMessageStyle from '../LoadingMessageStyle';
import { getApiEndpoint } from '../../utils/util';
// import { useDispatch } from 'react-redux';

function HandleKakaoLogin() {
  console.log('HandleKakaoLogin page');
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(`code: ${code}`);

  const endPoint = `${getApiEndpoint()}/auth/login/kakao`;

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

  return <LoadingMessageStyle>로딩중..</LoadingMessageStyle>;
}

export default HandleKakaoLogin;
