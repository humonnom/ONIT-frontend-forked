import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useMyInfo } from '../hooks/myInfo';

function SplashPage() {
  const history = useHistory();

  const { loggedIn, myInfo } = useMyInfo();
  useEffect(() => {
    if (loggedIn === true) {
      history.push(`/${myInfo.url}`);
    } else if (loggedIn === false) {
      history.push('/login');
    }
  }, [loggedIn, myInfo]);

  return <center>onit</center>;
}

export default SplashPage;
