import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EditModePage } from '.';
import { convertForRedux, convertForServer } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';

function RenderUserName() {
  console.log('RenderUserName page');
  const accessToken = localStorage.getItem('access_token');
  const user_seq = localStorage.getItem('user_seq');

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/user/${user_seq}`;
  const fetchTokens = async () => {
    try {
      // setError(null);
      // setData(null);
      // setLoading(true);
      const response = await axios.get(endPoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // if (response.data.code === 419) {
      //   // 토큰 만료로 인한 재발급 페이지로 이동
      //   window.location.assign('/auth/token/refresh');
      //   // setData(response.data.code);
      // } else if (response.data.code === 401) {
      //   // 로그인 에러로 인한 재로그인 필요
      //   // window.location.assign('/');
      //   // setData(response.data.code);
      // } else {
      console.log('get name => data:', response.data);
      // }
    } catch (err) {
      console.log('get name(catch err)');
      // window.location.assign('/');
      // setError(err);
    }
    // setLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  // if (loading) {
  // return <div>로딩중..</div>;
  // }
  // if (error) {
  // return <div>에러가 발생했습니다.</div>;
  // }
  // access_token 만료의 경우
  // if (data === 419) {
  //   window.location.assign('/auth/token/refresh');
  //   return <div> 토큰이 만료되었습니다. </div>;
  // } else if (data === 401) {
  //   return <div> 로그인을 다시 하세요. </div>;
  // }
  // if (!data) {
  //   return null;
  // }

  return <div>get name</div>;
}

export default RenderUserName;
