import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { isExpiredToken, isInvalidToken, getApiEndpoint } from '../utils/util';

export function useRequestAuth(endpoint) {
  const [resultRes, setRes] = useState(null);
  const [renewStatus, setRenewStatus] = useState('idle');
  const [renewRes, setRenewRes] = useState(null);

  // 요청하는 함수를 만듭니다.
  const request = useCallback(() => {
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        setRes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 해당 컴포넌트가 최초 로딩됐을 때 요청합니다.
  useEffect(() => {
    request();
  }, []);

  // 토큰을 갱신하는 함수를 만듭니다.
  const renewToken = useCallback(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    setRenewStatus('pending');
    axios
      .get(`${getApiEndpoint()}/auth/token/refresh`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then((res) => {
        if (isExpiredToken(res.data.code) || isInvalidToken(res.data.code)) {
          setRenewStatus('fail');
        } else {
          setRenewStatus('success');
          setRenewRes(res);
        }
      })
      .catch(() => {
        setRenewStatus('error');
      });
  }, []);

  // renew 요청이 성공했을 때 실행됩니다.
  useEffect(() => {
    if (renewStatus === 'success' && renewRes) {
      localStorage.setItem(
        'access_token',
        renewRes.data.data.tokens.access_token
      );
      localStorage.setItem(
        'refresh_token',
        renewRes.data.data.tokens.refresh_token
      );
      localStorage.setItem('user_seq', renewRes.data.data.user_info.user_seq);
      request();
      setRenewStatus('idle');
      setRenewRes(null);
    }
  }, [renewStatus, renewRes]);

  useEffect(() => {
    if (resultRes) {
      if (
        isExpiredToken(resultRes.data.code) ||
        isInvalidToken(resultRes.data.code)
      ) {
        renewToken();
      }
    }
  }, [resultRes]);

  return { res: resultRes };
}

export default useRequestAuth;
