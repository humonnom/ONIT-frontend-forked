export function getApiEndpoint() {
  const endpoint =
    process.env.REACT_APP_SERVER_DOMAIN ?? 'http://localhost:8080';
  if (!endpoint.startsWith('http')) {
    return `http://${endpoint}`;
  }
  return endpoint;
}

export function isInvalidToken(code) {
  return code === 401 || code === 'wrong_token';
}

export function isNotOwner(code) {
  return code === 601 || code === 'unauthorized';
}

export function isExpiredToken(code) {
  return code === 419 || code === 'expired_token';
}

export const regexNumber = /\d/gi;
export const regexAlpha = /[a-zA-Z]/gi;
export const regexSymbol = /[\^~`$@$+="':;/\\,.<>[\]{}|₩!%*#?&()_-]/gi;

export function hasNumber(word) {
  const matched = word.match(regexNumber);
  return matched ? matched.length : 0;
}
export function hasAlpha(word) {
  const matched = word.match(regexAlpha);
  return matched ? matched.length : 0;
}

export function hasSymbol(word) {
  const matched = word.match(regexSymbol);
  return matched ? matched.length : 0;
}

export function isPassword(word) {
  const numberLen = hasNumber(word);
  const alphaLen = hasAlpha(word);
  const symbolLen = hasSymbol(word);
  if (!!numberLen + !!alphaLen + !!symbolLen < 2) return false;
  if (numberLen + alphaLen + symbolLen !== word.length) return false;
  return true;
}
