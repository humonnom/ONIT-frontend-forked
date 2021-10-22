import { words } from 'lodash';
import apiUtil from './apiUtil';
import useFetch from './useFetch';

async function postWidgetsInfo(widgets) {
  useFetch('http://localhost:3001/widget/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify
      .apply({
        widgets,
      })
      .then((res) => {
        if (res.ok) {
          console.log('저장이 완료되었습니다');
        }
      }),
  });
}

export default postWidgetsInfo;
