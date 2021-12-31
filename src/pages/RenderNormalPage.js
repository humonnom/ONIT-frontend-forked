/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { NormalModePage } from '.';
import { convertForRedux } from '../utils/convert';
import { createReplacementWidgetsAction } from '../redux/slice';
import { getPageUser } from '../utils/parsing';
import { loadingMessageStyle } from '../styles/loadingStyle';

function RenderNormalPage({ match }) {
  const [userMatch, setUserMatch] = useState(false);
  const [pageUserName, setPageUserName] = useState('unkown');
  const { id } = match.params;
  console.log('RenderNormalPage page');
  const accessToken = localStorage.getItem('access_token');
  const user_seq = localStorage.getItem('user_seq');
  const page_user_seq = getPageUser();
  // console.log('==========id=========');
  // console.log(id);

  useEffect(() => {
    if (user_seq === page_user_seq) {
      setUserMatch(true);
    }
  }, []);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const getUserDataFromServer = async () => {
    console.log('getUserData');
  };
  const getWidgetsDataFromServer = async () => {
    console.log('getWidgetsData');
    const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/user/${page_user_seq}/normal`;
    try {
      setError(null);
      setData(null);
      setLoading(true);
      const response = await axios.get(endPoint, {
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
        setWidgetState(response.data.widget_list);
        setPageUserName(response.data.user_name);
        console.log(`user name setting ${pageUserName}`);
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const setWidgetState = async (widget_data) => {
    setData(widget_data);
    const convertedForRedux = await convertForRedux(widget_data);

    dispatch(
      createReplacementWidgetsAction({
        count: convertedForRedux.length,
        list: convertedForRedux,
      })
    );
  };

  useEffect(() => {
    getWidgetsDataFromServer();
    getUserDataFromServer();
  }, []);

  if (loading) {
    return <div css={loadingMessageStyle}>로딩중..</div>;
  }
  if (error) {
    return <div css={loadingMessageStyle}>에러가 발생했습니다.</div>;
  }
  // access_token 만료의 경우
  if (data === 419) {
    window.location.assign(`/${user_seq}/auth/token/refresh`);
    return <div css={loadingMessageStyle}> 토큰이 만료되었습니다. </div>;
  } else if (data === 401) {
    window.location.assign(`/${user_seq}/auth/token/refresh`);
    return <div css={loadingMessageStyle}> 로그인을 다시 하세요. </div>;
  }
  if (!data) {
    return null;
  }

  return (
    <div>
      <NormalModePage
        userMatch={userMatch}
        pageUserId={id}
        pageUserName={pageUserName}
      />
    </div>
  );
}

export default RenderNormalPage;
