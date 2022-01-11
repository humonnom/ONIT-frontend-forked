export function isInvalidToken(code) {
  return code === 401;
}

export function isNotOwner(code) {
  return code === 601;
}

export function isExpiredToken(code) {
  return code === 419;
}
