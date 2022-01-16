/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingMessageStyle  from '../LoadingMessageStyle';


function RenderEditPage({ match }) {
  console.log('SaveEditPageData page');
  const { userId } = match.params;
  const accessToken = localStorage.getItem('access_token');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user_seq = localStorage.getItem('user_seq');

  const endPoint = `${getApiEndpoint()}/user/${userId}/edit`;
  const fetchTokens = async () => {
    try {
      setError(null);
      setData(null);
      setLoading(true);
      // todo
      // eslint-disable-next-line no-undef
      const response = await axios.post(postData, endPoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.code === 419) {
        setData(response.data.code);
      } else if (response.data.code === 401) {
        setData(response.data.code);
      } else {
        console.log('response data:', response.data);
        setData(response.data);
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
    return <LoadingMessageStyle>로딩중..</LoadingMessageStyle>;
  }
  if (error) {
    return <LoadingMessageStyle>에러가 발생했습니다.</LoadingMessageStyle>;
  }
  // access_token 만료의 경우
  if (data === 419) {
    window.location.assign(`${user_seq}/auth/token/refresh`);
    return <LoadingMessageStyle> 토큰이 만료되었습니다.</LoadingMessageStyle>;
  } else if (data === 401) {
    window.location.assign(`${user_seq}/auth/token/refresh`);
    return <LoadingMessageStyle> 로그인을 다시 하세요.</LoadingMessageStyle>;
  }
  if (!data) {
    return null;
  }
  return <div />;
}

export default RenderEditPage;
