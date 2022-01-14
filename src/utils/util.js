export function getApiEndpoint() {
  const endpoint =
    process.env.REACT_APP_SERVER_DOMAIN ?? 'http://localhost:8080';
  if (!endpoint.startsWith('http')) {
    return `http://${endpoint}`;
  }
  return endpoint;
}

export function isInvalidToken(code) {
  return code === 401;
}

export function isNotOwner(code) {
  return code === 601;
}

export function isExpiredToken(code) {
  return code === 419;
}
