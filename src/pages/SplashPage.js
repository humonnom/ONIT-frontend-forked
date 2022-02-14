import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRequestAuth } from '../hooks/useRequestAuth';
import useSaveUserInfo from '../hooks/useSaveUserInfo';
import { getApiEndpoint } from '../utils/util';

function SplashPage() {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);

  const { res, request } = useRequestAuth({
    endpoint: `${getApiEndpoint()}/me`,
    method: 'get',
  });

  useEffect(() => {
    request();
  }, []);

  const { save } = useSaveUserInfo(userInfo);

  useEffect(() => {
    if (res && res.data) {
      if (res.data.code === 'ok') {
        setUserInfo(res.data.data);
        save(res.data.data);
        history.push(`/${res.data.data.url}`);
      } else {
        console.log('return to login page');
        history.push('/login');
      }
    }
  }, [res]);

  return <center>onit</center>;
}

export default SplashPage;
