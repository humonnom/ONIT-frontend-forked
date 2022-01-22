export function moveTo(path) {
  window.location.assign(path);
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.assign('/login');
}
