import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import useRequestMyInfo from '../hooks/useRequestMyInfo';

function SplashPage() {
  const history = useHistory();

  const { loggedIn, userInfo } = useRequestMyInfo();

  useEffect(() => {
    if (loggedIn === true) {
      history.push(`/${userInfo.url}`);
    } else if (loggedIn === false) {
      console.log('return to login page');
      history.push('/login');
    }
  }, [loggedIn, userInfo]);

  return <center>onit</center>;
}

export default SplashPage;
