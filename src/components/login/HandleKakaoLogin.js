import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import LoadingMessageStyle from '../LoadingMessageStyle';
import { getApiEndpoint, setLocalStorage } from '../../utils/util';
import useRequestJoin from '../../hooks/useRequestJoin';

function HandleKakaoLogin() {
  const code = new URL(window.location.href).searchParams.get('code');
  const endpoint = `${getApiEndpoint()}/auth/login/kakao`;
  const history = useHistory();
  const { res, request } = useRequestJoin({
    endpoint,
    method: 'get',
    headers: { 'Authorization-Code': code },
    data: {
      'Authorization-Code': code,
      localhost: true,
    },
  });

  useEffect(() => {
    console.log('request');
    request();
  }, []);

  // 기입 필요 유무 확인
  const joinRequired = useMemo(() => {
    console.log(`🚨 res:`);
    console.log(res);
    // if (res && res.data) {
    //   if (res.data.data && res.data.data.join_required) return true;
    // }
    return true;
  }, [res]);

  useEffect(() => {
    if (res && res.data.code === 'error') {
      console.log('!! error: kakao login failed');
    } else if (res && joinRequired) {
      console.log('💎 join');
      history.push({
        pathname: '/join',
        state: {
          endpoint: `${getApiEndpoint()}/auth/join/kakao`,
          joinType: 'kakao',
          userEmail: res.data.data.email,
        },
      });
    } else if (res && !joinRequired) {
      console.log('💎 login');
      setLocalStorage(res.data.data);
      history.push(`/${localStorage.getItem('user_seq')}`);
    }
  }, [res, joinRequired]);

  return <LoadingMessageStyle>로딩중..</LoadingMessageStyle>;
}

export default HandleKakaoLogin;
