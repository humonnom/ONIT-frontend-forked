import axios from 'axios';
import { useState, useEffect } from 'react';
import { isExpiredToken, isInvalidToken } from '../utils/util';
// import { useRenewAccessToken } from './useRenewAccessToken';

export function useRequestAuth(endpoint) {
  const [resultRes, setRes] = useState(null);
  const [retry, setRetry] = useState(false);
  const [refreshRequired, setRefreshRequired] = useState(false);
  // const { renew } = useRenewAccessToken();

  useEffect(() => {
    axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setRes(res);
        if (retry) {
          console.log('===> retry to get the data');
          setRetry(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (refreshRequired) {
      setRefreshRequired(false);
      console.log(`===> try refresh token`);
      setRetry(true);
    }
  }, [refreshRequired]);

  useEffect(() => {
    if (resultRes) {
      if (
        isExpiredToken(resultRes.data.code) ||
        isInvalidToken(resultRes.data.code)
      ) {
        console.log(`===> refresh required ${resultRes.data.code}`);
        setRefreshRequired(true);
      }
    }
  }, [resultRes]);

  return { res: resultRes };
}

export default useRequestAuth;
