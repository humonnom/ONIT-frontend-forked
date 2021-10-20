import { words } from 'lodash';
import apiUtil from './apiUtil';
import useFetch from './useFetch';

async function postWidgetsInfo(widgets) {
  // const params = new URLSearchParams();
  // return apiUtil('GET', 'widgets', params);

  // // tmp update from localhost

  // console.log('!!!!!!!!!!');
  // console.log(widgets);
  // localStorage.setItem('widgets', JSON.stringify(data));

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
