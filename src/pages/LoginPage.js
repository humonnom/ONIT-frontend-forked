import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RenderLoginPage from './RenderLoginPage';

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (loggedIn) {
    window.location.assign('/main');
  }

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      setLoggedIn(true);
    }
  }, []);

  return <RenderLoginPage />;
}

export default LoginPage;
