/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
// import axios from 'axios';
import { useLocation, useHistory } from 'react-router';
import LoadingMessageStyle from '../components/LoadingMessageStyle';
import { getApiEndpoint } from '../utils/util';
import { useRequestAuth } from '../hooks/useRequestAuth';

function SaveEditPageData() {
  const user_seq = localStorage.getItem('user_seq');
  const history = useHistory();

  const location = useLocation();
  if (!location.state) {
    history.push('/');
  }
  const { postData } = location.state;

  const endpoint = `${getApiEndpoint()}/user/${user_seq}/save`;

  const { request, res, isSuccess } = useRequestAuth({
    endpoint,
    method: 'post',
    data: postData,
  });

  useEffect(() => {
    if (request) {
      request();
    }
  }, [request]);

  useEffect(() => {
    if (res && res.data && isSuccess) {
      history.push(`/${user_seq}/normal`);
    }
  }, [res, isSuccess]);

  return <LoadingMessageStyle> 로딩중.. </LoadingMessageStyle>;
}

export default SaveEditPageData;
