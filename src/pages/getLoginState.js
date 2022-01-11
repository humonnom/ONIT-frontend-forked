import { getPageUser } from '../utils/parsing';

function getLoginState() {
  const user_seq = localStorage.getItem('user_seq');
  const page_user_seq = getPageUser();

  if (user_seq === page_user_seq) {
    console.log(`user_seq: ${user_seq} page_user_seq: ${page_user_seq}`);
    return true;
  }
  return false;
}

export default getLoginState;
