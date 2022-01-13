import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';

export function useWidgetData(targetUserSeq, dest) {
  const endPoint = `${getApiEndpoint()}/user/${targetUserSeq}/${dest}`;
  const userSeq = localStorage.getItem('user_seq');

  const { res } = useRequestAuth(endPoint, {
    notOwnerFallback: `/${userSeq}/normal`,
    authFailFallback: `/${userSeq}/auth/token/refresh`,
  });

  return { res };
}

export default useWidgetData;
