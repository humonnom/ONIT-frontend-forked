import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useMyInfo } from '../hooks/myInfo';

function SplashPage() {
  const history = useHistory();
  const { loggedIn, myInfo } = useMyInfo();

  const dest = useMemo(() => {
    if (loggedIn === true) {
      return `/${myInfo.url}`;
    } else if (loggedIn === false) {
      return 'login';
    }
    return null;
  }, [loggedIn, myInfo]);

  useEffect(() => {
    if (dest) {
      history.push(dest);
    }
  }, [dest]);

  return <center>onit</center>;
}

export default SplashPage;
