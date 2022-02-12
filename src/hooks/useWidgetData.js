import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';

export function useWidgetData({ pageUserSeq }) {
  const endpoint = `${getApiEndpoint()}/user/${pageUserSeq}/widgets`;

  const { res, request } = useRequestAuth({
    endpoint,
    method: 'get',
  });

  return {
    res,
    request,
  };
}

export default useWidgetData;
