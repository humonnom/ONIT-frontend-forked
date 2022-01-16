import { ACCESS_TOKEN } from '../utils/constantValue';
import { getApiEndpoint } from '../utils/util';
/**
 *
 * @param {string} method
 * @param {string} route
 * @param {URLSearchParams} params
 */
async function apiUtil(method, route, params) {
  const res = await fetch(`${getApiEndpoint()}/${route}?${params}`, {
    method: method,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return res.json();
}

export default apiUtil;
