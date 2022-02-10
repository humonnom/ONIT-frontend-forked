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

  const joinRequired = useMemo(() => {
    console.log(`🚨 res:`);
    console.log(res);
    if (res && res.data) {
      if (res.data.data && res.data.data.join_required) {
        return true;
      }
    }
    return false;
  }, [res]);

  const registered = useMemo(() => {
    if (res && res.data) {
      if (res.data.data && res.data.data.registered) {
        return true;
      }
    }
    return false;
  }, [res]);

  useEffect(() => {
    if (res && res.data.code === 'error') {
      console.log('!! error: kakao login failed');
    } else if (res && registered) {
      alert(
        `${res.data.data.email}은 다른 방법으로 가입되어있습니다.\n아이디와 비밀번호를 이용해서 로그인해주세요.`
      );
      history.push('/login');
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
      history.push('/login');
      // TODO: 고치기;
      // 헤더에 남의 페이지에서 내 페이지로 가는 버튼도 고쳐야함 => 내 페이지보기, 내 프로필보기, 로그아웃하기 같은거 구현(조그만 모달)
      // history.push(`/${localStorage.getItem('user_seq')}`);
      // join에 성공하면 login 시키기
    }
  }, [res, joinRequired]);

  return <LoadingMessageStyle>로딩중..</LoadingMessageStyle>;
}

export default HandleKakaoLogin;
