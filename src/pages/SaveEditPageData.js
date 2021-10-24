import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SaveEditPageData({ match }) {
  console.log('SaveEditPageData page');
  const accessToken = localStorage.getItem('access_token');
  const user_seq = localStorage.getItem('user_seq');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: 변경되어야 할 데이터를 obj 형태로 postData에 넣어주세요
  // 1. grid 관련 컴포넌트 내부의 redux에서 데이터 변경하기
  // 2. redux 데이터 불러오기
  // 3. redux 데이터를 database 형태로 맞춰서 post 요청하기
  // widget_action이 'C'이면 widget_code를 생략합니다.
  // widget_action이 'E'/'D'이면, widget_code를 같이 써줍니다.
  const postData = [
    {
      widget_code: '',
      widget_action: 'C',
      widget_data: 'https://image/address123123123',
      widget_type: 1,
      pos_y: 2,
      pos_x: 3,
      height: 3,
      width: 2,
    },
    {
      widget_code: 'WIDIM0003000015',
      widget_action: 'E',
      widget_data: 'https://image/address2',
      widget_type: 1,
      pos_y: 3,
      pos_x: 3,
      width: 3,
      height: 3,
    },
    {
      widget_code: 'WIDIM0003000016',
      widget_action: 'D',
    },
  ];
  const endPoint = `${process.env.REACT_APP_SERVER_DOMAIN}/user/${user_seq}/save`;
  const fetchTokens = async () => {
    try {
      setError(null);
      setData(null);
      setLoading(true);
      const response = await axios.post(endPoint, postData, {
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
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  // access_token 만료의 경우
  if (data === 419) {
    window.location.assign('/auth/token/refresh');
    return <div> 토큰이 만료되었습니다. </div>;
  } else if (data === 401) {
    return <div> 로그인을 다시 하세요. </div>;
  }
  if (!data) {
    return null;
  }
  window.location.assign('/normal');
  return <div />;
}

export default SaveEditPageData;
