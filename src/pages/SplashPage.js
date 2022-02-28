import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useMyInfo } from '../hooks/myInfo';

function SplashPage() {
  const history = useHistory();
  const { loggedIn, myInfo } = useMyInfo();
  const [dest, setDest] = useState(null);

  useEffect(() => {
    if (loggedIn === true) {
      setDest(`/${myInfo.url}`);
    }
    return () => {
      setDest('login');
    };
  }, [loggedIn]);

  useEffect(() => {
    if (dest) {
      history.push(dest);
    }
  }, [dest]);

  return <center>onit</center>;
}

export default SplashPage;
