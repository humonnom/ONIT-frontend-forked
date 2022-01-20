import { useEffect } from 'react';
import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';

export function useWidgetData(targetUserSeq, dest) {
  const endpoint = `${getApiEndpoint()}/user/${targetUserSeq}/${dest}`;

  const { res, request } = useRequestAuth({
    endpoint,
    method: 'get',
  });

  useEffect(() => {
    request();
  }, []);

  return { res };
}

export default useWidgetData;
