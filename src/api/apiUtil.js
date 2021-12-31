import { ACCESS_TOKEN } from '../utils/constantValue';
/**
 *
 * @param {string} method
 * @param {string} route
 * @param {URLSearchParams} params
 */
async function apiUtil(method, route, params) {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/${route}?${params}`,
    {
      method: method,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  return res.json();
}

export default apiUtil;
