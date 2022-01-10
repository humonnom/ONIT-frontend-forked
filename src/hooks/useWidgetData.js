import { useRequestAuth } from './useRequestAuth';

export function useWidgetData(targetUserSeq, dest) {
  const endPoint = `http://${process.env.REACT_APP_SERVER_DOMAIN}/user/${targetUserSeq}/${dest}`;
  const userSeq = localStorage.getItem('user_seq');

  const { res } = useRequestAuth(endPoint, {
    notOwnerFallback: `/${userSeq}/normal`,
    authFailFallback: `/${userSeq}/auth/token/refresh`,
  });

  return { res };
}

export default useWidgetData;
