import { map, words } from 'lodash';
import apiUtil from './apiUtil';
import useFetch from './useFetch';

async function postWidgetsInfo(widgets) {
  console.log('real post :');
  console.log(widgets.list[1].x);
  useFetch(`http://localhost:3001/list/1`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x: 9,
      y: 10,
    }),
  }).then((res) => {
    if (res.ok) {
      console.log('저장이 완료되었습니다');
    } else console.log('노저장');
  });
}

export default postWidgetsInfo;
