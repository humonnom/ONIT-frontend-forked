// import { useEffect } from 'react';
import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';

export function useWidgetData({ pageUserSeq, dest }) {
  const endpoint = `${getApiEndpoint()}/user/${pageUserSeq}/widgets/${dest}`;

  const { res, request } = useRequestAuth({
    endpoint,
    method: 'get',
  });

  // useEffect(() => {
  //   request();
  // }, []);

  return {
    res,
    request,
  };
}

export default useWidgetData;
