import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router';
// import { getApiEndpoint } from '../utils/util';

export function useRenewAccessToken() {
  const [resultRes, setRes] = useState(null);
  //   const endPoint = `${getApiEndpoint()}/auth/token/refresh`;
  //   const refreshToken = localStorage.getItem('refresh_token');
  //   const history = useHistory();
  useEffect(() => {
    // axios
    //   .get(endPoint, {
    //     headers: {
    //       Authorization: `Bearer ${refreshToken}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log('res is ');
    //     console.log(res);
    //     setRes(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const res = {
      data: {
        tokens: {
          access_token: 'renewed access token',
          refresh_token: 'renewed refresh token',
        },
        user_info: {
          user_seq: 3,
        },
      },
      message: '',
      code: 'ok',
    };
    setRes(res);
  }, []);

  useEffect(() => {
    console.log(resultRes);
    if (resultRes && resultRes.code === 'ok') {
      console.log(resultRes.code);
      localStorage.setItem('access_token', resultRes.data.tokens.access_token);
      localStorage.setItem(
        'refresh_token',
        resultRes.data.tokens.refresh_token
      );
      localStorage.setItem('user_seq', resultRes.data.user_info.user_seq);
      console.log('[changed]');
      console.log(localStorage.getItem('access_token'));
      console.log(localStorage.getItem('user_seq'));
    }
  }, [resultRes]);
}
export default useRenewAccessToken;
