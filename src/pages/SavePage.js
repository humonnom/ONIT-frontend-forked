/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import LoadingMessageStyle from '../components/LoadingMessageStyle';
import { getApiEndpoint } from '../utils/util';
import { useRequestAuth } from '../hooks/useRequestAuth';

function SaveEditPageData() {
  const pageUrl = localStorage.getItem('page_url');
  const userSeq = localStorage.getItem('user_seq');
  const history = useHistory();
  const location = useLocation();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    if (location && location.state) {
      setPostData(location.state.postData);
    } else {
      history.push('/');
    }
  }, [location]);

  const endpoint = `${getApiEndpoint()}/user/${userSeq}/widgets/save`;

  const { res, request } = useRequestAuth({
    endpoint,
    method: 'post',
    data: postData,
  });

  useEffect(() => {
    if (postData) {
      request();
    }
  }, [postData]);

  useEffect(() => {
    if (res && res.data) {
      if (res.data) {
        // 만료된 토큰의 경우 따로 처리해야함
        if (res.data.code === 'wrong_token') {
          history.push(`/login`);
          alert('로그인을 다시 해주세요.');
        }
        history.push(`/${pageUrl}`);
      }
    }
  }, [res]);

  return <LoadingMessageStyle> 로딩중.. </LoadingMessageStyle>;
}

export default SaveEditPageData;
