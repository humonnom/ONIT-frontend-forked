import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import LoadingMessageStyle from '../LoadingMessageStyle';
// import { fetchTokens, getApiEndpoint } from '../../utils/util';
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
    data: {},
  });

  // 예상 데이터 1 (로그인)
  // 예상 데이터 2 (회원가입)

  useEffect(() => {
    request();
  }, []);

  const joinRequired = useMemo(() => {
    console.log(`🚨 res:`);
    console.log(res);
    return false;
    // if (res && res.data) {
    //   if (res.data.data && res.data.data.join_required) return true;
    // }
    // return false;
  }, [res]);

  useEffect(() => {
    if (res && joinRequired) {
      console.log('💎 join');
      history.push({
        pathname: '/join',
        state: { type: 'kakao', userEmail: 'joso0702@naver.com' },
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
