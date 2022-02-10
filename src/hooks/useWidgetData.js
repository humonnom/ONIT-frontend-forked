import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';

export function useWidgetData({ pageUserSeq, dest }) {
  const endpoint = `${getApiEndpoint()}/user/${pageUserSeq}/widgets`;

  const { res, request } = useRequestAuth({
    endpoint,
    method: 'get',
  });

  console.log(dest);
  return {
    res,
    request,
  };
}

export default useWidgetData;
