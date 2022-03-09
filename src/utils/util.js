import { useGetUrl } from '../hooks/util';
import { TYPE_IMAGE, TYPE_NEW, TYPE_VIDEO } from './constantValue';

export function getApiEndpoint() {
  const endpoint =
    process.env.REACT_APP_SERVER_DOMAIN ?? 'http://localhost:8080';
  if (!endpoint.startsWith('http')) {
    return `http://${endpoint}`;
  }
  return endpoint;
}

export function getLoginState() {
  const user_seq = localStorage.getItem('user_seq');
  const page_user_seq = useGetUrl();

  if (user_seq === page_user_seq) {
    return true;
  }
  return false;
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

export function urlOwnerNotFound(message) {
  return message === 'no user information';
}

export function isOk(code) {
  return code === 'ok';
}

export function isError(code) {
  return code === 'error';
}

export function isWrongToken(code) {
  return code === 'wrong_token';
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

export function setLocalStorage(data) {
  if (data) {
    const { tokens, user_info } = data;
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('user_seq', user_info.user_seq);
  }
}
// TODO: get field data from server

export const getSelectedFieldData = (seletedIndexArr) => {
  const indexArr = seletedIndexArr.sort();
  const data = getFieldList();

  const filtered = data.filter((item) => indexArr.includes(item.id));
  const strings = filtered.reduce((acc, cur, index) => {
    if (index === 0) return `${cur.name}`;
    return `${acc},${cur.name}`;
  }, '');
  return strings;
};

export const getFieldList = () => [
  { id: 1, label: '페인팅', name: 'painting' },
  { id: 2, label: '조각', name: 'sculpture' },
  { id: 3, label: '비디오아트', name: 'video_art' },
  { id: 4, label: '디지털아트', name: 'digital_art' },
  { id: 5, label: '현대미술', name: 'modern_art' },
  { id: 6, label: '공예', name: 'crafts' },
  { id: 7, label: '포토그래피', name: 'photography' },
  { id: 8, label: '건축', name: 'architecture' },
  { id: 9, label: '그래픽디자인', name: 'graphic_design' },
  { id: 10, label: '일러스트레이션', name: 'illustration' },
  { id: 11, label: '타이포그래피', name: 'typography' },
  { id: 12, label: '브랜딩/편집', name: 'branding' },
  { id: 13, label: 'UI/UX', name: 'ui_ux' },
  { id: 14, label: '모션그래픽', name: 'motion_graphic' },
  { id: 15, label: '캐릭터디자인', name: 'character_design' },
  { id: 16, label: '순수예술', name: 'fine_art' },
];

export const urlMatched = (myUrl, pageUrl) => {
  return myUrl === pageUrl;
};

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_seq');
  localStorage.removeItem('page_url');
  window.location.assign('/login');
}

export function isTmpWidget(type) {
  if (type === TYPE_NEW) {
    return true;
  }
  return false;
}

export function convertType2String(type) {
  if (type === TYPE_IMAGE) {
    return 'image';
  }
  if (type === TYPE_VIDEO) {
    return 'video';
  }
  return 'none';
}

export function convertType2Label(type) {
  if (type === 'image') return '이미지';
  else if (type === 'video') return '영상';
  else return '';
}
