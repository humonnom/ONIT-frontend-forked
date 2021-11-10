import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RenderLoginPage from '../pages/RenderLoginPage';

function RenewAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  const [tokens, setTokens] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/auth/token/refresh`;
  const fetchTokens = async () => {
    try {
      setError(null);
      setTokens(null);
      setLoading(true);
      const response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      // TODO: refresh 토큰도 만료가 된 경우, 로그인 절차부터 다시 진행하도록 유도하기
      const axiosData = response.data;
      console.log(response);
      if (axiosData.code === 401) {
        setTokens(axiosData.code);
      } else {
        setTokens(axiosData.data.tokens);
        setUserInfo(axiosData.data.user_info);
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  if (loading) {
    return <div>토큰 갱신중..</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (!tokens) {
    return null;
  }

  if (tokens === 401) {
    return (
      <>
        <div> 로그인을 다시 하세요.</div>
        <RenderLoginPage />
      </>
    );
  }

  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
  localStorage.setItem('user_seq', userInfo.user_seq);
  window.location.assign(`/${userInfo.user_seq}/normal`);
}

export default RenewAccessToken;
