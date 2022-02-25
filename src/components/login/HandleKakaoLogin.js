import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import LoadingMessageStyle from '../LoadingMessageStyle';
import { getApiEndpoint, setLocalStorage } from '../../utils/util';
import { useRequest } from '../../hooks/useRequest';
import { useRequestAuth } from '../../hooks/useRequestAuth';

function HandleKakaoLogin() {
  const code = new URL(window.location.href).searchParams.get('code');
  const endpoint = `${getApiEndpoint()}/auth/login/kakao`;
  const history = useHistory();
  const { res, request } = useRequest({
    endpoint,
    method: 'get',
    headers: { 'Authorization-Code': code },
    data: {
      'Authorization-Code': code,
      localhost: true,
    },
  });

  useEffect(() => {
    request();
  }, []);

  const joinRequired = useMemo(() => {
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

  const { res: userInfoRes, request: userInfoRequest } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/me`,
    method: 'get',
  });

  useEffect(() => {
    if (userInfoRes && userInfoRes.data) {
      if (userInfoRes.data.code !== 'ok') {
        alert('정보를 가져오는 과정에서 오류가 발생하였습니다.');
      } else {
        history.push(`/${userInfoRes.data.data.url}`);
      }
    }
  }, [userInfoRes]);

  useEffect(() => {
    if (res && res.data.code === 'error') {
      console.error('login failed');
    } else if (res && registered) {
      alert(
        `${res.data.data.email}은 다른 방법으로 가입되어있습니다.\n아이디와 비밀번호를 이용해서 로그인해주세요.`
      );
      history.push('/login');
    } else if (res && joinRequired) {
      history.push({
        pathname: '/join',
        state: {
          endpoint: `${getApiEndpoint()}/auth/join/kakao`,
          joinType: 'kakao',
          userEmail: res.data.data.email,
        },
      });
    } else if (res && !joinRequired) {
      setLocalStorage(res.data.data);
      userInfoRequest();
    }
  }, [res, joinRequired]);

  return <LoadingMessageStyle>로딩중..</LoadingMessageStyle>;
}

export default HandleKakaoLogin;
