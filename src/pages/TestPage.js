import React from 'react';
import { useRenewAccessToken } from '../hooks/useRenewAccessToken';

function TestPage() {
  const { res } = useRenewAccessToken();
  console.log('[before]');
  console.log(localStorage.getItem('access_token'));
  console.log(res);
  return <div>test page</div>;
}

export default TestPage;
