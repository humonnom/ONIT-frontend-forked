import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
// import { useRequestAuth } from '../hooks/useRequestAuth';
// import { getApiEndpoint } from '../utils/util';
// import NormalMode from './NormalModePage';
// import RenderLoginPage from './RenderLoginPage';

function SplashPage() {
  // const [login, setLogin] = useState(null);
  // const endpoint = `${getApiEndpoint()}/me`;
  // const { res } = useRequestAuth(endpoint);
  const history = useHistory();
  const userSeq = localStorage.getItem('user_seq');
  const accessToken = localStorage.getItem('access_token');
  // const { res } = {
  //   data: {
  //     code: 'wrong_token',
  //   },
  // };

  // useEffect(() => {
  //   if (res) {
  //     setLogin(res.data.code);
  //   }
  // }, [res]);

  // useEffect(() => {
  //   if (login === 'ok') {
  //     history.push(`/${userSeq}/normal`);
  //   } else {
  //     history.push(`/login`);
  //   }
  // }, [login]);

  useEffect(() => {
    if (userSeq && accessToken) {
      console.log(`userSeq:${userSeq}`);
      history.push(`/${userSeq}/normal`);
    }
  }, []);

  return <center>onit</center>;
}

export default SplashPage;
