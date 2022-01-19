import React from 'react';
import { useRenewAccessToken } from '../hooks/useRenewAccessToken';

function TestPage() {
  console.log('[before]');
  localStorage.setItem('access_token', 'expired access token');
  console.log(localStorage.getItem('access_token'));
  useRenewAccessToken();

  return <div>test page</div>;
}

export default TestPage;
