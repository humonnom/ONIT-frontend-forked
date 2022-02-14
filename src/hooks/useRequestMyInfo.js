import { useEffect, useState } from 'react';
import { useRequestAuth } from './useRequestAuth';
import { getApiEndpoint } from '../utils/util';
import { useSaveUserInfo } from './userInfo';

function useRequestMyInfo() {
  const { res, request } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/me`,
    method: 'get',
  });
  // const { userInfo: currentInfo } = useGetUserInfo();
  const { save } = useSaveUserInfo();
  const [userInfo, setUserInfo] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (res && res.data) {
      if (res.data.code === 'ok') {
        setLoggedIn(true);
        setUserInfo(res.data.data);
        save(userInfo);
      }
    }
  }, [save, res]);

  return {
    loggedIn,
    userInfo,
  };
}

export default useRequestMyInfo;
