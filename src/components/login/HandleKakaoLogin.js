import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HandleKakaoLogin() {
  console.log('HandleKakaoLogin page');
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(`code: ${code}`);

  const [tokens, setTokens] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/auth/login/kakao`;
  const fetchTokens = async () => {
    try {
      setError(null);
      setTokens(null);
      setLoading(true);
      const response = await axios.get(endPoint, {
        headers: {
          'Authorization-Code': code,
        },
      });
      const axiosData = response.data;
      setTokens(axiosData.data.tokens);
      setUserInfo(axiosData.data.user_info);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  if (loading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (!tokens) {
    return null;
  }

  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
  localStorage.setItem('user_seq', userInfo.user_seq);
  window.location.assign(`/user/${userInfo.user_seq}/normal`);
}

export default HandleKakaoLogin;
