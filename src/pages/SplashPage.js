import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { useRequestAuth } from '../hooks/useRequestAuth';
// import { getApiEndpoint } from '../utils/util';
// import NormalMode from './NormalModePage';
// import RenderLoginPage from './RenderLoginPage';

function SplashPage() {
  const [login, setLogin] = useState(null);
  // const endPoint = `${getApiEndpoint()}/me`;
  // const { res } = useRequestAuth(endPoint, {
  //   notOwnerFallback: `/login`,
  //   authFailFallback: `/login`,
  // });
  const history = useHistory();
  const userSeq = localStorage.getItem('user_seq');
  const { res } = {
    data: {
      code: 'wrong_token',
    },
  };

  useEffect(() => {
    if (res) {
      console.log('res', res);
      setLogin(res.data.code);
    }
  }, [res]);

  useEffect(() => {
    console.log(login);
    if (login === 'ok') {
      history.push(`/${userSeq}/normal`);
    } else {
      history.push(`/login`);
    }
  }, [login]);

  return <center>onit</center>;
}

export default SplashPage;
