import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useMyInfo } from '../hooks/myInfo';

function SplashPage() {
  const history = useHistory();

  const { loggedIn, userInfo } = useMyInfo();

  useEffect(() => {
    if (loggedIn === true) {
      history.push(`/${userInfo.url}`);
    } else if (loggedIn === false) {
      history.push('/login');
    }
  }, [loggedIn, userInfo]);

  return <center>onit</center>;
}

export default SplashPage;
