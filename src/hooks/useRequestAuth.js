import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import {
  isExpiredToken,
  isInvalidToken,
  getApiEndpoint,
  setLocalStorage,
  isOk,
} from '../utils/util';

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
  const { endpoint, method, data, contentType } = props;

  // const [result, setResult] = useState(null);
  const [renewSuccess, setRenewSuccess] = useState(false);
  const [resultRes, setRes] = useState(null);

  const request = useCallback(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': contentType,
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
      .catch(() => {
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
        setRes(resultRes);
      }
    }
  }, [resultRes]);

  const renewToken = useCallback(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    const params = {
      data: {
        refresh_token: refreshToken,
      },
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
    };
    axios
      .get(`${getApiEndpoint()}/auth/token/refresh`, {
        params,
        headers,
      })
      .then((res) => {
        if (isOk(res.data.code)) {
          setLocalStorage(res.data.data);
          setRenewSuccess(true);
        }
      })
      .catch(() => {
        console.error('token renew error');
      });
  }, []);

  useEffect(() => {
    if (renewSuccess) {
      request();
    }
  }, [renewSuccess]);

  return { res: resultRes, request };
}

export default useRequestAuth;
