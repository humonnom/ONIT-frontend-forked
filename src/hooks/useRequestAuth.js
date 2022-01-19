import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRenewAccessToken } from './useRenewAccessToken';
// import { RenewAccessToken } from '../components';
import { isExpiredToken, isInvalidToken, isNotOwner } from '../utils/util';

// endpoint 로 Auth 헤더 설정하면서 요청을 보냄.
// 데이터가 오면 res에 저장함.
// auth 가 실패하면 (토큰이 잘못되거나 만료되면) options.authFailFallback 으로 이동함.
// 해당 유저가 아니면 options.notOwnerFallback 으로 이동함.
export function useRequestAuth(endpoint, options = {}) {
  const [resultRes, setRes] = useState(null);
  const [retry, setRetry] = useState(false);
  const [refreshRequired, setRefreshRequired] = useState(false);
  const [code, setCode] = useState(null);

  const { authFailFallback = null, notOwnerFallback = null } = options;

  useEffect(() => {
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        setRes(res);
        setCode(res.data.code);
        console.log(res.status);
        if (res.data.code === 'expired_token') {
          setRefreshRequired(true);
        }
        setRetry(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [retry]);

  const history = useHistory();

  useEffect(() => {
    if (refreshRequired) {
      useRenewAccessToken();
      setRefreshRequired(false);
      setRetry(true);
    }
  }, []);

  useEffect(() => {
    if ((isExpiredToken(code) || isInvalidToken(code)) && authFailFallback) {
      history.push(authFailFallback);
    } else if (isNotOwner(code) && notOwnerFallback) {
      history.push(notOwnerFallback);
    }
  }, [code]);

  return {
    res: resultRes,
    code,
  };
}

export default useRequestAuth;

// 메모
// normal & edit
// if code === 'expired token : acccess token 만료' => do exec function renewAccessToken
// edit
// if code === 'wrong token : 로그인이 안되었음' =>
// if code === 'unauthorized : 허가되지 않은 접근' =>
// !(normal & edit)
// if code === 'ok : 문제없음' => do nothing
