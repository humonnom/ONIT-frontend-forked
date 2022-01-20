import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { getApiEndpoint, isExpiredToken, isInvalidToken } from '../utils/util';

export function useRenewAccessToken() {
  const [resultRes, setRes] = useState(null);
  const endPoint = `${getApiEndpoint()}/auth/token/refresh`;
  const refreshToken = localStorage.getItem('refresh_token');
  const history = useHistory();
  useEffect(() => {
    axios
      .get(endPoint, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then((res) => {
        console.log('res is ');
        console.log(res);
        setRes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(resultRes);
    if (resultRes) {
      if (
        isExpiredToken(resultRes.data.code) ||
        isInvalidToken(resultRes.data.code)
      ) {
        console.log(`===> renew failed ${resultRes.data.code}`);
        history.push('/login');
      } else {
        localStorage.setItem(
          'access_token',
          resultRes.data.data.tokens.access_token
        );
        localStorage.setItem(
          'refresh_token',
          resultRes.data.data.tokens.refresh_token
        );
        localStorage.setItem(
          'user_seq',
          resultRes.data.data.user_info.user_seq
        );
        console.log('[changed]');
        console.log(localStorage.getItem('access_token'));
        console.log(localStorage.getItem('user_seq'));
      }
    }
  }, [resultRes]);
  return { renew: resultRes };
}
export default useRenewAccessToken;
