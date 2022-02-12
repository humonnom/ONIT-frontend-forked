import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { isExpiredToken, isInvalidToken, getApiEndpoint } from '../utils/util';

/**
 * @typedef {Object} UseRequestAuthProps
 * @property {string} endpoint 필수
 * @property {'get'|'post'} method 필수
 * @property {any} [data] 선택
 */

/**
 * @param {UseRequestAuthProps} props
 */
export function useRequestAuth(props) {
  const { endpoint, method, data } = props;

  const [resultRes, setRes] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * 액세스 토큰을 갱신할 때의 상태를 저장합니다.
   * `idle`: 초기화상태
   * `pending`: 통신중
   * `success`: 갱신 성공
   * `fail`: 갱신 실패 (refreshToken 도 만료되어 로그인 필요)
   * `error`: 통신 에러
   */
  const [renewStatus, setRenewStatus] = useState('idle');
  const [renewRes, setRenewRes] = useState(null);
  const history = useHistory();

  // 요청하는 함수를 만듭니다.
  const request = useCallback(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
    let axiosPromise;
    if (method === 'get') {
      axiosPromise = axios.get(endpoint, {
        headers,
        params: data,
      });
    } else if (method === 'post') {
      axiosPromise = axios.post(endpoint, data, {
        headers,
      });
    }

    axiosPromise
      .then((res) => {
        setRes(res);
      })
      .catch((err) => {
        console.error(err);
        setRes({
          data: {
            code: 'error',
            message: '404 not found-server connection failed',
          },
        });
      });
  }, [endpoint, method, data]);

  useEffect(() => {
    if (resultRes) {
      if (
        isExpiredToken(resultRes.data.code) ||
        isInvalidToken(resultRes.data.code)
      ) {
        renewToken();
      } else {
        setIsSuccess(true);
      }
    }
  }, [resultRes]);

  // 토큰을 갱신하는 함수를 만듭니다.
  const renewToken = useCallback(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    const tokenData = {
      data: {
        refresh_token: refreshToken,
      },
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
    };
    setRenewStatus('pending');
    axios
      .get(`${getApiEndpoint()}/auth/token/refresh`, {
        params: tokenData,
        headers,
      })
      .then((res) => {
        if (isExpiredToken(res.data.code) || isInvalidToken(res.data.code)) {
          setRenewStatus('fail');
          history.push('/login');
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

  return { res: resultRes, request, isSuccess };
}

export default useRequestAuth;
