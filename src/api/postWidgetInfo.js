import apiUtil from './apiUtil';

async function postWidgetInfo(widgets) {
  // const params = new URLSearchParams();
  // return apiUtil('GET', 'widgets', params);

  // tmp update from localhost

  console.log('!!!!!!!!!!');
  console.log(widgets);
  localStorage.setItem('widgets', JSON.stringify(data));
}

export default postWidgetInfo;
