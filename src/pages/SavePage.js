/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { getApiEndpoint } from '../utils/util';
import { useRequestAuth } from '../hooks/useRequestAuth';
import { useMyInfo } from '../hooks/myInfo';

function SaveEditPageData() {
  const history = useHistory();
  const location = useLocation();
  const [postData, setPostData] = useState(null);
  const { myInfo } = useMyInfo();

  useEffect(() => {
    if (location && location.state) {
      setPostData(location.state.postData);
    } else {
      history.push('/');
    }
  }, [location]);

  const userSeq = useMemo(() => {
    if (myInfo) {
      return myInfo.user_seq;
    }
    return null;
  }, [myInfo]);

  const { res, request } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/user/${userSeq}/widgets/save`,
    method: 'post',
    data: postData,
  });

  useEffect(() => {
    if (postData && userSeq) {
      request();
    }
  }, [postData, userSeq]);

  useEffect(() => {
    if (res && res.data) {
      if (res.data) {
        if (res.data.code === 'wrong_token') {
          history.push(`/login`);
          alert('로그인을 다시 해주세요.');
        } else {
          history.push(`/${myInfo ? myInfo.url : '/'}`);
        }
      }
    }
  }, [res]);

  return <p>로딩중</p>;
}

export default SaveEditPageData;
