import apiUtil from './apiUtil';

async function getWidgetsInfo() {
  const params = new URLSearchParams();
  return apiUtil('GET', 'widgets', params);

  // tmp update from localhost
  // const data = JSON.parse(localStorage.getItem('widgets'));
  // const result = {
  //   data,
  // };
  // return result;
}

export default getWidgetsInfo;
