import { ENDPOINT } from '../utils/constantValue';

// require('dotenv').config();

/**
 *
 * @param {string} code
 */
async function kakaoLogin(code) {
  const res = await fetch(`${ENDPOINT}/login/kakao`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Authorization-Code': code,
    },
  });
  const result = await res.json();
  const ACCESS_TOKEN = result.data.access_token;
  const REFRESH_TOKEN = result.data.refresh_token;
  localStorage.setItem('access_token', ACCESS_TOKEN);
  localStorage.setItem('refresh_token', REFRESH_TOKEN);
  window.location.assign('/');
}

export default kakaoLogin;
