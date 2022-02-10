export function moveTo(path) {
  window.location.assign(path);
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_seq');
  localStorage.removeItem('page_url');
  window.location.assign('/login');
}
