import axios from 'axios';
import { useCallback, useState } from 'react';

function useRequestJoin(props) {
  const [resultRes, setRes] = useState();
  const { endpoint, method, headers, data } = props;

  const request = useCallback(() => {
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
  }, [endpoint, method, headers, data]);

  return { res: resultRes, request };
}

export default useRequestJoin;
