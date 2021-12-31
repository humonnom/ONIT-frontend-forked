import { REFRESH_TOKEN } from '../utils/constantValue';

async function getAccessToken() {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/token/refresh`,
    {
      method: 'GET',
      headers: {
        refresh_token: `Bearer ${REFRESH_TOKEN}`,
      },
    }
  );
  const result = await res.json();
  console.log(`result: ${result}`);
  const ACCESS_TOKEN = result.data.access_token;
  console.log(`ACCESS_TOKEN renew: ${ACCESS_TOKEN}`);
  localStorage.setItem('access_token', ACCESS_TOKEN);
  const user_seq = localStorage.getItem('user_seq');
  window.location.assign(`/${user_seq}/normal`);
}

export default getAccessToken;
